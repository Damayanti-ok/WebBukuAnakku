
import React from 'react';

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-brand-blue shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <BookIcon />
        <h1 className="ml-4 text-3xl md:text-4xl font-bold text-white font-fredoka tracking-wide">
          Buku Anakku
        </h1>
      </div>
    </header>
  );
};

export default Header;
