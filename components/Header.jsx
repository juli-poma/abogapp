import React from 'react';
import { ScaleIcon } from './icons/ScaleIcon.jsx';

const Header = () => {
  return (
    <header className="w-full bg-primary shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
            <ScaleIcon className="h-8 w-8 text-on-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-on-primary ml-3 tracking-wide">
              Abogapp
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
