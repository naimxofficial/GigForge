'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GigCard } from '@/components/cards/GigCard';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { FreelancerCard } from '@/components/cards/FreelancerCard';
import { LoadingSpinner, SkeletonLoader } from '@/components/common/LoadingSpinner';
import { useFetch } from '@/app/hooks/useFetch';
import { CATEGORIES } from '@/app/lib/constants';
import { Gig, Freelancer } from '@/app/types';
import { ArrowRight, Check } from 'lucide-react';

export default function HomePage() {
  const { data: gigsData, isLoading: gigsLoading } = useFetch<any>('/gigs?limit=8');
  const { data: trendingData, isLoading: trendingLoading } = useFetch<any>('/gigs/trending');

  const gigs = gigsData?.data || [];
  const trending = trendingData || [];

  // Demo freelancers
  const freelancers: Freelancer[] = [
    {
      _id: '1',
      name: 'Sarah Johnson',
      title: 'Expert Web Developer',
      rating: 5,
      completedGigs: 127,
      hourlyRate: 85,
      description: 'Full-stack web development with React, Next.js, and Node.js',
    },
    {
      _id: '2',
      name: 'Alex Chen',
      title: 'UI/UX Designer',
      rating: 4.9,
      completedGigs: 89,
      hourlyRate: 75,
      description: 'Beautiful, user-centered design for web and mobile apps',
    },
    {
      _id: '3',
      name: 'Maria Garcia',
      title: 'Content Writer',
      rating: 4.8,
      completedGigs: 156,
      hourlyRate: 55,
      description: 'Professional blog posts, articles, and marketing copy',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find the Perfect <span className="text-rose-600">Freelancer</span> for Your Project
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Connect with talented professionals and bring your ideas to life. Browse thousands of gigs or post your own.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Browse Gigs
              </Button>
            </Link>
            <Link href="/gigs/add">
              <Button size="lg" variant="outline">
                Post a Gig
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 text-center py-8">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-rose-600">10K+</p>
            <p className="text-muted-foreground">Freelancers</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-amber-500">25K+</p>
            <p className="text-muted-foreground">Active Gigs</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-green-500">500M+</p>
            <p className="text-muted-foreground">Earned</p>
          </div>
        </div>
      </section>

      {/* Trending Gigs */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Trending Gigs</h2>
          <Link href="/explore" className="text-rose-600 hover:text-rose-700 flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {trendingLoading ? (
          <SkeletonLoader />
        ) : trending.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.slice(0, 4).map((gig: Gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No trending gigs available yet</p>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 12).map((category) => (
            <CategoryCard key={category} name={category} />
          ))}
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Top Freelancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <FreelancerCard key={freelancer._id} freelancer={freelancer} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-card rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose GigForge?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Verified Freelancers',
              description: 'All freelancers are vetted and verified to ensure quality work.',
            },
            {
              title: 'Secure Payments',
              description: 'Your payment is protected until the work is completed.',
            },
            {
              title: '24/7 Support',
              description: 'Our support team is always available to help you.',
            },
          ].map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <Check className="w-6 h-6 text-green-500 mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of businesses and freelancers who are already using GigForge to accomplish their goals.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/explore">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              Explore Gigs
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
