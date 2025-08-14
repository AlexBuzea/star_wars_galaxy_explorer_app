import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage = ({ message, onRetry, className = '' }: ErrorMessageProps) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 ${className}`}>
      <div className="flex items-center space-x-3 text-red-400">
        <AlertTriangle size={32} />
        <h3 className="font-star-wars text-xl font-semibold">
          ERROR
        </h3>
      </div>
      
      <div className="text-center bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md">
        <p className="text-space-200 font-jedi leading-relaxed">
          {message}
        </p>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 bg-sw-yellow text-space-900 px-4 py-2 rounded-lg font-jedi font-semibold hover:bg-yellow-300 transition-colors"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
      
      <div className="text-space-500 text-sm font-jedi text-center">
        <p>"I find your lack of connection disturbing."</p>
        <cite className="text-xs">- Darth Vader (probably)</cite>
      </div>
    </div>
  );
};

export default ErrorMessage;