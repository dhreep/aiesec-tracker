export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';
  
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const calculateAge = (dateOfBirth: string): number => {
  if (!dateOfBirth) return 0;
  const today = new Date();
  const birth = new Date(dateOfBirth);
  
  if (isNaN(birth.getTime())) return 0;
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return Math.max(0, age);
};

export const calculateFreshness = (signupDate: string): number => {
  if (!signupDate) return 0;
  const now = new Date();
  const signup = new Date(signupDate);
  
  if (isNaN(signup.getTime())) return 0;
  
  const diffInHours = Math.floor((now.getTime() - signup.getTime()) / (1000 * 60 * 60));
  return Math.max(0, diffInHours);
};
