import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BookWithRecord } from '../types';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: Omit<BookWithRecord, 'id' | 'status' | 'currentPage'>) => void;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: ''
  });

  const handleSubmit = () => {
    if (formData.title && formData.author) {
      onAdd({
        title: formData.title,
        author: formData.author,
        totalPages: parseInt(formData.totalPages) || undefined
      });
      setFormData({ title: '', author: '', totalPages: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">新しい本を追加</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タイトル *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="本のタイトルを入力"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              著者 *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              placeholder="著者名を入力"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ページ数
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.totalPages}
              onChange={(e) => setFormData({...formData, totalPages: e.target.value})}
              placeholder="例: 320"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.title || !formData.author}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
};
