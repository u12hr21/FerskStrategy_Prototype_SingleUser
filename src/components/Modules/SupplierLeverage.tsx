import React, { useState } from 'react';
import Card from '../Common/Card';
import MetricCard from '../Common/MetricCard';
import { Building2, DollarSign, TrendingUp, Award, Filter, MoreHorizontal } from 'lucide-react';

export default function SupplierLeverage() {
  const [filterType, setFilterType] = useState('all');

  const suppliers = [
    {
      id: '1',
      name: 'Marriott International',
      type: 'hotel_chain',
      totalSpend: 2100000,
      roomNights: 12500,
      preferredBookingCapture: 68,
      leverageScore: 89,
      markets: ['New York', 'London', 'San Francisco', 'Chicago'],
      contractStatus: 'active',
      renewalDate: '2024-12-31',
      preferredHotels: 45,
      chainwideAgreement: true
    },
    {
      id: '2',
      name: 'Hilton Worldwide',
      type: 'hotel_chain',
      totalSpend: 1850000,
      roomNights: 11200,
      preferredBookingCapture: 72,
      leverageScore: 85,
      markets: ['London', 'Tokyo', 'Sydney', 'Toronto'],
      contractStatus: 'expiring',
      renewalDate: '2024-06-30',
      preferredHotels: 38,
      chainwideAgreement: true
    },
    {
      id: '3',
      name: 'IHG Hotels & Resorts',
      type: 'hotel_chain',
      totalSpend: 980000,
      roomNights: 7800,
      preferredBookingCapture: 45,
      leverageScore: 62,
      markets: ['Frankfurt', 'Amsterdam', 'Dubai'],
      contractStatus: 'negotiating',
      renewalDate: '2024-09-15',
      preferredHotels: 22,
      chainwideAgreement: false
    },
    {
      id: '4',
      name: 'Boutique Collection',
      type: 'boutique',
      totalSpend: 450000,
      roomNights: 2100,
      preferredBookingCapture: 35,
      leverageScore: 42,
      markets: ['San Francisco', 'Austin', 'Portland'],
      contractStatus: 'active',
      renewalDate: '2025-03-31',
      preferredHotels: 8,
      chainwideAgreement: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#65c18e]/10 text-[#65c18e] border-[#65c18e]/20';
      case 'expiring':
        return 'bg-[#f58028]/10 text-[#f58028] border-[#f58028]/20';
      case 'negotiating':
        return 'bg-[#1b98d5]/10 text-[#1b98d5] border-[#1b98d5]/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getLeverageColor = (score: number) => {
    if (score >= 80) return 'text-[#65c18e]';
    if (score >= 60) return 'text-[#f58028]';
    return 'text-red-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Active Suppliers"
          value={suppliers.length}
          color="blue"
          icon={<Building2 className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Spend"
          value={formatCurrency(suppliers.reduce((sum, s) => sum + s.totalSpend, 0))}
          color="green"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Avg Leverage Score"
          value={Math.round(suppliers.reduce((sum, s) => sum + s.leverageScore, 0) / suppliers.length)}
          color="orange"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Contracts Expiring"
          value={suppliers.filter(s => s.contractStatus === 'expiring').length}
          color="orange"
          icon={<Award className="w-6 h-6" />}
        />
      </div>

      {/* Filters and Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Supplier Portfolio</h2>
            <p className="text-gray-600 mt-1">Analyze negotiating leverage and contract opportunities</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent"
              >
                <option value="all">All Suppliers</option>
                <option value="hotel_chain">Hotel Chains</option>
                <option value="boutique">Boutique</option>
                <option value="extended_stay">Extended Stay</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-[#232e66] text-white rounded-lg hover:bg-[#232e66]/90 transition-colors">
              Generate RFP
            </button>
          </div>
        </div>
      </Card>

      {/* Supplier List */}
      <Card>
        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(supplier.contractStatus)}`}>
                      {supplier.contractStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Spend</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(supplier.totalSpend)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Room Nights</p>
                      <p className="font-semibold text-gray-900">{supplier.roomNights.toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <p className="text-sm text-gray-500">Preferred Booking Capture</p>
                        <div className="group relative">
                          <div className="w-3 h-3 bg-gray-300 rounded-full text-xs flex items-center justify-center text-white cursor-help">
                            ?
                          </div>
                          <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            Percentage of total bookings with this supplier that occurred at hotels included in the preferred program.
                          </div>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">{supplier.preferredBookingCapture}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Leverage Score</p>
                      <p className={`font-semibold ${getLeverageColor(supplier.leverageScore)}`}>
                        {supplier.leverageScore}/100
                      </p>
                    </div>
                  </div>
                  
                  {/* New Metadata Section */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="flex items-center space-x-1">
                        <p className="text-sm text-gray-500">Preferred Hotels</p>
                        <div className="group relative">
                          <div className="w-3 h-3 bg-gray-300 rounded-full text-xs flex items-center justify-center text-white cursor-help">
                            ?
                          </div>
                          <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            Total number of hotels from this supplier included in the current preferred program.
                          </div>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">{supplier.preferredHotels}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <p className="text-sm text-gray-500">Chainwide Agreement</p>
                        <div className="group relative">
                          <div className="w-3 h-3 bg-gray-300 rounded-full text-xs flex items-center justify-center text-white cursor-help">
                            ?
                          </div>
                          <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            Indicates whether a chainwide dynamic rate agreement is active with this supplier.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          supplier.chainwideAgreement 
                            ? 'bg-[#65c18e]/10 text-[#65c18e]' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {supplier.chainwideAgreement ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contract Renewal</p>
                      <p className="font-medium text-gray-900">{new Date(supplier.renewalDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Key Markets</p>
                      <div className="flex flex-wrap gap-1">
                        {supplier.markets.slice(0, 3).map((market) => (
                          <span key={market} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {market}
                          </span>
                        ))}
                        {supplier.markets.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            +{supplier.markets.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leverage Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">High Leverage Opportunities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#65c18e]/10 rounded-lg border border-[#65c18e]/20">
              <div>
                <p className="font-medium text-gray-900">Marriott Renegotiation</p>
                <p className="text-sm text-gray-600">Strong volume leverage in 4 key markets</p>
              </div>
              <span className="text-[#65c18e] font-semibold">High</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1b98d5]/10 rounded-lg border border-[#1b98d5]/20">
              <div>
                <p className="font-medium text-gray-900">Hilton Contract Renewal</p>
                <p className="text-sm text-gray-600">Expiring soon, good negotiating position</p>
              </div>
              <span className="text-[#1b98d5] font-semibold">Medium</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#f58028]/10 rounded-lg border border-[#f58028]/20">
              <div>
                <p className="font-medium text-gray-900">Hilton Contract</p>
                <p className="text-sm text-gray-600">Expires in 3 months - action required</p>
              </div>
              <button className="px-3 py-1 bg-[#f58028] text-white rounded text-sm hover:bg-[#f58028]/90 transition-colors">
                Start RFP
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">IHG Negotiation</p>
                <p className="text-sm text-gray-600">In progress - review terms</p>
              </div>
              <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                Review
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}