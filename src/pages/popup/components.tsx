import React from 'react';

export const ActionButton = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center w-full p-4 rounded-lg text-left bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors duration-200 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </button>
);

export const Spinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
);
