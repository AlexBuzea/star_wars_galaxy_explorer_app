import { LucideIcon } from 'lucide-react';

interface DetailInfo {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface DetailHeaderProps {
  title: string;
  icon: LucideIcon;
  infoItems: DetailInfo[];
}

const DetailHeader = ({ title, icon: Icon, infoItems }: DetailHeaderProps) => {
  return (
    <div 
      className="card card-star-wars p-4 p-md-5"
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-start">
        <div className="flex-shrink-0 mb-4 mb-md-0 me-md-4">
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(255, 232, 31, 0.2) 0%, rgba(255, 232, 31, 0.05) 100%)',
              border: '2px solid rgba(255, 232, 31, 0.3)'
            }}
          >
            <Icon size={40} style={{ color: 'var(--sw-yellow)' }} />
          </div>
        </div>
        
        <div className="flex-fill">
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 'bold',
            color: 'var(--sw-yellow)',
            marginBottom: '1.5rem'
          }}>
            {title}
          </h1>
          
          <div className="row g-3">
            {infoItems.map((info) => {
              const InfoIcon = info.icon;
              
              return (
                <div key={info.label} className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <div className="d-flex align-items-center">
                    <InfoIcon 
                      size={18} 
                      className="flex-shrink-0 me-3"
                      style={{ color: 'var(--sw-space-400)' }}
                    />
                    <div>
                      <span style={{ 
                        color: 'var(--sw-space-400)', 
                        fontSize: '0.875rem'
                      }}>
                        {info.label}:
                      </span>
                      <span 
                        className="ms-2 d-block d-md-inline"
                        style={{
                          color: 'var(--sw-space-200)',
                          fontWeight: '500'
                        }}
                      >
                        {info.value === 'unknown' || info.value === 'n/a' ? 'Unknown' : info.value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;