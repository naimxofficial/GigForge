'use client';

import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  count?: number;
  icon?: string;
}

const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    'Web Development': 'from-blue-500 to-cyan-500',
    'Mobile Development': 'from-purple-500 to-pink-500',
    'UI/UX Design': 'from-pink-500 to-rose-500',
    'Graphic Design': 'from-orange-500 to-red-500',
    'Content Writing': 'from-green-500 to-emerald-500',
    'SEO': 'from-yellow-500 to-amber-500',
    'Digital Marketing': 'from-indigo-500 to-blue-500',
    'Video Editing': 'from-red-500 to-rose-500',
    'Music Production': 'from-violet-500 to-purple-500',
    'Data Analysis': 'from-cyan-500 to-blue-500',
    'Cloud Computing': 'from-sky-500 to-cyan-500',
    'AI & Machine Learning': 'from-purple-600 to-indigo-600',
  };
  return gradients[category] || 'from-gray-500 to-slate-500';
};

export const CategoryCard = ({ name, count = 0, icon }: CategoryCardProps) => {
  return (
    <Link href={`/explore?category=${encodeURIComponent(name)}`}>
      <div
        className={`group h-32 rounded-xl bg-gradient-to-br ${getCategoryGradient(
          name
        )} p-6 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer flex flex-col justify-end`}
      >
        <div className="text-2xl mb-2">{icon || '✨'}</div>
        <h3 className="font-semibold text-lg group-hover:brightness-110 transition-all">
          {name}
        </h3>
        {count > 0 && (
          <p className="text-sm opacity-90">{count} available gigs</p>
        )}
      </div>
    </Link>
  );
};
