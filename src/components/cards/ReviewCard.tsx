'use client';

import { Review } from '@/app/types';
import { Star } from 'lucide-react';
import { formatTimeAgo } from '@/app/lib/formatters';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted"></div>
          <div>
            <p className="font-semibold text-foreground">{review.clientName}</p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(review.createdAt || new Date())}
            </p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-muted'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm text-foreground">{review.comment}</p>
    </div>
  );
};
