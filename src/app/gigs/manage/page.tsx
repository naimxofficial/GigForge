'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/hooks/useAuth';
import { useToast } from '@/app/hooks/useToast';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import { gigService } from '@/app/services/gigService';
import { usePagination } from '@/app/hooks/usePagination';
import { formatPrice, formatDate } from '@/app/lib/formatters';
import { Gig } from '@/app/types';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';

export default function ManageGigsPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const { page, setPage, limit } = usePagination();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!user) {
  //     addToast('Please login to manage gigs', 'warning');
  //     router.push('/login');
  //     return;
  //   }

  //   fetchGigs();
  // }, [user, page, router, addToast]);

  const fetchGigs = async () => {
    try {
      setIsLoading(true);
      const response = await gigService.getFreelancerGigs(
        user?._id || '',
        page,
        limit
      );
      setGigs(response.data);
      setTotal(response.total);
    } catch (error: any) {
      addToast(error.message || 'Failed to fetch gigs', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (gigId: string) => {
    if (!confirm('Are you sure you want to delete this gig?')) {
      return;
    }

    try {
      setDeletingId(gigId);
      await gigService.deleteGig(gigId, token!);
      addToast('Gig deleted successfully', 'success');
      setGigs(gigs.filter((g) => g._id !== gigId && g.id !== gigId));
    } catch (error: any) {
      addToast(error.message || 'Failed to delete gig', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const pages = Math.ceil(total / limit);

  // if (!user) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Your Gigs</h1>
            <p className="text-muted-foreground">
              Total gigs: <span className="font-semibold">{total}</span>
            </p>
          </div>
          <Link href="/gigs/add">
            <Button className="bg-primary hover:bg-opacity-90 flex items-center gap-2">
              <AiOutlinePlusCircle size={20} />
              Post New Gig
            </Button>
          </Link>
        </div>

        {/* Content */}
        {isLoading && !gigs.length ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : gigs.length === 0 ? (
          <EmptyState
            title="No gigs yet"
            description="You haven't posted any gigs yet. Start by creating your first gig!"
            action={{
              label: 'Post Your First Gig',
              href: '/gigs/add',
            }}
          />
        ) : (
          <>
            {/* Gigs Table/Grid */}
            <div className="space-y-4 mb-8">
              {gigs.map((gig) => (
                <div
                  key={gig._id || gig.id}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Gig Info */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                        {gig.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Category: <span className="font-medium">{gig.category}</span>
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {gig.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(gig.price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Delivery:</span>
                        <span className="text-sm font-medium">{gig.deliveryTime} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Reviews:</span>
                        <span className="text-sm font-medium">
                          {gig.reviewCount || 0}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/gigs/${gig._id || gig.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          title="View gig"
                        >
                          <BsEye size={18} />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </Link>

                      <Link href={`/gigs/${gig._id || gig.id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          title="Edit gig"
                        >
                          <AiOutlineEdit size={18} />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDelete(gig._id || gig.id || '')
                        }
                        disabled={
                          deletingId === (gig._id || gig.id)
                        }
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-2"
                        title="Delete gig"
                      >
                        {deletingId === (gig._id || gig.id) ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <AiOutlineDelete size={18} />
                            <span className="hidden sm:inline">Delete</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  {gig.tags && gig.tags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                      {gig.tags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted text-foreground px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {gig.tags.length > 5 && (
                        <span className="text-xs bg-muted text-foreground px-2 py-1 rounded">
                          +{gig.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Created Date */}
                  <div className="mt-4 text-xs text-muted-foreground">
                    Created {formatDate(gig.createdAt)}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={pages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
