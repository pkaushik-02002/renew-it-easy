
import React, { useState } from 'react';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import SubscriptionList from '@/components/SubscriptionList';
import Insights from '@/components/Insights';
import UpcomingRenewals from '@/components/UpcomingRenewals';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {renderContent()}
        </main>
      </div>
    </SubscriptionProvider>
  );
};

export default Index;
