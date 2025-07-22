import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-4 mt-8">
      <div className="text-center text-sm text-text-secondary">
        <p>Potenciado por IA para Estudios Jurídicos &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
