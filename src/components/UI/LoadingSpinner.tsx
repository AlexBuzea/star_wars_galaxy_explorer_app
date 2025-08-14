import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative">
        <Loader2 
          className={`${sizeClasses[size]} text-sw-yellow animate-spin`} 
        />
        <div className="absolute inset-0">
          <Loader2 
            className={`${sizeClasses[size]} text-sw-yellow/30 animate-spin`} 
            style={{ animationDirection: 'reverse', animationDuration: '3s' }}
          />
        </div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} text-space-300 font-jedi animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;