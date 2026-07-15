'use client';

import { Button } from '@/components/ui/button';

export default function AddGigPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Post a New Gig</h1>
        <div className="bg-card rounded-xl p-8 border border-border text-center">
          <p className="text-muted-foreground mb-6">Create a gig form would go here</p>
          <Button className="bg-rose-600 hover:bg-rose-700">Submit Gig</Button>
        </div>
      </div>
    </div>
  );
}
