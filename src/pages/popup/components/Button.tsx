import React from 'react';

export const Button = ({ onClick, children, className }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
  <button onClick={onClick} className={`p-2 rounded-full hover:bg-surface-variant dark:hover:bg-dark-surface-variant transition-colors duration-200 ${className}`}>
    {children}
  </button>
);
