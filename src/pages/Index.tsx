
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import SubscriptionList from '@/components/SubscriptionList';
import Insights from '@/components/Insights';
import UpcomingRenewals from '@/components/UpcomingRenewals';
import AuthCard from '@/components/AuthCard';
import { DollarSign } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, loading } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'subscriptions':
        return <SubscriptionList />;
      case 'insights':
        return <Insights />;
      case 'renewals':
        return <UpcomingRenewals />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow animate-pulse">
            <DollarSign className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthCard />;
  }

  return (
    <SubscriptionProvider>
      <div className="min-h-screen gradient-surface">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container-premium pb-12 md:pb-20">
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </SubscriptionProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
