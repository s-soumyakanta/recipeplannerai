import React, { useRef, useEffect, useState } from 'react';
import { FiSend, FiCopy, FiCheck } from 'react-icons/fi';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ChatSection: React.FC = () => {
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [preferences, setPreferences] = useState<any>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setInput } = useChat({
    api: '/api/chat',
  });

  const { data: preferencesData, error, isValidating } = useSWR(
    session?.user?.id ? `/api/getpreferences?userId=${session.user.id}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        setPreferences(data);
      },
    }
  );

  useEffect(() => {
    if (preferencesData) {
      console.log('Fetched preferences:', preferencesData);
      setPreferences(preferencesData);
    }
  }, [preferencesData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitWithPreferences(e);
    }
  };

  const handleSubmitWithPreferences = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      alert('User not authenticated.');
      return;
    }

    const messageContent = input;
    const preferencesMessage = preferences ? `User preferences: ${JSON.stringify(preferences)}` : '';

    await append({
      role: 'user',
      content: `${preferencesMessage}\n${messageContent}`
    });

    setInput('');
    handleSubmit(e as any); // If handleSubmit needs to be called for additional handling
  };

  return (
    <div className="flex flex-col h-full p-1">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
        RecipePlannerAI Chat
      </h1>
      <div className="flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto">
          <div className="space-y-4 pb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[70%] p-3 rounded-lg shadow-md relative
                  ${msg.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'}
                `}>
                  <p className="whitespace-pre-wrap text-sm sm:text-base break-words">{msg.content}</p>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(msg.content, index)}
                      className="absolute bottom-2 right-2 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 transition duration-300"
                      aria-label="Copy recipe to clipboard"
                    >
                      {copiedIndex === index ? (
                        <FiCheck size={16} className="text-green-500" aria-hidden="true" />
                      ) : (
                        <FiCopy size={16} aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {copiedIndex === index ? 'Copied' : 'Copy recipe'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <div className="loader" aria-label="Loading"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask for a recipe..."
              className="flex-grow p-3 rounded-lg border-2 border-blue-300 dark:border-blue-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-300"
              aria-label="Recipe request input"
            />
            <button
              onClick={handleSubmitWithPreferences}
              className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Send recipe request"
            >
              <FiSend size={20} aria-hidden="true" />
              <span className="sr-only">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
