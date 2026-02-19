import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

let knowledgeBase: string | null = null;

function loadKnowledgeBase(): string {
  if (knowledgeBase) return knowledgeBase;
  try {
    const filePath = path.join(process.cwd(), 'docs', 'knowledge_base.md');
    knowledgeBase = fs.readFileSync(filePath, 'utf-8');
    return knowledgeBase;
  } catch {
    return '';
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'O array de mensagens e obrigatorio.' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'A chave da API da OpenAI nao foi configurada no servidor.' }, { status: 500 });
    }

    const context = loadKnowledgeBase();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = `Voce e o assistente virtual do VAP-App, um especialista empatico, caloroso e prestativo.
Sua missao e ajudar cuidadores de criancas com traqueostomia, falando com eles de forma clara e natural.

Use uma linguagem coloquial e amigavel, como se estivesse em uma conversa real. Evite ser robotico.
Respostas curtas e diretas sao melhores. Se precisar dar uma informacao longa, quebre em paragrafos menores.
FORMATE SUAS RESPOSTAS USANDO MARKDOWN.

CONTEXTO:
${context}

REGRAS:
1. Se a resposta estiver no contexto, responda de forma completa e bem formatada.
2. Se a pergunta nao puder ser respondida, diga de forma amigavel: "Hum, essa informacao especifica eu nao tenho aqui. Mas posso te contar sobre as funcionalidades do VAP-App, se voce quiser!"
3. Nunca invente informacoes.`;

    const chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: chatMessages,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? '';
    return NextResponse.json({ reply });

  } catch (error) {
    console.error('[CHATBOT_API_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return NextResponse.json({ error: `Ocorreu um erro interno: ${errorMessage}` }, { status: 500 });
  }
}