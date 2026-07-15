export const CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Content Writing',
  'SEO',
  'Digital Marketing',
  'Video Editing',
  'Music Production',
  'Data Analysis',
  'Cloud Computing',
  'AI & Machine Learning',
];

export const SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Vue.js',
  'Angular',
  'GraphQL',
  'REST API',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Google Cloud',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'SEO',
  'SEM',
  'Content Writing',
  'Copywriting',
  'Video Editing',
  'Motion Graphics',
];

export const RATINGS = [1, 2, 3, 4, 5];

export const PRICE_RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $200', min: 50, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: 'Over $500', min: 500, max: 10000 },
];

export const DELIVERY_TIMES = [
  { label: '1 Day', value: 1 },
  { label: '3 Days', value: 3 },
  { label: '5 Days', value: 5 },
  { label: '7 Days', value: 7 },
  { label: '14 Days', value: 14 },
  { label: '30 Days', value: 30 },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const DEMO_CREDENTIALS = {
  email: 'demo@gigforge.com',
  password: 'demo123456',
};
