'use client';

import { useState } from 'react';
import { GigCard } from '@/components/cards/GigCard';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LoadingSpinner, SkeletonLoader } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import { useFetch } from '@/app/hooks/useFetch';
import { usePagination } from '@/app/hooks/usePagination';
import { CATEGORIES, PRICE_RANGES } from '@/app/lib/constants';
import { Gig } from '@/app/types';
import { Filter } from 'lucide-react';

export default function ExplorePage() {
  const { page, limit, goToPage } = usePagination(1, 12);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  let endpoint = `/gigs?page=${page}&limit=${limit}`;
  if (search) endpoint += `&search=${encodeURIComponent(search)}`;
  if (category) endpoint += `&category=${encodeURIComponent(category)}`;
  if (priceRange) {
    const range = PRICE_RANGES.find((r) => r.label === priceRange);
    if (range) {
      endpoint += `&minPrice=${range.min}&maxPrice=${range.max}`;
    }
  }

  const { data, isLoading } = useFetch<any>(endpoint);

  const gigs = data?.data || [];
  const total = data?.total || 0;
  const pages = data?.pages || 1;

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setPriceRange('');
    goToPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Explore Gigs</h1>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-rose-600" />
            <h2 className="font-semibold text-foreground">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Search</label>
              <Input
                placeholder="Search gigs..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  goToPage(1);
                }}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Category</label>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  goToPage(1);
                }}
                options={[
                  { value: '', label: 'All Categories' },
                  ...CATEGORIES.map((cat) => ({ value: cat, label: cat })),
                ]}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Price Range</label>
              <Select
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  goToPage(1);
                }}
                options={[
                  { value: '', label: 'Any Price' },
                  ...PRICE_RANGES.map((range) => ({
                    value: range.label,
                    label: range.label,
                  })),
                ]}
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-muted-foreground mb-6">
            {total > 0 ? `Showing ${(page - 1) * limit + 1} to ${Math.min(page * limit, total)} of ${total} gigs` : 'No gigs found'}
          </p>

          {isLoading ? (
            <SkeletonLoader />
          ) : gigs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {gigs.map((gig: Gig) => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </div>
              {pages > 1 && (
                <Pagination page={page} pages={pages} onPageChange={goToPage} />
              )}
            </>
          ) : (
            <EmptyState
              title="No gigs found"
              description="Try adjusting your filters or search terms"
              actionLabel="Reset Filters"
              onAction={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
