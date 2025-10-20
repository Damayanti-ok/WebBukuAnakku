
import React from 'react';
import BookCard from './BookCard';
import type { Book } from '../types';

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-pink"></div>
    </div>
);

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-64 bg-gray-300"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
    </div>
);

const BookList: React.FC<BookListProps> = ({ books, isLoading, error }) => {
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
        <strong className="font-bold">Oops!</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  
  if (books.length === 0) {
      return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-brand-gray">Tidak ada buku ditemukan</h2>
            <p className="mt-2 text-brand-gray/80">Coba ubah pilihan filter Anda untuk menemukan buku yang lain.</p>
        </div>
      )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
