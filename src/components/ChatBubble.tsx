
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type ChatMessage } from '../types';
import { User, BrainCircuit } from 'lucide-react';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-3 ${!isModel && 'flex-row-reverse'}`}>
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
          isModel ? 'bg-brand-purple' : 'bg-border-color'
        }`}
      >
        {isModel ? (
          <BrainCircuit className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-text-primary" />
        )}
      </div>
      <div
        className={`rounded-2xl p-4 max-w-xl shadow-sm prose prose-sm max-w-none prose-p:my-0 prose-headings:my-2 ${
          isModel
            ? 'bg-card-bg rounded-tl-none text-text-primary'
            : 'bg-brand-purple rounded-tr-none text-white prose-a:text-white hover:prose-a:text-white'
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="font-semibold underline" />
          }}
        >
          {message.text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatBubble;