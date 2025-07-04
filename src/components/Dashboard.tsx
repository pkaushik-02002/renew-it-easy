
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { DollarSign, CreditCard, TrendingUp, AlertCircle, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { subscriptions, monthlyBudget, loading } = useSubscriptions();

  const calculateMonthlyTotal = () => {
    return subscriptions.reduce((total, sub) => {
      const monthlyCost = sub.billingCycle === 'yearly' 
        ? sub.cost / 12 
        : sub.billingCycle === 'weekly' 
          ? sub.cost * 4.33 
          : sub.cost;
      return total + monthlyCost;
    }, 0);
  };

  const monthlyTotal = calculateMonthlyTotal();
  const budgetPercentage = monthlyBudget > 0 ? (monthlyTotal / monthlyBudget) * 100 : 0;
  const upcomingRenewals = subscriptions.filter(sub => {
    const daysUntil = Math.ceil((new Date(sub.nextBilling).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil >= 0;
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          Your Subscription Overview
        </h2>
        <p className="text-gray-600">
          Take control of your digital spending with intelligent insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">
              Monthly Spending
            </CardTitle>
            <DollarSign className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${monthlyTotal.toFixed(2)}</div>
            <p className="text-xs text-blue-200 mt-1">
              {budgetPercentage.toFixed(1)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{subscriptions.length}</div>
            <p className="text-xs text-purple-200 mt-1">
              Services you're subscribed to
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">
              Budget Remaining
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-emerald-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${Math.max(0, monthlyBudget - monthlyTotal).toFixed(2)}
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Available to spend
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">
              Upcoming Renewals
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingRenewals.length}</div>
            <p className="text-xs text-orange-200 mt-1">
              Renewing in next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Budget Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Monthly Budget: ${monthlyBudget.toFixed(2)}</span>
              <span>{budgetPercentage.toFixed(1)}% used</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  budgetPercentage > 100 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  budgetPercentage > 80 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                  'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              ></div>
            </div>
            {budgetPercentage > 100 && (
              <p className="text-sm text-red-600 font-medium">
                ⚠️ You're over budget by ${(monthlyTotal - monthlyBudget).toFixed(2)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Renewals */}
      {upcomingRenewals.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span>Upcoming Renewals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingRenewals.slice(0, 3).map((subscription) => {
                const daysUntil = Math.ceil(
                  (new Date(subscription.nextBilling).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div key={subscription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: subscription.color }}
                      >
                        {subscription.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{subscription.name}</p>
                        <p className="text-sm text-gray-600">${subscription.cost.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">
                        {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {subscriptions.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Plus className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start tracking your subscriptions
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Add your first subscription to begin monitoring your digital spending and get personalized insights.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Subscription
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
