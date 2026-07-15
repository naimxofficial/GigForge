export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

export const validatePrice = (price: number | string): boolean => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num > 0 && num <= 10000;
};

export const validateRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5;
};

export const validateGigTitle = (title: string): boolean => {
  return title.trim().length >= 5 && title.trim().length <= 100;
};

export const validateGigDescription = (description: string): boolean => {
  return description.trim().length >= 20 && description.trim().length <= 5000;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateDeliveryTime = (days: number | string): boolean => {
  const num = typeof days === 'string' ? parseInt(days) : days;
  return num >= 1 && num <= 365;
};

export const validateComment = (comment: string): boolean => {
  return comment.trim().length >= 5 && comment.trim().length <= 1000;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && validatePassword(password).valid;
};

export const getValidationErrors = (errors: Record<string, string | string[]>): string[] => {
  return Object.values(errors).flat();
};
