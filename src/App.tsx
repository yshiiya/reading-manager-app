import React, { useState } from 'react';
import { Search, Plus, Book, Filter } from 'lucide-react';
import { useBooks } from './hooks/useBooks';
import { BookCard } from './components/BookCard';
import { AddBookModal } from './components/AddBookModal';
import { Stats } from './components/Stats';
import { BookWithRecord } from './types';

function App() {
  const { books, addBook, updateBookStatus } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookWithRecord['status']>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">読書管理</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>本を追加</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <Stats books={books} />

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="本のタイトルや著者で検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">すべて</option>
                <option value="to-read">読みたい</option>
                <option value="reading">読書中</option>
                <option value="completed">読了</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onStatusChange={updateBookStatus}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">本が見つかりません</h3>
            <p className="text-gray-600">検索条件を変更するか、新しい本を追加してください。</p>
          </div>
        )}
      </div>

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addBook}
      />
    </div>
  );
}

export default App;
