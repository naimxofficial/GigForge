'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/app/hooks/useFetch';
import { LoadingSpinner, PageLoadingSpinner } from '@/components/common/LoadingSpinner';
import { GigCard } from '@/components/cards/GigCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { formatPrice, formatRating } from '@/app/lib/formatters';
import { Star, Heart, Share2 } from 'lucide-react';

export default function GigDetailsPage() {
  const params = useParams();
  const gigId = params.id as string;

  const { data: gig, isLoading: gigLoading } = useFetch(gigId ? `/gigs/${gigId}` : null);
  const { data: reviewsData, isLoading: reviewsLoading } = useFetch(gigId ? `/reviews/gig/${gigId}` : null);
  const { data: relatedData, isLoading: relatedLoading } = useFetch(gigId ? `/gigs/${gigId}/related` : null);

  if (gigLoading) return <PageLoadingSpinner />;

  if (!gig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Gig not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{gig.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(gig.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted'
                  }`}
                />
              ))}
              <span className="text-muted-foreground">
                {formatRating(gig.rating || 0)} ({gig.reviewCount || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Image */}
            <div className="relative w-full h-96 bg-muted rounded-xl overflow-hidden mb-8">
              {gig.image ? (
                <Image
                  src={gig.image}
                  alt={gig.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center text-white text-4xl">
                  {gig.category.charAt(0)}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">About this gig</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{gig.description}</p>

              <div className="bg-card rounded-xl p-6 border border-border mb-8">
                <h3 className="font-semibold text-foreground mb-4">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="font-semibold text-foreground">{gig.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Delivery Time</p>
                    <p className="font-semibold text-foreground">{gig.deliveryTime} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Reviews</h2>
              {reviewsLoading ? (
                <LoadingSpinner />
              ) : reviewsData?.data && reviewsData.data.length > 0 ? (
                <div className="space-y-4">
                  {reviewsData.data.map((review: any) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Freelancer Card */}
            <div className="bg-card rounded-xl p-6 border border-border mb-6 sticky top-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-600 to-amber-500"></div>
                <div>
                  <h3 className="font-semibold text-foreground">{gig.freelancerName}</h3>
                  {gig.freelancerRating && (
                    <p className="text-sm text-muted-foreground">
                      {gig.freelancerRating.toFixed(1)}★
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-2xl font-bold text-rose-600">{formatPrice(gig.price)}</span>
                </div>
              </div>

              <Button className="w-full bg-rose-600 hover:bg-rose-700 mb-3">
                Contact Freelancer
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Gigs */}
        {relatedData && relatedData.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Similar Gigs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedData.map((relatedGig: any) => (
                <GigCard key={relatedGig._id} gig={relatedGig} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
