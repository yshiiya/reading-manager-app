export interface Book {
  id: string;
  isbn?: string;
  title: string;
  author: string;
  coverImage?: string;
  totalPages?: number;
  publishedDate?: string;
  categories?: string[];
}

export interface ReadingRecord {
  id: string;
  bookId: string;
  status: 'to-read' | 'reading' | 'completed' | 'paused';
  startDate?: Date;
  endDate?: Date;
  currentPage?: number;
  rating?: number;
  review?: string;
  tags?: string[];
  readingTime?: number; // minutes
}

export interface BookWithRecord extends Book {
  status: ReadingRecord['status'];
  currentPage?: number;
  rating?: number;
  review?: string;
  completedDate?: string;
}
