import { ReactNode } from 'react';

interface DetailContainerProps {
  children: ReactNode;
}

const DetailContainer = ({ children }: DetailContainerProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {children}
    </div>
  );
};

export default DetailContainer;