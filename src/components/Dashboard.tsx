
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { DollarSign, CreditCard, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { subscriptions, monthlyBudget } = useSubscriptions();

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
  const budgetUsed = (monthlyTotal / monthlyBudget) * 100;
  const upcomingRenewals = subscriptions
    .filter(sub => {
      const nextBilling = new Date(sub.nextBilling);
      const today = new Date();
      const daysUntilRenewal = Math.ceil((nextBilling.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
    })
    .length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Subscriptions</h1>
        <p className="text-gray-600">Take control of your digital spending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Monthly Total</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">${monthlyTotal.toFixed(2)}</div>
            <p className="text-xs text-blue-600">
              {budgetUsed.toFixed(0)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{subscriptions.length}</div>
            <p className="text-xs text-green-600">
              Services tracked
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Budget Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">${monthlyBudget.toFixed(0)}</div>
            <p className="text-xs text-orange-600">
              Monthly budget limit
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Upcoming Renewals</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{upcomingRenewals}</div>
            <p className="text-xs text-purple-600">
              In the next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Budget Progress</h3>
          <span className="text-sm text-gray-600">${monthlyTotal.toFixed(2)} / ${monthlyBudget.toFixed(0)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              budgetUsed > 90 ? 'bg-red-500' : budgetUsed > 75 ? 'bg-orange-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {budgetUsed > 100 
            ? `You're over budget by $${(monthlyTotal - monthlyBudget).toFixed(2)}` 
            : `$${(monthlyBudget - monthlyTotal).toFixed(2)} remaining this month`
          }
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
