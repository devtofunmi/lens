import React from 'react';

export const ActionButton = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center w-full p-4 rounded-2xl text-left bg-surface hover:bg-opacity-80 transition-colors duration-200 dark:bg-dark-surface-variant dark:hover:bg-opacity-80 border border-transparent hover:border-outline">
    <div className="p-2 bg-primary-container dark:bg-dark-primary-container rounded-lg text-on-primary-container dark:text-dark-on-primary-container">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-on-surface dark:text-dark-on-surface-variant">{title}</h3>
      <p className="text-sm text-on-surface dark:text-dark-on-surface-variant">{description}</p>
    </div>
  </button>
);

export const Spinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
);
