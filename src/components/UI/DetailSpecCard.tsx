import { LucideIcon } from 'lucide-react';

interface DetailSpecCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  className?: string;
}

const DetailSpecCard = ({ icon: Icon, title, value, className = '' }: DetailSpecCardProps) => {
  return (
    <div className={`col-6 col-md-3 ${className}`}>
      <div 
        className="text-center p-3 rounded"
        style={{
          backgroundColor: 'rgba(36, 36, 36, 0.5)',
          border: '1px solid var(--sw-space-600)'
        }}
      >
        <Icon 
          size={24} 
          className="mx-auto mb-2"
          style={{ color: 'var(--sw-yellow)' }}
        />
        <h3 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: '600',
          color: 'var(--sw-space-200)',
          fontSize: '1rem',
          marginBottom: '0.5rem'
        }}>
          {title}
        </h3>
        <p style={{
          color: 'var(--sw-space-300)',
          fontSize: '0.875rem',
          margin: 0
        }}>
          {value === 'unknown' || value === 'n/a' ? 'Unknown' : value}
        </p>
      </div>
    </div>
  );
};

export default DetailSpecCard;