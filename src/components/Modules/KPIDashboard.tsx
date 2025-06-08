import React, { useState } from 'react';
import Card from '../Common/Card';
import MetricCard from '../Common/MetricCard';
import { BarChart3, TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle } from 'lucide-react';

export default function KPIDashboard() {
  const [timeframe, setTimeframe] = useState('ytd');

  const kpis = [
    {
      id: '1',
      name: 'Total Hotel Spend',
      category: 'cost',
      currentValue: 5380000,
      targetValue: 4800000,
      unit: '$',
      trend: 'down',
      trendValue: '8.2% vs last year',
      priority: 'high',
      status: 'on_track'
    },
    {
      id: '2',
      name: 'Average Cost per Trip',
      category: 'cost',
      currentValue: 285,
      targetValue: 260,
      unit: '$',
      trend: 'down',
      trendValue: '5.1% reduction',
      priority: 'high',
      status: 'needs_attention'
    },
    {
      id: '3',
      name: 'Booking Lead Time',
      category: 'behavior',
      currentValue: 12.5,
      targetValue: 14,
      unit: 'days',
      trend: 'up',
      trendValue: '1.2 days improvement',
      priority: 'medium',
      status: 'on_track'
    },
    {
      id: '4',
      name: 'Negotiated Rate Utilization',
      category: 'compliance',
      currentValue: 68,
      targetValue: 75,
      unit: '%',
      trend: 'up',
      trendValue: '3% increase',
      priority: 'high',
      status: 'needs_attention'
    },
    {
      id: '5',
      name: 'Traveler Satisfaction',
      category: 'satisfaction',
      currentValue: 3.8,
      targetValue: 4.2,
      unit: '/5',
      trend: 'stable',
      trendValue: 'No change',
      priority: 'medium',
      status: 'needs_attention'
    },
    {
      id: '6',
      name: 'Cancellation Rate',
      category: 'behavior',
      currentValue: 8.2,
      targetValue: 6,
      unit: '%',
      trend: 'down',
      trendValue: '1.1% improvement',
      priority: 'low',
      status: 'on_track'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track':
        return <CheckCircle className="w-5 h-5 text-[#65c18e]" />;
      case 'needs_attention':
        return <AlertTriangle className="w-5 h-5 text-[#f58028]" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'bg-[#65c18e]/10 text-[#65c18e] border-[#65c18e]/20';
      case 'needs_attention':
        return 'bg-[#f58028]/10 text-[#f58028] border-[#f58028]/20';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cost':
        return 'bg-[#1b98d5]/10 text-[#1b98d5]';
      case 'behavior':
        return 'bg-[#65c18e]/10 text-[#65c18e]';
      case 'satisfaction':
        return 'bg-[#f58028]/10 text-[#f58028]';
      case 'compliance':
        return 'bg-[#232e66]/10 text-[#232e66]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return `${value}${unit}`;
  };

  const calculateProgress = (current: number, target: number, category: string) => {
    // For cost metrics, lower is better
    if (category === 'cost') {
      return Math.min(100, Math.max(0, ((target - current) / target) * 100 + 100));
    }
    // For other metrics, higher is better
    return Math.min(100, Math.max(0, (current / target) * 100));
  };

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total KPIs"
          value={kpis.length}
          color="blue"
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <MetricCard
          title="On Track"
          value={kpis.filter(k => k.status === 'on_track').length}
          color="green"
          icon={<CheckCircle className="w-6 h-6" />}
        />
        <MetricCard
          title="Need Attention"
          value={kpis.filter(k => k.status === 'needs_attention').length}
          color="orange"
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <MetricCard
          title="Avg Progress"
          value={Math.round(kpis.reduce((sum, k) => sum + calculateProgress(k.currentValue, k.targetValue, k.category), 0) / kpis.length)}
          unit="%"
          color="blue"
          icon={<Target className="w-6 h-6" />}
        />
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">KPI Performance</h2>
            <p className="text-gray-600 mt-1">Monitor progress against strategic targets</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Timeframe:</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent"
              >
                <option value="mtd">Month to Date</option>
                <option value="qtd">Quarter to Date</option>
                <option value="ytd">Year to Date</option>
                <option value="rolling">Rolling 12 Months</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-[#232e66] text-white rounded-lg hover:bg-[#232e66]/90 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </Card>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(kpi.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">{kpi.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(kpi.category)}`}>
                    {kpi.category.toUpperCase()}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(kpi.status)}`}>
                {kpi.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current</p>
                  <p className="text-2xl font-bold text-gray-900">{formatValue(kpi.currentValue, kpi.unit)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Target</p>
                  <p className="text-lg font-semibold text-gray-700">{formatValue(kpi.targetValue, kpi.unit)}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Progress to Target</span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(calculateProgress(kpi.currentValue, kpi.targetValue, kpi.category))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#1b98d5] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress(kpi.currentValue, kpi.targetValue, kpi.category)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#65c18e]" />}
                {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                {kpi.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full"></div>}
                <span className="text-gray-600">{kpi.trendValue}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Alerts and Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-[#f58028]/10 rounded-lg border border-[#f58028]/20">
              <AlertTriangle className="w-5 h-5 text-[#f58028] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Cost per Trip Above Target</p>
                <p className="text-sm text-gray-600">Current rate $285 vs target $260. Consider supplier renegotiation.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#f58028]/10 rounded-lg border border-[#f58028]/20">
              <AlertTriangle className="w-5 h-5 text-[#f58028] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Low Rate Utilization</p>
                <p className="text-sm text-gray-600">Only 68% using negotiated rates. Review policy compliance.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-[#65c18e]/10 rounded-lg border border-[#65c18e]/20">
              <CheckCircle className="w-5 h-5 text-[#65c18e] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Improve Booking Lead Time</p>
                <p className="text-sm text-gray-600">Current 12.5 days is good. Target 14+ days for better rates.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#1b98d5]/10 rounded-lg border border-[#1b98d5]/20">
              <Target className="w-5 h-5 text-[#1b98d5] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Focus on Satisfaction</p>
                <p className="text-sm text-gray-600">Traveler satisfaction at 3.8/5. Survey feedback suggests room quality concerns.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}