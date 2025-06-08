import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'gray';
  icon?: React.ReactNode;
}

export default function MetricCard({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  color = 'blue',
  icon 
}: MetricCardProps) {
  const colorClasses = {
    blue: 'border-[#1b98d5] bg-[#1b98d5]/5',
    green: 'border-[#65c18e] bg-[#65c18e]/5',
    orange: 'border-[#f58028] bg-[#f58028]/5',
    red: 'border-red-500 bg-red-50',
    gray: 'border-gray-300 bg-gray-50'
  };

  const iconColors = {
    blue: 'text-[#1b98d5]',
    green: 'text-[#65c18e]',
    orange: 'text-[#f58028]',
    red: 'text-red-500',
    gray: 'text-gray-500'
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-[#65c18e]" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {trend && trendValue && (
            <div className="flex items-center space-x-1 mt-2">
              {getTrendIcon()}
              <span className="text-sm text-gray-600">{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`${iconColors[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}