
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, List, TrendingUp, Calendar, LogOut, User, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DollarSign },
    { id: 'subscriptions', label: 'Subscriptions', icon: List },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'renewals', label: 'Renewals', icon: Calendar },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="glass border-b border-border/30 sticky top-0 z-50 mb-4 md:mb-6">
      <div className="container-premium">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                SubTracker
              </h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>Premium</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="glass-card rounded-xl p-1 flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth text-sm ${
                      activeTab === item.id 
                        ? 'gradient-primary text-primary-foreground shadow-lg' 
                        : 'hover:bg-accent/80'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-2">
            {/* User Info - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 glass-card rounded-lg">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium truncate max-w-[100px] lg:max-w-[150px]">
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            
            {/* Logout Button - Hidden on mobile */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex glass hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-smooth"
            >
              <LogOut className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden glass"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/30 py-3 animate-fade-in">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full justify-start px-3 py-2.5 transition-smooth ${
                      activeTab === item.id 
                        ? 'gradient-primary text-primary-foreground' 
                        : 'hover:bg-accent/80'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
              
              {/* Mobile User Info & Logout */}
              <div className="pt-2 mt-2 border-t border-border/30 space-y-2">
                <div className="flex items-center space-x-3 px-3 py-2 glass-card rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium truncate">
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full justify-start px-3 py-2.5 glass hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-smooth"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
