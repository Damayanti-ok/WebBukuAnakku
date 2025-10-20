
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="font-poppins">&copy; {new Date().getFullYear()} Buku Anakku. Dibuat dengan ❤️ untuk para pembaca cilik.</p>
      </div>
    </footer>
  );
};

export default Footer;
