import React from 'react';
import { Star } from 'lucide-react';
import { BookWithRecord } from '../types';

interface BookCardProps {
  book: BookWithRecord;
  onStatusChange: (bookId: string, status: BookWithRecord['status']) => void;
}

const statusColors = {
  'to-read': 'bg-gray-500',
  'reading': 'bg-blue-500',
  'completed': 'bg-green-500',
  'paused': 'bg-yellow-500'
};

const coverColors = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
  'bg-red-500', 'bg-indigo-500', 'bg-pink-500'
];

export const BookCard: React.FC<BookCardProps> = ({ book, onStatusChange }) => {
  const getProgressPercentage = () => {
    if (book.status === 'completed') return 100;
    if (!book.totalPages || book.totalPages === 0) return 0;
    return Math.round((book.currentPage || 0) / book.totalPages * 100);
  };

  const getCoverColor = () => {
    // Generate consistent color based on book title
    const index = book.title.length % coverColors.length;
    return coverColors[index];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-3">
        <div className="flex gap-3">
          {/* Mini Book Cover */}
          <div className={`${getCoverColor()} w-16 h-20 rounded flex-shrink-0 flex items-center justify-center relative`}>
            <div className="text-white text-center px-1">
              <div className="text-xs font-bold leading-tight">
                {book.title.slice(0, 8)}
              </div>
            </div>
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusColors[book.status]}`}></div>
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 truncate mb-1">
              {book.title}
            </h4>
            <p className="text-xs text-gray-600 truncate mb-2">
              {book.author}
            </p>
            
            {/* Rating */}
            {book.rating && (
              <div className="mb-2">
                {renderStars(book.rating)}
              </div>
            )}

            {/* Progress Bar for Reading */}
            {book.status === 'reading' && (
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{book.currentPage}p</span>
                  <span>{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
              </div>
            )}

            {/* Status Select */}
            <select
              value={book.status}
              onChange={(e) => onStatusChange(book.id, e.target.value as BookWithRecord['status'])}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="to-read">読みたい</option>
              <option value="reading">読書中</option>
              <option value="completed">読了</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
