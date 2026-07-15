'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  if (pages <= 1) return null;

  const getPageNumbers = () => {
    const pages_array = [];
    const maxPagesToShow = 5;

    if (pages <= maxPagesToShow) {
      for (let i = 1; i <= pages; i++) {
        pages_array.push(i);
      }
    } else {
      pages_array.push(1);
      if (page > 3) pages_array.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) {
        if (!pages_array.includes(i)) pages_array.push(i);
      }
      if (page < pages - 2) pages_array.push('...');
      pages_array.push(pages);
    }

    return pages_array;
  };

  return (
    <div className="flex items-center justify-center gap-2 my-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getPageNumbers().map((p) =>
        p === '...' ? (
          <span key={p} className="px-2 py-1">
            {p}
          </span>
        ) : (
          <Button
            key={p}
            variant={page === p ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
