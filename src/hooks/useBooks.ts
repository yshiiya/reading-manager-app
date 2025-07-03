import { useState, useEffect } from 'react';
import { BookWithRecord } from '../types';

const STORAGE_KEY = 'reading-manager-books';

export const useBooks = () => {
  const [books, setBooks] = useState<BookWithRecord[]>([]);

  // Initialize with sample data
  useEffect(() => {
    const savedBooks = localStorage.getItem(STORAGE_KEY);
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      // Sample data for first time users
      const sampleBooks: BookWithRecord[] = [
        {
          id: '1',
          title: '吾輩は猫である',
          author: '夏目漱石',
          status: 'completed',
          rating: 4,
          totalPages: 320,
          currentPage: 320,
          completedDate: '2024-06-15'
        },
        {
          id: '2',
          title: '人間失格',
          author: '太宰治',
          status: 'reading',
          totalPages: 180,
          currentPage: 45
        },
        {
          id: '3',
          title: 'ノルウェイの森',
          author: '村上春樹',
          status: 'to-read',
          totalPages: 296,
          currentPage: 0
        }
      ];
      setBooks(sampleBooks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBooks));
    }
  }, []);

  // Save to localStorage whenever books change
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  }, [books]);

  const addBook = (bookData: Omit<BookWithRecord, 'id'>) => {
    const newBook: BookWithRecord = {
      ...bookData,
      id: Date.now().toString(),
      status: 'to-read',
      currentPage: 0
    };
    setBooks(prev => [...prev, newBook]);
  };

  const updateBookStatus = (bookId: string, status: BookWithRecord['status']) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        const updates: Partial<BookWithRecord> = { status };
        
        if (status === 'completed') {
          updates.completedDate = new Date().toISOString().split('T')[0];
          updates.currentPage = book.totalPages || 0;
        }
        
        return { ...book, ...updates };
      }
      return book;
    }));
  };

  const updateBookProgress = (bookId: string, currentPage: number) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, currentPage } : book
    ));
  };

  const deleteBook = (bookId: string) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  return {
    books,
    addBook,
    updateBookStatus,
    updateBookProgress,
    deleteBook
  };
};
