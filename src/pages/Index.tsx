
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import Navigation from '@/components/Navigation';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';
import SubscriptionList from '@/components/SubscriptionList';
import Insights from '@/components/Insights';
import UpcomingRenewals from '@/components/UpcomingRenewals';
import AuthCard from '@/components/AuthCard';
import { DollarSign } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);
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
    return (
      <>
        <LandingNavbar onGetStarted={() => setShowAuth(true)} />
        {showAuth ? <AuthCard /> : (
          <div className="min-h-screen gradient-surface">
            {/* Hero Section */}
            <section className="container-premium pt-20 pb-32">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 glass-card rounded-full text-sm text-muted-foreground mb-8 animate-fade-in">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Trusted by 500K+ users worldwide
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                  <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Master Your
                  </span>
                  <br />
                  <span className="text-foreground">Subscriptions</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed animate-fade-in">
                  Track, analyze, and optimize your digital spending with AI-powered insights. 
                  Never miss a renewal or overpay for unused subscriptions again.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
                  <button
                    onClick={() => setShowAuth(true)}
                    className="gradient-primary hover:opacity-90 text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-glow transition-smooth text-lg"
                  >
                    Start Free Trial
                  </button>
                  <button className="glass-card hover:bg-accent/80 px-8 py-4 rounded-xl font-semibold transition-smooth text-lg">
                    Watch Demo
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container-premium py-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Everything You Need
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Powerful features designed to give you complete control over your subscription spending
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Smart Tracking",
                    description: "Automatically categorize and track all your subscriptions with intelligent detection",
                    icon: "📊"
                  },
                  {
                    title: "Budget Management", 
                    description: "Set spending limits and get alerts when you're approaching your budget",
                    icon: "💰"
                  },
                  {
                    title: "Renewal Alerts",
                    description: "Never miss a renewal again with customizable notifications and reminders",
                    icon: "🔔"
                  },
                  {
                    title: "Spending Insights",
                    description: "Get detailed analytics and recommendations to optimize your spending",
                    icon: "📈"
                  },
                  {
                    title: "Multi-Device Sync",
                    description: "Access your data seamlessly across all your devices with real-time sync",
                    icon: "🔄"
                  },
                  {
                    title: "Export & Reports",
                    description: "Generate detailed reports and export your data for tax purposes",
                    icon: "📋"
                  }
                ].map((feature, index) => (
                  <div key={index} className="glass-card p-8 rounded-2xl hover:shadow-lg transition-smooth animate-fade-in">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="container-premium py-20">
              <div className="glass-card rounded-3xl p-12 md:p-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Ready to Take Control?
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of users who have already saved money and gained peace of mind with SubTracker.
                </p>
                <button
                  onClick={() => setShowAuth(true)}
                  className="gradient-primary hover:opacity-90 text-primary-foreground px-12 py-4 rounded-xl font-semibold shadow-glow transition-smooth text-lg"
                >
                  Start Your Free Trial
                </button>
              </div>
            </section>
          </div>
        )}
        <Footer />
      </>
    );
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
