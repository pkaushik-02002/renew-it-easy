
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubscriptions } from '@/contexts/SubscriptionContext';

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { addSubscription } = useSubscriptions();
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    billingCycle: 'monthly' as 'monthly' | 'yearly' | 'weekly',
    category: 'Entertainment' as 'Entertainment' | 'Productivity' | 'Fitness' | 'Utilities' | 'Other',
    nextBilling: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.cost || !formData.nextBilling) {
      return;
    }

    addSubscription({
      ...formData,
      cost: parseFloat(formData.cost),
      color: '' // Will be set by context based on category
    });

    // Reset form
    setFormData({
      name: '',
      cost: '',
      billingCycle: 'monthly',
      category: 'Entertainment',
      nextBilling: '',
      description: ''
    });

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Add New Subscription</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Service Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Netflix, Spotify, Adobe"
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cost" className="text-sm font-medium text-gray-700">
                Cost *
              </Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0"
                value={formData.cost}
                onChange={(e) => handleInputChange('cost', e.target.value)}
                placeholder="0.00"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="billingCycle" className="text-sm font-medium text-gray-700">
                Billing Cycle *
              </Label>
              <Select value={formData.billingCycle} onValueChange={(value) => handleInputChange('billingCycle', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Productivity">Productivity</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="nextBilling" className="text-sm font-medium text-gray-700">
              Next Billing Date *
            </Label>
            <Input
              id="nextBilling"
              type="date"
              value={formData.nextBilling}
              onChange={(e) => handleInputChange('nextBilling', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description (Optional)
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the service"
              className="mt-1"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Add Subscription
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubscriptionModal;
