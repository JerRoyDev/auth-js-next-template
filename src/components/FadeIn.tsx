'use client';
import React, { useEffect, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number; // ms
}

const FadeIn: React.FC<FadeInProps> = ({ children, duration = 350 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1)`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
