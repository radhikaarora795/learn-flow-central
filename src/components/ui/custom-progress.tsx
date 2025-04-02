
import React from 'react';
import { Progress } from './progress';
import { cn } from '@/lib/utils';

interface CustomProgressProps {
  value: number;
  max?: number;
  className?: string;
  colorVariant?: 'primary' | 'accent' | 'success' | 'warning' | 'info';
}

export const CustomProgress: React.FC<CustomProgressProps> = ({
  value,
  max = 100,
  className,
  colorVariant = 'primary',
}) => {
  const getColorClass = () => {
    switch (colorVariant) {
      case 'primary':
        return 'bg-learn-primary';
      case 'accent':
        return 'bg-learn-accent';
      case 'success':
        return 'bg-learn-success';
      case 'warning':
        return 'bg-learn-warning';
      case 'info':
        return 'bg-learn-info';
      default:
        return 'bg-learn-primary';
    }
  };

  const progressValue = Math.min(Math.max(0, (value / max) * 100), 100);

  return (
    <div className={cn('w-full', className)}>
      <Progress 
        value={progressValue} 
        className={cn('h-2', getColorClass())}
      />
    </div>
  );
};
