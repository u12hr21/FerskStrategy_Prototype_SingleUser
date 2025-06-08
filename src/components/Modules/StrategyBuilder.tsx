import React, { useState } from 'react';
import Card from '../Common/Card';
import MetricCard from '../Common/MetricCard';
import { Target, Calendar, Plus, CheckCircle, Clock, AlertCircle, DollarSign, TrendingDown, TrendingUp, Star, MapPin, ChevronDown } from 'lucide-react';

export default function StrategyBuilder() {
  const [timeframe, setTimeframe] = useState('90days');
  const [goals, setGoals] = useState([
    {
      id: '1',
      title: 'Reduce Hotel Spend by 15%',
      description: 'Optimize supplier mix and negotiate better rates in top 10 markets',
      targetDate: '2024-12-31',
      priority: 'high' as const,
      status: 'in_progress' as const,
      kpis: ['total-spend', 'avg-rate']
    },
    {
      id: '2',
      title: 'Improve Traveler Satisfaction',
      description: 'Increase satisfaction scores to 4.2+ across all markets',
      targetDate: '2024-09-30',
      priority: 'medium' as const,
      status: 'not_started' as const,
      kpis: ['satisfaction']
    }
  ]);

  const [showNewGoal, setShowNewGoal] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#65c18e]" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-[#f58028]" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-[#f58028]/10 text-[#f58028]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Dynamic data based on timeframe
  const getMetricData = () => {
    switch (timeframe) {
      case '30days':
        return {
          avgCost: { value: '$425', trend: 'down', trendValue: '2% vs last month' },
          rateUtil: { value: '76%', trend: 'up', trendValue: '1% improvement' },
          satisfaction: { value: '4.2', trend: 'up', trendValue: '0.1 point increase' },
          topMarket: { value: 'New York', trend: 'up', trendValue: '$89K savings' }
        };
      case 'ytd':
        return {
          avgCost: { value: '$398', trend: 'down', trendValue: '8% YTD' },
          rateUtil: { value: '82%', trend: 'up', trendValue: '7% improvement' },
          satisfaction: { value: '4.4', trend: 'up', trendValue: '0.3 point increase' },
          topMarket: { value: 'London', trend: 'up', trendValue: '$425K savings' }
        };
      default: // 90days
        return {
          avgCost: { value: '$412', trend: 'down', trendValue: '4% vs Q3' },
          rateUtil: { value: '78%', trend: 'up', trendValue: '3% improvement' },
          satisfaction: { value: '4.3', trend: 'stable', trendValue: 'No change' },
          topMarket: { value: 'London', trend: 'up', trendValue: '$176K savings' }
        };
    }
  };

  const metricData = getMetricData();

  return (
    <div className="space-y-6">
      {/* Strategy Pulse Panel */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Strategy Pulse Panel</h2>
            <p className="text-gray-600 mt-1">Live insights into program performance and strategic alignment</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Timeframe:</span>
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent cursor-pointer"
              >
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="ytd">Year to Date</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Avg. Hotel Cost per Trip"
            value={metricData.avgCost.value}
            trend={metricData.avgCost.trend as 'up' | 'down' | 'stable'}
            trendValue={metricData.avgCost.trendValue}
            color="blue"
            icon={<DollarSign className="w-6 h-6" />}
          />
          <MetricCard
            title="Rate Utilization"
            value={metricData.rateUtil.value}
            unit="vs 85% target"
            trend={metricData.rateUtil.trend as 'up' | 'down' | 'stable'}
            trendValue={metricData.rateUtil.trendValue}
            color="orange"
            icon={<Target className="w-6 h-6" />}
          />
          <MetricCard
            title="Traveler Satisfaction"
            value={metricData.satisfaction.value}
            unit="/ 5 ⭐"
            trend={metricData.satisfaction.trend as 'up' | 'down' | 'stable'}
            trendValue={metricData.satisfaction.trendValue}
            color="green"
            icon={<Star className="w-6 h-6" />}
          />
          <MetricCard
            title="Top Performing Market"
            value={metricData.topMarket.value}
            unit={metricData.topMarket.trendValue}
            trend={metricData.topMarket.trend as 'up' | 'down' | 'stable'}
            trendValue="From preferred partners"
            color="green"
            icon={<MapPin className="w-6 h-6" />}
          />
        </div>
      </Card>

      {/* Strategic Goals */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Strategic Goals</h2>
            <p className="text-gray-600 mt-1">Define and track your travel program objectives</p>
          </div>
          <button
            onClick={() => setShowNewGoal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#232e66] text-white rounded-lg hover:bg-[#232e66]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </button>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(goal.status)}
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{goal.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{goal.kpis.length} KPIs linked</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-[#1b98d5] hover:bg-[#1b98d5]/10 rounded transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded transition-colors">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <Target className="w-12 h-12 text-[#1b98d5] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Set KPI Targets</h3>
          <p className="text-gray-600 mb-4">Define measurable targets for your travel program</p>
          <button className="w-full px-4 py-2 bg-[#1b98d5] text-white rounded-lg hover:bg-[#1b98d5]/90 transition-colors">
            Configure KPIs
          </button>
        </Card>

        <Card className="text-center">
          <Calendar className="w-12 h-12 text-[#65c18e] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Plan Timeline</h3>
          <p className="text-gray-600 mb-4">Create implementation roadmap and milestones</p>
          <button className="w-full px-4 py-2 bg-[#65c18e] text-white rounded-lg hover:bg-[#65c18e]/90 transition-colors">
            Build Timeline
          </button>
        </Card>

        <Card className="text-center">
          <CheckCircle className="w-12 h-12 text-[#f58028] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Progress</h3>
          <p className="text-gray-600 mb-4">Track goal completion and adjust strategy</p>
          <button className="w-full px-4 py-2 bg-[#f58028] text-white rounded-lg hover:bg-[#f58028]/90 transition-colors">
            View Progress
          </button>
        </Card>
      </div>
    </div>
  );
}