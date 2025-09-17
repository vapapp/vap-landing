"use client";

import { useState, FormEvent, useEffect, useRef, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from 'next/navigation';
import { Bot, Send, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./VAPChat.module.css";
import { cn } from "@/lib/utils";

// --- Tipos ---
interface Message {
  id: number;
  content: string;
  role: "user" | "assistant";
}

// --- Perguntas Sugeridas Atualizadas ---
const suggestedQuestions = [
    "O que é o VAP-App?",
    "Para quem é o VAP-App?",
    "Como o VAP-App pode me ajudar?",
];

const ChatHeader = () => (
    <div className={styles.chatHeader}>
        <h1 className={styles.headerTitle}>Assistente VAP-App</h1>
        <p className={styles.headerDescription}>Posso ajudar com suas dúvidas!</p>
    </div>
);

const ChatBubble = ({ message }: { message: Message }) => {
    const isUser = message.role === 'user';
    return (
        <div className={cn(styles.bubbleContainer, isUser ? styles.userBubbleContainer : styles.aiBubbleContainer)}>
            <div className={cn(styles.bubble, isUser ? styles.userBubble : styles.aiBubble)}>
                {isUser ? (
                    message.content
                ) : (
                    <div className={styles.markdown}>
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

const LoadingBubble = () => (
    <div className={cn(styles.bubbleContainer, styles.aiBubbleContainer)}>
        <div className={cn(styles.bubble, styles.aiBubble, styles.loadingBubble)}>
            <div className={styles.dotFlashing}></div>
        </div>
    </div>
);

// --- Componente de Sugestões Atualizado com Título ---
const SuggestedQuestions = ({ questions, onClick }: { questions: string[], onClick: (question: string) => void }) => (
    <div className={styles.suggestionsContainer}>
        <div className={styles.suggestionsHeader}>
            <Sparkles className="size-4 text-slate-500" />
            <span>Sugestões para começar</span>
        </div>
        {questions.map((question) => (
            <button key={question} className={styles.suggestionButton} onClick={() => onClick(question)}>
                {question}
            </button>
        ))}
    </div>
);

function ChatLogic() {
  const searchParams = useSearchParams();
  const chatOpenQuery = searchParams.get('chat') === 'open';
  const [isOpen, setIsOpen] = useState(chatOpenQuery);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Eu sou o assistente virtual do VAP-App. Como posso te ajudar hoje?",
      role: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    setShowSuggestions(false); 

    const userMessage: Message = { id: Date.now(), content, role: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }), 
      });

      if (!response.ok) throw new Error('A resposta da rede não foi bem-sucedida.');

      const data = await response.json();
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: data.reply || "Desculpe, não consegui processar a resposta.",
        role: "assistant",
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.",
        role: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Falha ao buscar resposta do chatbot:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
  
  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className={styles.container}>
      <div className={cn(styles.chatWindow, isOpen ? styles.open : styles.closed)}>
        <ChatHeader />
        <div className={styles.chatBody}>
            {messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)}
            
           
            {showSuggestions && (
                <SuggestedQuestions 
                    questions={suggestedQuestions} 
                    onClick={handleSuggestionClick} 
                />
            )}

            {isLoading && <LoadingBubble />}
            <div ref={messagesEndRef} />
        </div>
        <div className={styles.chatFooter}>
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className={styles.input}
              disabled={isLoading}
            />
            <Button type="submit" size="sm" className={styles.sendButton} disabled={isLoading}>
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
      <Button onClick={() => setIsOpen(!isOpen)} className={styles.toggleButton} aria-label="Abrir ou fechar chat">
        {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
      </Button>
    </div>
  );
}

export function VAPChat() {
    return (
        <Suspense fallback={null}>
            <ChatLogic />
        </Suspense>
    )
}