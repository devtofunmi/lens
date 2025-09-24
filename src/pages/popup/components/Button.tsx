import React from 'react';

export const Button = ({ onClick, children, className, title, disabled }: { onClick: () => void, children: React.ReactNode, className?: string, title?: string, disabled?: boolean }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full hover:bg-surface-variant dark:hover:bg-dark-surface-variant transition-colors duration-200 ${className}`}
    title={title}
    disabled={disabled}
  >
    {children}
  </button>
);
