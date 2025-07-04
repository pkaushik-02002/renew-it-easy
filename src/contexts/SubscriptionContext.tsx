
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  category: 'Entertainment' | 'Productivity' | 'Fitness' | 'Utilities' | 'Other';
  nextBilling: string;
  description?: string;
  color: string;
  userId: string;
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id' | 'userId'>) => Promise<void>;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
  monthlyBudget: number;
  setMonthlyBudget: (budget: number) => void;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const CATEGORY_COLORS = {
  Entertainment: '#ef4444',
  Productivity: '#3b82f6',  
  Fitness: '#10b981',
  Utilities: '#f59e0b',
  Other: '#8b5cf6'
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(200);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'subscriptions'),
      where('userId', '==', user.uid),
      orderBy('nextBilling', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscription[];
      setSubscriptions(subs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addSubscription = async (subscription: Omit<Subscription, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newSubscription = {
      ...subscription,
      userId: user.uid,
      color: CATEGORY_COLORS[subscription.category]
    };
    
    await addDoc(collection(db, 'subscriptions'), newSubscription);
  };

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    const docRef = doc(db, 'subscriptions', id);
    const updatedData = updates.category ? 
      { ...updates, color: CATEGORY_COLORS[updates.category] } : 
      updates;
    await updateDoc(docRef, updatedData);
  };

  const deleteSubscription = async (id: string) => {
    await deleteDoc(doc(db, 'subscriptions', id));
  };

  return (
    <SubscriptionContext.Provider value={{
      subscriptions,
      addSubscription,
      updateSubscription,
      deleteSubscription,
      monthlyBudget,
      setMonthlyBudget,
      loading
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
