
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Insights = () => {
  const { subscriptions } = useSubscriptions();

  const categoryData = subscriptions.reduce((acc, sub) => {
    const monthlyCost = sub.billingCycle === 'yearly' 
      ? sub.cost / 12 
      : sub.billingCycle === 'weekly' 
        ? sub.cost * 4.33 
        : sub.cost;
    
    acc[sub.category] = (acc[sub.category] || 0) + monthlyCost;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: getColorForCategory(category)
  }));

  const barData = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount: parseFloat(amount.toFixed(2))
  }));

  function getColorForCategory(category: string) {
    const colors = {
      Entertainment: '#ef4444',
      Productivity: '#3b82f6',
      Fitness: '#10b981',
      Utilities: '#f59e0b',
      Other: '#8b5cf6'
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  }

  const totalMonthly = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
  const avgSubscriptionCost = totalMonthly / subscriptions.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Spending Insights</h2>
        <p className="text-gray-600">Understand your subscription spending patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Monthly Cost']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">${entry.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    fontSize={12}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Monthly Cost']} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-700">Average Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              ${avgSubscriptionCost.toFixed(2)}
            </div>
            <p className="text-xs text-blue-600">Per subscription monthly</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-700">Highest Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {pieData.length > 0 ? pieData.reduce((max, cat) => cat.value > max.value ? cat : max).name : 'None'}
            </div>
            <p className="text-xs text-green-600">Most expensive category</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-purple-700">Annual Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ${(totalMonthly * 12).toFixed(0)}
            </div>
            <p className="text-xs text-purple-600">Yearly spending estimate</p>
          </CardContent>
        </Card>
      </div>

      {subscriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <BarChart className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights yet</h3>
          <p className="text-gray-600">Add some subscriptions to see spending insights and trends</p>
        </div>
      )}
    </div>
  );
};

export default Insights;
