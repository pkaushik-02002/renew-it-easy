
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import SubscriptionList from '@/components/SubscriptionList';
import Insights from '@/components/Insights';
import UpcomingRenewals from '@/components/UpcomingRenewals';
import AuthCard from '@/components/AuthCard';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthCard />;
  }

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {renderContent()}
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
