'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/app/hooks/useAuth';
import { useToast } from '@/app/hooks/useToast';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { gigService } from '@/app/services/gigService';
import { CATEGORIES, DELIVERY_TIMES, SKILLS } from '@/app/lib/constants';
import {
  validateGigTitle,
  validateGigDescription,
  validatePrice,
  validateDeliveryTime,
} from '@/app/lib/validators';

export default function AddGigPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    deliveryTime: '',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // useEffect(() => {
  //   if (!user) {
  //     addToast('Please login to create a gig', 'warning');
  //     router.push('/login');
  //   }
  // }, [user, router, addToast]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateGigTitle(formData.title)) {
      newErrors.title = 'Title must be 5-100 characters';
    }

    if (!validateGigDescription(formData.description)) {
      newErrors.description = 'Description must be 20-5000 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!validatePrice(parseFloat(formData.price))) {
      newErrors.price = 'Price must be between $1 and $10,000';
    }

    if (!validateDeliveryTime(parseInt(formData.deliveryTime))) {
      newErrors.deliveryTime = 'Delivery time is required';
    }

    if (!formData.image) {
      newErrors.image = 'Image URL is required';
    }

    if (selectedSkills.length === 0) {
      newErrors.skills = 'Select at least one skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const gigData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        image: formData.image,
        deliveryTime: parseInt(formData.deliveryTime),
        tags: selectedSkills,
        freelancerId: user?._id || '',
        freelancerName: user?.name || '',
        freelancerAvatar: user?.avatar,
      };

      const newGig = await gigService.createGig(gigData, token!);
      addToast('Gig created successfully!', 'success');
      router.push(`/gigs/${newGig._id || newGig.id}`);
    } catch (error: any) {
      addToast(error.message || 'Failed to create gig', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // if (!user) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Post a New Gig</h1>
          <p className="text-muted-foreground">
            Share your skills and offer services to clients worldwide
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Gig Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="E.g., I will build a React web application"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Describe what you offer, your experience, and what the client can expect..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={6}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formData.description.length}/5000 characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category}</p>
              )}
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Price (USD) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="50"
                  min="1"
                  max="10000"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                )}
              </div>

              {/* Delivery Time */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Delivery Time <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.deliveryTime}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryTime: e.target.value })
                  }
                >
                  <option value="">Select delivery time</option>
                  {DELIVERY_TIMES.map((dt) => (
                    <option key={dt.value} value={dt.value}>
                      {dt.label}
                    </option>
                  ))}
                </Select>
                {errors.deliveryTime && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.deliveryTime}
                  </p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Gig Image URL <span className="text-red-500">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className={errors.image ? 'border-red-500' : ''}
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">{errors.image}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Provide a URL to an image that represents your gig
              </p>
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-3">
                Skills <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground hover:bg-border'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {errors.skills && (
                <p className="text-sm text-red-500 mt-2">{errors.skills}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-border">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-opacity-90"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    Creating Gig...
                  </div>
                ) : (
                  'Post Gig'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
