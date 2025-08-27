import { Lead, LeadWithCalculations, MetricData } from '@/types';
import { calculateAge, calculateFreshness } from './dateUtils';

export const addCalculationsToLeads = (leads: Lead[]): LeadWithCalculations[] => {
  return leads.map(lead => ({
    ...lead,
    age: calculateAge(lead.date_of_birth),
    freshness: calculateFreshness(lead.signup_date)
  }));
};

export const calculateMetrics = (leads: Lead[]): MetricData => {
  const totalLeads = leads.length;
  const acceptedLeads = leads.filter(lead => lead.status === 'accepted').length;
  const conversionRate = totalLeads > 0 ? (acceptedLeads / totalLeads) * 100 : 0;
  
  const ages = leads.map(lead => calculateAge(lead.date_of_birth)).filter(age => age > 0);
  const averageAge = ages.length > 0 ? ages.reduce((sum, age) => sum + age, 0) / ages.length : 0;
  
  const recentDate = new Date();
  recentDate.setHours(recentDate.getHours() - 24);
  const recentActivity = leads.filter(lead => 
    new Date(lead.signup_date) >= recentDate
  ).length;

  return {
    totalLeads,
    conversionRate: Math.round(conversionRate * 100) / 100,
    averageAge: Math.round(averageAge * 10) / 10,
    recentActivity
  };
};

export const sortLeads = (
  leads: LeadWithCalculations[], 
  column: string, 
  direction: 'asc' | 'desc'
): LeadWithCalculations[] => {
  return [...leads].sort((a, b) => {
    let aValue: string | number = '';
    let bValue: string | number = '';

    switch (column) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'age':
        aValue = a.age;
        bValue = b.age;
        break;
      case 'freshness':
        aValue = a.freshness;
        bValue = b.freshness;
        break;
      case 'status':
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
        break;
      default:
        aValue = String(a[column as keyof LeadWithCalculations]).toLowerCase();
        bValue = String(b[column as keyof LeadWithCalculations]).toLowerCase();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return direction === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });
};
