import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Lock, 
  Chrome, 
  DollarSign, 
  Shield, 
  Zap, 
  TrendingUp, 
  Bell, 
  Users, 
  Star,
  CheckCircle,
  BarChart3,
  Calendar,
  CreditCard,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: DollarSign,
      title: "Smart Tracking",
      description: "Automatically track all your subscriptions with intelligent cost analysis and budgeting tools."
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Never miss a renewal again with customizable alerts and notifications before charges."
    },
    {
      icon: TrendingUp,
      title: "Spending Insights",
      description: "Visualize your spending patterns with beautiful charts and actionable recommendations."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and secure. Use anonymously or with your preferred login method."
    }
  ];

  const stats = [
    { number: "500K+", label: "Users Trust Us" },
    { number: "$2.3M", label: "Savings Generated" },
    { number: "12+", label: "Avg Subscriptions Tracked" },
    { number: "4.9★", label: "User Rating" }
  ];

  const benefits = [
    "Track unlimited subscriptions",
    "Set custom budgets and alerts",
    "Export data anytime",
    "Works on all devices",
    "Privacy-focused design",
    "No ads, ever"
  ];

  if (showAuth) {
    return (
      <div className="min-h-screen gradient-surface flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <DollarSign className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              SubTracker
            </h1>
            <p className="text-muted-foreground mt-2">
              Take control of your subscriptions
            </p>
          </div>

          <Card className="glass-card shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-semibold">
                {isLogin ? 'Welcome back' : 'Create account'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 glass hover:bg-accent/80 border border-border/50 transition-smooth"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <Chrome className="h-5 w-5 mr-3" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 glass border-border/50 focus:border-primary transition-smooth"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 glass border-border/50 focus:border-primary transition-smooth"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 gradient-primary hover:opacity-90 text-primary-foreground font-medium transition-smooth shadow-lg hover:shadow-glow"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setShowAuth(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to homepage
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-surface">
      {/* Hero Section */}
      <section className="container-premium py-12 md:py-20 lg:py-32">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 gradient-primary rounded-3xl flex items-center justify-center shadow-glow">
              <DollarSign className="h-10 w-10 md:h-12 md:w-12 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                SubTracker
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-muted-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Premium Edition</span>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed">
              Take complete control of your digital spending with the most beautiful subscription management platform
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Track every subscription, get smart insights, and never miss a renewal again. 
              Join 500K+ users who've saved millions with our intelligent platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              onClick={() => setShowAuth(true)}
              className="h-14 px-8 text-lg gradient-primary hover:opacity-90 text-primary-foreground font-semibold transition-smooth shadow-xl hover:shadow-glow group"
            >
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              className="h-14 px-8 text-lg glass hover:bg-accent/80 border-border/50 transition-smooth"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-slide-up">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container-premium py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to manage subscriptions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to give you complete visibility and control over your recurring expenses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-0 shadow-lg hover:shadow-xl transition-smooth group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-smooth">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Grid */}
        <Card className="glass-card border-0 shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Why choose SubTracker?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="w-full h-20 gradient-primary rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="w-full h-20 glass-card rounded-xl flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="w-full h-20 glass-card rounded-xl flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div className="w-full h-20 gradient-primary rounded-xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container-premium py-20">
        <Card className="gradient-primary border-0 shadow-2xl shadow-primary/20">
          <CardContent className="p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to take control?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who've already saved money and gained peace of mind with SubTracker
            </p>
            <Button 
              onClick={() => setShowAuth(true)}
              variant="secondary"
              className="h-14 px-8 text-lg font-semibold transition-bouncy hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AuthCard;