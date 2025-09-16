import { NextRequest, NextResponse } from 'next/server';
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

let vectorStore: MemoryVectorStore | null = null;

async function initializeVectorStore() {
  const loader = new TextLoader('knowledge_base.md');
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
  const splitDocs = await splitter.splitDocuments(docs);
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY, modelName: "text-embedding-3-small" });
  vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json(); 

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'O array de mensagens é obrigatório.' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: 'A chave da API da OpenAI não foi configurada no servidor.' }, { status: 500 });
    }

    if (!vectorStore) await initializeVectorStore();
    if (!vectorStore) throw new Error("O Vector Store não pôde ser inicializado.");
    
    const retriever = vectorStore.asRetriever({ k: 4 });
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

   
    const historyAwarePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      ["user", "Com base na conversa acima, gere uma pergunta de busca que possa ser entendida sem o histórico."],
    ]);


    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm,
      retriever,
      rephrasePrompt: historyAwarePrompt,
    });

   
    const answerPrompt = ChatPromptTemplate.fromMessages([
      ["system", 
      `Você é o assistente virtual do VAP-App, um especialista empático e prestativo.
      Sua missão é ajudar cuidadores de crianças com traqueostomia.
      FORMATE SUAS RESPOSTAS USANDO MARKDOWN.
      Use o seguinte contexto e o histórico da conversa para responder.
      
      CONTEXTO:
      {context}
      
      REGRAS:
      1. Se a resposta estiver no contexto, responda de forma completa e bem formatada.
      2. Se a pergunta não puder ser respondida, diga: "Essa informação eu não tenho no momento, mas posso te contar sobre as funcionalidades do VAP-App, se quiser."
      3. Nunca invente informações.`
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({ llm, prompt: answerPrompt });
    
   
    const conversationalRetrievalChain = await createRetrievalChain({
      retriever: historyAwareRetrieverChain,
      combineDocsChain,
    });

   
    const history = messages.slice(0, -1).map((msg: { role: string, content: string }) => 
        msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
    );
    const currentMessageContent = messages[messages.length - 1].content;


    const response = await conversationalRetrievalChain.invoke({
      chat_history: history,
      input: currentMessageContent,
    });

    return NextResponse.json({ reply: response.answer });

  } catch (error) {
    console.error('[CHATBOT_API_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return NextResponse.json({ error: `Ocorreu um erro interno: ${errorMessage}` }, { status: 500 });
  }
}
