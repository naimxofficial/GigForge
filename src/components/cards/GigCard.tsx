'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Gig } from '@/app/types';
import { formatPrice } from '@/app/lib/formatters';
import { Star } from 'lucide-react';

interface GigCardProps {
  gig: Gig;
  href?: string;
}

export const GigCard = ({ gig, href = `/gigs/${gig._id}` }: GigCardProps) => {
  return (
    <Link href={href}>
      <div className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-40 bg-muted overflow-hidden">
          {gig.image ? (
            <Image
              src={gig.image}
              alt={gig.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center text-white text-2xl">
              {gig.category.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-rose-600 transition-colors">
            {gig.title}
          </h3>

          {/* Freelancer info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-muted"></div>
            <span className="text-sm text-muted-foreground line-clamp-1">
              {gig.freelancerName}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(gig.rating || 0)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({gig.reviewCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-border flex justify-between items-center">
            <span className="font-bold text-rose-600">{formatPrice(gig.price)}</span>
            <span className="text-xs text-muted-foreground">
              {gig.deliveryTime}d delivery
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
