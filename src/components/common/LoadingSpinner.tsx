'use client';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
        <div
          className="absolute inset-0 border-4 border-transparent border-t-rose-600 rounded-full animate-spin"
          style={{
            animationDuration: '0.8s',
          }}
        ></div>
      </div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export const PageLoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
};
