
import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
      <img 
        className="w-full h-80 object-cover" 
        src={book.coverImageUrl} 
        alt={`Cover of ${book.title}`} 
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-fredoka text-brand-blue mb-1">{book.title}</h3>
        <p className="text-md text-brand-gray/80 mb-4">oleh {book.author}</p>
        <p className="text-brand-gray flex-grow mb-6">{book.description}</p>
        <button className="mt-auto w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default BookCard;
