'use client';

import Link from 'next/link';
import { Freelancer } from '@/app/types';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FreelancerCardProps {
  freelancer: Freelancer;
}

export const FreelancerCard = ({ freelancer }: FreelancerCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Header with avatar */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-rose-600 to-amber-500"></div>
          <div>
            <h3 className="font-semibold text-foreground">{freelancer.name}</h3>
            {freelancer.title && (
              <p className="text-sm text-muted-foreground">{freelancer.title}</p>
            )}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.round(freelancer.rating || 0)
                ? 'fill-amber-400 text-amber-400'
                : 'text-muted'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground">
          {freelancer.rating?.toFixed(1) || '0.0'} ({freelancer.completedGigs || 0} jobs)
        </span>
      </div>

      {/* Description */}
      {freelancer.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {freelancer.description}
        </p>
      )}

      {/* Rate */}
      {freelancer.hourlyRate && (
        <div className="mb-4 pb-4 border-b border-border flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Hourly Rate:</span>
          <span className="font-semibold text-rose-600">
            ${freelancer.hourlyRate}/hr
          </span>
        </div>
      )}

      {/* Action button */}
      <Link href={`/freelancer/${freelancer._id}`} className="w-full block">
        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </Link>
    </div>
  );
};
