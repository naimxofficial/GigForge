'use client';

import { Button } from '@/components/ui/button';

export default function ManageGigsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Manage Your Gigs</h1>
        <div className="bg-card rounded-xl p-8 border border-border text-center">
          <p className="text-muted-foreground mb-6">Your gigs management dashboard would go here</p>
          <Button className="bg-rose-600 hover:bg-rose-700">Add New Gig</Button>
        </div>
      </div>
    </div>
  );
}
