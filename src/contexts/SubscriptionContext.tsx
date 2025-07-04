
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  category: 'Entertainment' | 'Productivity' | 'Fitness' | 'Utilities' | 'Other';
  nextBilling: string;
  description?: string;
  color: string;
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  monthlyBudget: number;
  setMonthlyBudget: (budget: number) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const CATEGORY_COLORS = {
  Entertainment: '#ef4444',
  Productivity: '#3b82f6',  
  Fitness: '#10b981',
  Utilities: '#f59e0b',
  Other: '#8b5cf6'
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const SAMPLE_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    cost: 15.99,
    billingCycle: 'monthly',
    category: 'Entertainment',
    nextBilling: '2025-08-05',
    description: 'Streaming service',
    color: CATEGORY_COLORS.Entertainment
  },
  {
    id: '2', 
    name: 'Spotify Premium',
    cost: 9.99,
    billingCycle: 'monthly',
    category: 'Entertainment',
    nextBilling: '2025-07-15',
    description: 'Music streaming',
    color: CATEGORY_COLORS.Entertainment
  },
  {
    id: '3',
    name: 'Adobe Creative Suite',
    cost: 52.99,
    billingCycle: 'monthly',
    category: 'Productivity',
    nextBilling: '2025-07-28',
    description: 'Design software',
    color: CATEGORY_COLORS.Productivity
  }
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(200);

  useEffect(() => {
    const saved = localStorage.getItem('subscriptions');
    const savedBudget = localStorage.getItem('monthlyBudget');
    
    if (saved) {
      setSubscriptions(JSON.parse(saved));
    } else {
      setSubscriptions(SAMPLE_SUBSCRIPTIONS);
    }
    
    if (savedBudget) {
      setMonthlyBudget(Number(savedBudget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('monthlyBudget', monthlyBudget.toString());
  }, [monthlyBudget]);

  const addSubscription = (subscription: Omit<Subscription, 'id'>) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: generateId(),
      color: CATEGORY_COLORS[subscription.category]
    };
    setSubscriptions(prev => [...prev, newSubscription]);
  };

  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id 
          ? { ...sub, ...updates, color: updates.category ? CATEGORY_COLORS[updates.category] : sub.color }
          : sub
      )
    );
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  return (
    <SubscriptionContext.Provider value={{
      subscriptions,
      addSubscription,
      updateSubscription,
      deleteSubscription,
      monthlyBudget,
      setMonthlyBudget
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};
