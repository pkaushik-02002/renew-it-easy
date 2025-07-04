
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { Calendar, Clock, DollarSign } from 'lucide-react';

const UpcomingRenewals = () => {
  const { subscriptions } = useSubscriptions();

  const getUpcomingRenewals = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return subscriptions
      .map(sub => {
        const renewalDate = new Date(sub.nextBilling);
        const daysUntil = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return { ...sub, renewalDate, daysUntil };
      })
      .filter(sub => sub.daysUntil >= 0 && sub.daysUntil <= 30)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const upcomingRenewals = getUpcomingRenewals();

  const formatDaysUntil = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days <= 7) return `${days} days`;
    if (days <= 14) return `${Math.ceil(days / 7)} week${Math.ceil(days / 7) > 1 ? 's' : ''}`;
    return `${Math.ceil(days / 7)} weeks`;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return 'text-red-600 bg-red-50 border-red-200';
    if (days <= 3) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (days <= 7) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Renewals</h2>
        <p className="text-gray-600">Stay ahead of your subscription renewals</p>
      </div>

      <div className="space-y-4">
        {upcomingRenewals.map((subscription) => (
          <Card 
            key={subscription.id} 
            className={`border-l-4 ${getUrgencyColor(subscription.daysUntil)}`}
            style={{ borderLeftColor: subscription.color }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: subscription.color }}
                  >
                    {subscription.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {subscription.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{subscription.category}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-gray-700">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">${subscription.cost.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">{subscription.billingCycle}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {subscription.renewalDate.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span 
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      subscription.daysUntil <= 1 ? 'text-red-700 bg-red-100' :
                      subscription.daysUntil <= 3 ? 'text-orange-700 bg-orange-100' :
                      subscription.daysUntil <= 7 ? 'text-yellow-700 bg-yellow-100' :
                      'text-blue-700 bg-blue-100'
                    }`}
                  >
                    {formatDaysUntil(subscription.daysUntil)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {upcomingRenewals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming renewals</h3>
          <p className="text-gray-600">You're all set for the next 30 days</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingRenewals;
