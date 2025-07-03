import React from 'react';
import { Book, BarChart3, Calendar, User } from 'lucide-react';
import { BookWithRecord } from '../types';

interface StatsProps {
  books: BookWithRecord[];
}

export const Stats: React.FC<StatsProps> = ({ books }) => {
  const stats = {
    total: books.length,
    completed: books.filter(book => book.status === 'completed').length,
    reading: books.filter(book => book.status === 'reading').length,
    toRead: books.filter(book => book.status === 'to-read').length
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">総数</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <Book className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">読了</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <BarChart3 className="w-8 h-8 text-green-400" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">読書中</p>
            <p className="text-2xl font-bold text-blue-600">{stats.reading}</p>
          </div>
          <Calendar className="w-8 h-8 text-blue-400" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">読みたい</p>
            <p className="text-2xl font-bold text-gray-600">{stats.toRead}</p>
          </div>
          <User className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
