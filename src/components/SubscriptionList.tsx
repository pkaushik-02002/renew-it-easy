
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { Plus, Calendar, DollarSign } from 'lucide-react';
import AddSubscriptionModal from './AddSubscriptionModal';

const SubscriptionList = () => {
  const { subscriptions, deleteSubscription } = useSubscriptions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const formatNextBilling = (date: string) => {
    const billingDate = new Date(date);
    const today = new Date();
    const daysUntil = Math.ceil((billingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return 'Overdue';
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    if (daysUntil <= 7) return `${daysUntil} days`;
    
    return billingDate.toLocaleDateString();
  };

  const getCostDisplay = (subscription: any) => {
    const { cost, billingCycle } = subscription;
    const monthlyCost = billingCycle === 'yearly' 
      ? cost / 12 
      : billingCycle === 'weekly' 
        ? cost * 4.33 
        : cost;
    
    return {
      actual: `$${cost.toFixed(2)}/${billingCycle.slice(0, -2)}`,
      monthly: billingCycle !== 'monthly' ? `$${monthlyCost.toFixed(2)}/mo` : null
    };
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => 
    new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Subscriptions</h2>
          <p className="text-gray-600">Manage your recurring payments</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      <div className="grid gap-4">
        {sortedSubscriptions.map((subscription) => {
          const costDisplay = getCostDisplay(subscription);
          const daysUntilRenewal = Math.ceil(
            (new Date(subscription.nextBilling).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          
          return (
            <Card 
              key={subscription.id} 
              className="hover:shadow-md transition-shadow duration-200 border-l-4"
              style={{ borderLeftColor: subscription.color }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: subscription.color }}
                    >
                      {subscription.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {subscription.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {subscription.category}
                        </span>
                        {subscription.description && (
                          <span>• {subscription.description}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSubscription(subscription.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-700">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">{costDisplay.actual}</span>
                      {costDisplay.monthly && (
                        <span className="text-sm text-gray-500">({costDisplay.monthly})</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span 
                      className={`text-sm font-medium ${
                        daysUntilRenewal <= 3 ? 'text-red-600' : 
                        daysUntilRenewal <= 7 ? 'text-orange-600' : 'text-gray-600'
                      }`}
                    >
                      Renews {formatNextBilling(subscription.nextBilling)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {subscriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <CreditCard className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first subscription to track your spending</p>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Subscription
          </Button>
        </div>
      )}

      <AddSubscriptionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};

export default SubscriptionList;
