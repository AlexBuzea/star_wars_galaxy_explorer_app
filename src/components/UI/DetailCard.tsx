import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface DetailCardProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

const DetailCard = ({ title, icon: Icon, children, className = '' }: DetailCardProps) => {
  return (
    <div 
      className={`card card-star-wars p-4 ${className}`}
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="d-flex align-items-center mb-3">
        {Icon && (
          <Icon 
            size={24} 
            style={{ color: 'var(--sw-yellow)', marginRight: '12px' }}
          />
        )}
        <h2 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--sw-space-200)',
          margin: 0
        }}>
          {title}
        </h2>
      </div>
      
      {children}
    </div>
  );
};

export default DetailCard;