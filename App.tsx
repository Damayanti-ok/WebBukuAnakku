
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import BookList from './components/BookList';
import Footer from './components/Footer';
import { fetchBookRecommendations } from './services/geminiService';
import type { Book, Filters } from './types';
import { AGE_CATEGORIES, GENRE_CATEGORIES, THEME_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    age: AGE_CATEGORIES[1], // Default to 3-5 tahun
    genre: GENRE_CATEGORIES[1], // Default to Petualangan
    theme: THEME_CATEGORIES[0], // Default to Persahabatan
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const loadBooks = useCallback(async (currentFilters: Filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const recommendedBooks = await fetchBookRecommendations(currentFilters);
      setBooks(recommendedBooks);
    } catch (err) {
      console.error(err);
      setError('Maaf, terjadi kesalahan saat mengambil rekomendasi buku. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]); // We want this to run whenever filters change.

  return (
    <div className="flex flex-col min-h-screen font-poppins text-brand-gray bg-brand-beige">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CategoryFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>
          <section className="lg:col-span-3">
            <BookList books={books} isLoading={isLoading} error={error} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
