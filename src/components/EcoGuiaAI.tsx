import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Leaf, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

type Message = { role: 'user' | 'assistant'; content: string };

const HIDDEN_ROUTES = ['/games'];

// Seed mascot component for the chatbot button
const SeedMascot = ({ size = 40 }: { size?: number }) => (
  <motion.div 
    className="relative"
    animate={{ 
      scale: [1, 1.05, 1],
    }}
    transition={{ 
      duration: 2, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <span style={{ fontSize: size * 0.6 }}>🌱</span>
  </motion.div>
);

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-2">
    <span className="text-sm text-muted-foreground">Eco-Guía está escribiendo</span>
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-primary rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  </div>
);

export const EcoGuiaAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  const { isListening, transcript, startListening, stopListening, isSupported: sttSupported } = useSpeechToText();
  const { speak, stop: stopSpeaking, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  const isHiddenRoute = HIDDEN_ROUTES.some(route => location.pathname.startsWith(route));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update input when speech-to-text transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
    stopSpeaking();
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(content);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/eco-guia-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error de conexión');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Auto-speak the response if enabled
      if (autoSpeak && assistantContent && ttsSupported) {
        // Small delay to ensure the message is fully rendered
        setTimeout(() => speak(assistantContent), 300);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '¡Ups! 🌿 Parece que tuve un problemita. ¿Puedes intentar de nuevo?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isHiddenRoute) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[70vh] flex flex-col bg-background/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary/10 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Eco-Guía AI</h3>
                  <p className="text-xs text-muted-foreground">Tu asistente ecológico 🌱</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {ttsSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAutoSpeak(!autoSpeak)}
                    className={`rounded-full ${autoSpeak ? 'text-primary' : 'text-muted-foreground'}`}
                    aria-label={autoSpeak ? 'Desactivar lectura automática' : 'Activar lectura automática'}
                    title={autoSpeak ? 'Lectura automática activada' : 'Lectura automática desactivada'}
                  >
                    {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="rounded-full hover:bg-destructive/10"
                  aria-label="Cerrar chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Leaf className="w-12 h-12 mx-auto mb-3 text-primary/50" />
                  <p className="text-sm">¡Hola! Soy Eco-Guía 🌍</p>
                  <p className="text-xs mt-1">Pregúntame sobre ecología y EcoFun</p>
                  {sttSupported && (
                    <p className="text-xs mt-2 text-primary/70">🎤 Puedes usar el micrófono para hablar</p>
                  )}
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-1 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-muted text-foreground rounded-bl-md'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'assistant' && ttsSupported && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSpeakMessage(msg.content)}
                        className="h-6 w-6 rounded-full hover:bg-primary/10 shrink-0"
                        aria-label={isSpeaking ? 'Detener lectura' : 'Leer mensaje'}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-3 h-3 text-primary" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-muted-foreground hover:text-primary" />
                        )}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-background/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                {sttSupported && (
                  <Button
                    type="button"
                    size="icon"
                    variant={isListening ? 'default' : 'outline'}
                    onClick={handleMicToggle}
                    className={`rounded-full shrink-0 ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : ''}`}
                    aria-label={isListening ? 'Detener grabación' : 'Iniciar grabación de voz'}
                    disabled={isLoading}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? 'Escuchando...' : 'Escribe o usa el micrófono...'}
                  className="flex-1 px-4 py-2 rounded-full bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading || isListening}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="rounded-full bg-primary hover:bg-primary/90 shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              {isListening && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-center text-red-500 mt-2"
                >
                  🎤 Grabando... Habla ahora
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={handleOpen}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1,
          rotate: 0,
          opacity: isMinimized ? 0.85 : 1,
        }}
        whileHover={{ 
          scale: 1.15, 
          opacity: 1,
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.6)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className={`fixed bottom-6 right-6 z-50 rounded-full shadow-2xl flex items-center justify-center transition-all bg-white border-4 border-emerald-400 ${
          isMinimized 
            ? 'w-16 h-16' 
            : 'w-20 h-20'
        } ${isOpen ? 'hidden' : ''}`}
        style={{
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3), 0 0 0 3px rgba(16, 185, 129, 0.15), inset 0 0 15px rgba(16, 185, 129, 0.1)'
        }}
        aria-label="Abrir Eco-Guía AI"
      >
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <SeedMascot size={isMinimized ? 36 : 44} />
        </motion.div>
        
        {/* Pulse ring animation */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-400"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        
        {/* Secondary glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-100/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>
    </>
  );
};

export default EcoGuiaAI;
