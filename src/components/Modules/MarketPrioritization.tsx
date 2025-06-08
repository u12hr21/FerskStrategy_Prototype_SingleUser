import React, { useState, useMemo } from 'react';
import Card from '../Common/Card';
import MetricCard from '../Common/MetricCard';
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Filter, 
  Search, 
  ChevronDown, 
  ArrowLeft,
  BarChart3,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
  Building2,
  Flag,
  TrendingDown
} from 'lucide-react';

export default function MarketPrioritization() {
  const [sortBy, setSortBy] = useState('spend');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [leverageRange, setLeverageRange] = useState([0, 100]);
  const [marketLimit, setMarketLimit] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'list' | 'analyze' | 'details'>('list');
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [flaggedHotels, setFlaggedHotels] = useState<string[]>([]);

  // Expanded sample market data for scalability testing
  const allMarkets = [
    {
      id: '1',
      city: 'New York',
      country: 'United States',
      region: 'North America',
      totalSpend: 1250000,
      roomNights: 8500,
      averageRate: 285,
      leverageScore: 92,
      priority: 'high',
      costPerTrip: 412,
      geoSureScore: 85,
      satisfactionScore: 4.2,
      strategicTags: ['High Volume', 'Rate Accuracy Risk']
    },
    {
      id: '2',
      city: 'London',
      country: 'United Kingdom',
      region: 'Europe',
      totalSpend: 980000,
      roomNights: 6200,
      averageRate: 320,
      leverageScore: 78,
      priority: 'high',
      costPerTrip: 445,
      geoSureScore: 92,
      satisfactionScore: 4.4,
      strategicTags: ['Emerging Market', 'High Spend Growth']
    },
    {
      id: '3',
      city: 'San Francisco',
      country: 'United States',
      region: 'North America',
      totalSpend: 875000,
      roomNights: 4800,
      averageRate: 395,
      leverageScore: 85,
      priority: 'medium',
      costPerTrip: 520,
      geoSureScore: 88,
      satisfactionScore: 3.9,
      strategicTags: ['High Cost Market']
    },
    {
      id: '4',
      city: 'Tokyo',
      country: 'Japan',
      region: 'Asia Pacific',
      totalSpend: 720000,
      roomNights: 5100,
      averageRate: 275,
      leverageScore: 65,
      priority: 'medium',
      costPerTrip: 380,
      geoSureScore: 95,
      satisfactionScore: 4.1,
      strategicTags: ['Stable Market']
    },
    {
      id: '5',
      city: 'Frankfurt',
      country: 'Germany',
      region: 'Europe',
      totalSpend: 650000,
      roomNights: 4200,
      averageRate: 310,
      leverageScore: 58,
      priority: 'medium',
      costPerTrip: 425,
      geoSureScore: 90,
      satisfactionScore: 3.8,
      strategicTags: ['Rate Accuracy Risk']
    },
    {
      id: '6',
      city: 'Singapore',
      country: 'Singapore',
      region: 'Asia Pacific',
      totalSpend: 580000,
      roomNights: 3800,
      averageRate: 295,
      leverageScore: 72,
      priority: 'medium',
      costPerTrip: 390,
      geoSureScore: 93,
      satisfactionScore: 4.3,
      strategicTags: ['Emerging Market']
    },
    {
      id: '7',
      city: 'Chicago',
      country: 'United States',
      region: 'North America',
      totalSpend: 520000,
      roomNights: 3600,
      averageRate: 265,
      leverageScore: 68,
      priority: 'low',
      costPerTrip: 355,
      geoSureScore: 87,
      satisfactionScore: 4.0,
      strategicTags: ['Stable Market']
    },
    {
      id: '8',
      city: 'Paris',
      country: 'France',
      region: 'Europe',
      totalSpend: 480000,
      roomNights: 3200,
      averageRate: 340,
      leverageScore: 55,
      priority: 'low',
      costPerTrip: 465,
      geoSureScore: 89,
      satisfactionScore: 3.7,
      strategicTags: ['High Cost Market']
    },
    {
      id: '9',
      city: 'Sydney',
      country: 'Australia',
      region: 'Asia Pacific',
      totalSpend: 420000,
      roomNights: 2800,
      averageRate: 285,
      leverageScore: 62,
      priority: 'low',
      costPerTrip: 395,
      geoSureScore: 91,
      satisfactionScore: 4.2,
      strategicTags: ['Stable Market']
    },
    {
      id: '10',
      city: 'Toronto',
      country: 'Canada',
      region: 'North America',
      totalSpend: 380000,
      roomNights: 2600,
      averageRate: 245,
      leverageScore: 48,
      priority: 'low',
      costPerTrip: 325,
      geoSureScore: 94,
      satisfactionScore: 4.1,
      strategicTags: ['Low Leverage']
    },
    {
      id: '11',
      city: 'Amsterdam',
      country: 'Netherlands',
      region: 'Europe',
      totalSpend: 350000,
      roomNights: 2400,
      averageRate: 295,
      leverageScore: 52,
      priority: 'low',
      costPerTrip: 385,
      geoSureScore: 92,
      satisfactionScore: 4.0,
      strategicTags: ['Emerging Market']
    },
    {
      id: '12',
      city: 'Dubai',
      country: 'UAE',
      region: 'Middle East',
      totalSpend: 320000,
      roomNights: 2200,
      averageRate: 275,
      leverageScore: 45,
      priority: 'low',
      costPerTrip: 365,
      geoSureScore: 86,
      satisfactionScore: 3.9,
      strategicTags: ['Low Leverage', 'Emerging Market']
    }
  ];

  // Sample hotel data for Details view
  const getHotelsForMarket = (marketId: string) => {
    const hotelData: { [key: string]: any[] } = {
      '1': [ // New York
        {
          id: 'h1',
          name: 'Marriott Marquis Times Square',
          chain: 'Marriott International',
          roomNights: 2800,
          spend: 420000,
          adr: 315,
          negotiatedRate: 295,
          barRate: 325,
          rateCompliance: 89,
          satisfaction: 4.3,
          flagged: false
        },
        {
          id: 'h2',
          name: 'Hilton Midtown',
          chain: 'Hilton Worldwide',
          roomNights: 2200,
          spend: 385000,
          adr: 295,
          negotiatedRate: 275,
          barRate: 310,
          rateCompliance: 92,
          satisfaction: 4.1,
          flagged: false
        },
        {
          id: 'h3',
          name: 'The Plaza Hotel',
          chain: 'Independent',
          roomNights: 1800,
          spend: 445000,
          adr: 425,
          negotiatedRate: 450,
          barRate: 395,
          rateCompliance: 65,
          satisfaction: 4.6,
          flagged: true
        },
        {
          id: 'h4',
          name: 'InterContinental New York',
          chain: 'IHG Hotels & Resorts',
          roomNights: 1700,
          spend: 298000,
          adr: 275,
          negotiatedRate: 265,
          barRate: 285,
          rateCompliance: 88,
          satisfaction: 4.2,
          flagged: false
        }
      ],
      '2': [ // London
        {
          id: 'h5',
          name: 'The Langham London',
          chain: 'Langham Hospitality',
          roomNights: 2100,
          spend: 365000,
          adr: 340,
          negotiatedRate: 325,
          barRate: 355,
          rateCompliance: 85,
          satisfaction: 4.5,
          flagged: false
        },
        {
          id: 'h6',
          name: 'Marriott County Hall',
          chain: 'Marriott International',
          roomNights: 1900,
          spend: 285000,
          adr: 295,
          negotiatedRate: 285,
          barRate: 315,
          rateCompliance: 91,
          satisfaction: 4.2,
          flagged: false
        },
        {
          id: 'h7',
          name: 'Hilton Park Lane',
          chain: 'Hilton Worldwide',
          roomNights: 1600,
          spend: 330000,
          adr: 385,
          negotiatedRate: 395,
          barRate: 375,
          rateCompliance: 78,
          satisfaction: 4.4,
          flagged: true
        }
      ]
    };
    return hotelData[marketId] || [];
  };

  // Filter and search logic
  const filteredMarkets = useMemo(() => {
    let filtered = allMarkets.filter(market => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        market.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.region.toLowerCase().includes(searchTerm.toLowerCase());

      // Region filter
      const regionMatch = filterRegion === 'all' || market.region === filterRegion;

      // Priority filter
      const priorityMatch = filterPriority === 'all' || market.priority === filterPriority;

      // Leverage score filter
      const leverageMatch = market.leverageScore >= leverageRange[0] && market.leverageScore <= leverageRange[1];

      return searchMatch && regionMatch && priorityMatch && leverageMatch;
    });

    // Sort markets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'spend':
          return b.totalSpend - a.totalSpend;
        case 'leverage':
          return b.leverageScore - a.leverageScore;
        case 'rate':
          return b.averageRate - a.averageRate;
        case 'nights':
          return b.roomNights - a.roomNights;
        case 'costPerTrip':
          return b.costPerTrip - a.costPerTrip;
        default:
          return 0;
      }
    });

    // Apply market limit
    if (marketLimit !== 'all') {
      filtered = filtered.slice(0, parseInt(marketLimit));
    }

    return filtered;
  }, [allMarkets, searchTerm, filterRegion, filterPriority, leverageRange, sortBy, marketLimit]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-[#f58028]/10 text-[#f58028] border-[#f58028]/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAnalyze = (market: any) => {
    setSelectedMarket(market);
    setCurrentView('analyze');
  };

  const handleDetails = (market: any) => {
    setSelectedMarket(market);
    setCurrentView('details');
    // Set flagged hotels based on the selected market's hotels
    const hotels = getHotelsForMarket(market.id);
    setFlaggedHotels(hotels.filter(h => h.flagged).map(h => h.id));
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedMarket(null);
    setFlaggedHotels([]);
  };

  const toggleFlag = (hotelId: string) => {
    setFlaggedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  // Market Analyze View
  if (currentView === 'analyze' && selectedMarket) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <Card>
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleBackToList}
              className="flex items-center space-x-2 text-[#1b98d5] hover:text-[#1b98d5]/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Markets</span>
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedMarket.city} Market Analysis</h1>
            <p className="text-gray-600 mt-1">{selectedMarket.country} • {selectedMarket.region}</p>
          </div>
        </Card>

        {/* Market Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Total Spend"
            value={formatCurrency(selectedMarket.totalSpend)}
            trend="down"
            trendValue="8% vs last year"
            color="blue"
            icon={<DollarSign className="w-6 h-6" />}
          />
          <MetricCard
            title="Average Daily Rate"
            value={formatCurrency(selectedMarket.averageRate)}
            trend="up"
            trendValue="5% vs last quarter"
            color="orange"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <MetricCard
            title="Room Nights"
            value={selectedMarket.roomNights.toLocaleString()}
            trend="up"
            trendValue="12% growth"
            color="green"
            icon={<Users className="w-6 h-6" />}
          />
          <MetricCard
            title="GeoSure Safety"
            value={selectedMarket.geoSureScore}
            unit="/100"
            trend="stable"
            trendValue="No change"
            color="green"
            icon={<Shield className="w-6 h-6" />}
          />
        </div>

        {/* Trend Charts and Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend Trend (Last 12 Months)</h3>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Trend chart visualization</p>
                <p className="text-sm text-gray-400">Peak: $125K (Dec), Low: $89K (Feb)</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#65c18e]/10 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Marriott International</p>
                  <p className="text-sm text-gray-600">Rate utilization: 89%</p>
                </div>
                <span className="text-[#65c18e] font-semibold">Excellent</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#f58028]/10 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Independent Hotels</p>
                  <p className="text-sm text-gray-600">Rate accuracy: 65%</p>
                </div>
                <span className="text-[#f58028] font-semibold">Needs Review</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#1b98d5]/10 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Hilton Worldwide</p>
                  <p className="text-sm text-gray-600">Rate utilization: 92%</p>
                </div>
                <span className="text-[#1b98d5] font-semibold">Good</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Traveler Experience and Strategic Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traveler Experience</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Overall Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-[#f58028]" />
                  <span className="font-semibold">{selectedMarket.satisfactionScore}/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Safety Score</span>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#65c18e]" />
                  <span className="font-semibold">{selectedMarket.geoSureScore}/100</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Booking Lead Time</span>
                <span className="font-semibold">14.2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cancellation Rate</span>
                <span className="font-semibold">6.8%</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
            <div className="space-y-3">
              {selectedMarket.strategicTags.includes('Rate Accuracy Risk') && (
                <div className="flex items-start space-x-3 p-3 bg-[#f58028]/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-[#f58028] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Rate Accuracy Risk</p>
                    <p className="text-sm text-gray-600">FerskAudit has identified rate compliance issues requiring attention</p>
                    <div className="mt-2">
                      <button className="text-sm bg-[#f58028] text-white px-3 py-1 rounded hover:bg-[#f58028]/90 transition-colors">
                        Review Audit Findings
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {selectedMarket.strategicTags.includes('High Volume') && (
                <div className="flex items-start space-x-3 p-3 bg-[#65c18e]/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#65c18e] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">High Volume Leverage</p>
                    <p className="text-sm text-gray-600">Strong negotiating position for rate improvements</p>
                    <div className="mt-2">
                      <button className="text-sm bg-[#65c18e] text-white px-3 py-1 rounded hover:bg-[#65c18e]/90 transition-colors">
                        Escalate to Supplier Manager
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {selectedMarket.strategicTags.includes('Emerging Market') && (
                <div className="flex items-start space-x-3 p-3 bg-[#1b98d5]/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#1b98d5] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Emerging Market</p>
                    <p className="text-sm text-gray-600">Consider expanding preferred supplier network</p>
                    <div className="mt-2">
                      <button className="text-sm bg-[#1b98d5] text-white px-3 py-1 rounded hover:bg-[#1b98d5]/90 transition-colors">
                        Add to Export Plan
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {selectedMarket.strategicTags.includes('High Cost Market') && (
                <div className="flex items-start space-x-3 p-3 bg-[#232e66]/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-[#232e66] mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">High Cost Market</p>
                    <p className="text-sm text-gray-600">Above-average rates detected, sourcing review recommended</p>
                    <div className="mt-2 flex space-x-2">
                      <div className="relative group">
                        <button className="text-sm bg-[#232e66] text-white px-3 py-1 rounded hover:bg-[#232e66]/90 transition-colors">
                          Take Action
                        </button>
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                          <div className="p-1">
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                              Add to Strategy Export
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                              Escalate to Sourcing Team
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                              Mark as Reviewed
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Hotel Details View
  if (currentView === 'details' && selectedMarket) {
    const hotels = getHotelsForMarket(selectedMarket.id);

    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <Card>
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleBackToList}
              className="flex items-center space-x-2 text-[#1b98d5] hover:text-[#1b98d5]/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Markets</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedMarket.city} Preferred Hotels</h1>
              <p className="text-gray-600 mt-1">Breakdown of preferred hotel performance in {selectedMarket.city}</p>
            </div>
            <button className="px-4 py-2 bg-[#232e66] text-white rounded-lg hover:bg-[#232e66]/90 transition-colors">
              Generate RFP
            </button>
          </div>
        </Card>

        {/* Hotel Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Total Hotels"
            value={hotels.length}
            color="blue"
            icon={<Building2 className="w-6 h-6" />}
          />
          <MetricCard
            title="Flagged for Review"
            value={flaggedHotels.length}
            color="orange"
            icon={<Flag className="w-6 h-6" />}
          />
          <MetricCard
            title="Avg Rate Compliance"
            value={Math.round(hotels.reduce((sum, h) => sum + h.rateCompliance, 0) / hotels.length)}
            unit="%"
            color="green"
            icon={<CheckCircle className="w-6 h-6" />}
          />
          <MetricCard
            title="Avg Satisfaction"
            value={(hotels.reduce((sum, h) => sum + h.satisfaction, 0) / hotels.length).toFixed(1)}
            unit="/5"
            color="green"
            icon={<Star className="w-6 h-6" />}
          />
        </div>

        {/* Hotel Details Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Hotel</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Room Nights</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Spend</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">ADR</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">
                    <div className="flex items-center justify-end space-x-1">
                      <span>Negotiated Rate</span>
                      <div className="group relative">
                        <div className="w-3 h-3 bg-gray-300 rounded-full text-xs flex items-center justify-center text-white cursor-help">
                          ?
                        </div>
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Rate as defined in the active contract with this property
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">
                    <div className="flex items-center justify-end space-x-1">
                      <span>Hotel BAR Rate</span>
                      <div className="group relative">
                        <div className="w-3 h-3 bg-gray-300 rounded-full text-xs flex items-center justify-center text-white cursor-help">
                          ?
                        </div>
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Latest Best Available Rate (BAR) from FerskAudit data
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Rate Compliance</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Satisfaction</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Flag for Renegotiation</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{hotel.name}</div>
                        <div className="text-sm text-gray-500">{hotel.chain}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-900">
                      {hotel.roomNights.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {formatCurrency(hotel.spend)}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-900">
                      {formatCurrency(hotel.adr)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${
                        hotel.negotiatedRate > hotel.barRate 
                          ? 'text-red-600' 
                          : 'text-gray-900'
                      }`}>
                        {formatCurrency(hotel.negotiatedRate)}
                        {hotel.negotiatedRate > hotel.barRate && (
                          <AlertTriangle className="w-4 h-4 text-red-500 inline ml-1" />
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-900">
                      {formatCurrency(hotel.barRate)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              hotel.rateCompliance >= 85 ? 'bg-[#65c18e]' :
                              hotel.rateCompliance >= 70 ? 'bg-[#f58028]' : 'bg-red-500'
                            }`}
                            style={{ width: `${hotel.rateCompliance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{hotel.rateCompliance}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Star className="w-4 h-4 text-[#f58028]" />
                        <span className="font-medium text-gray-900">{hotel.satisfaction}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={flaggedHotels.includes(hotel.id)}
                        onChange={() => toggleFlag(hotel.id)}
                        className="w-4 h-4 text-[#1b98d5] border-gray-300 rounded focus:ring-[#1b98d5]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Flagged Hotels Summary */}
        {flaggedHotels.length > 0 && (
          <Card className="bg-[#f58028]/5 border-[#f58028]/20">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hotels Flagged for Renegotiation</h3>
                <p className="text-gray-600 mb-4">
                  {flaggedHotels.length} hotel{flaggedHotels.length > 1 ? 's' : ''} flagged for follow-up or RFP targeting
                </p>
                <div className="space-y-2">
                  {hotels.filter(h => flaggedHotels.includes(h.id)).map(hotel => (
                    <div key={hotel.id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="font-medium text-gray-900">{hotel.name}</span>
                      <span className="text-sm text-gray-600">
                        {hotel.negotiatedRate > hotel.barRate ? 'Rate above BAR' :
                         hotel.rateCompliance < 70 ? 'Low compliance' : 
                         hotel.satisfaction < 4.0 ? 'Low satisfaction' : 'Review needed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setFlaggedHotels([])}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear Flags
                </button>
                <button className="px-6 py-2 bg-[#f58028] text-white rounded-lg hover:bg-[#f58028]/90 transition-colors">
                  Create Action Plan
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  // Main Market List View
  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Markets"
          value={allMarkets.length}
          color="blue"
          icon={<MapPin className="w-6 h-6" />}
        />
        <MetricCard
          title="High Priority"
          value={allMarkets.filter(m => m.priority === 'high').length}
          color="orange"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Spend"
          value={formatCurrency(allMarkets.reduce((sum, m) => sum + m.totalSpend, 0))}
          color="green"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Room Nights"
          value={allMarkets.reduce((sum, m) => sum + m.roomNights, 0).toLocaleString()}
          color="blue"
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      {/* Enhanced Filters and Controls */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Market Analysis</h2>
              <p className="text-gray-600 mt-1">Prioritize markets based on spend, leverage, and strategic value</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Market Volume Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Show:</span>
                <div className="relative">
                  <select
                    value={marketLimit}
                    onChange={(e) => setMarketLimit(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent"
                  >
                    <option value="10">Top 10</option>
                    <option value="25">Top 25</option>
                    <option value="all">All Markets</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent"
                  >
                    <option value="spend">Total Spend</option>
                    <option value="leverage">Leverage Score</option>
                    <option value="rate">Avg Daily Rate</option>
                    <option value="nights">Room Nights</option>
                    <option value="costPerTrip">Cost per Trip</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar and Additional Filters */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search markets, regions, or countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent"
              />
            </div>

            {/* Region Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="relative">
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent"
                >
                  <option value="all">All Regions</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia Pacific">Asia Pacific</option>
                  <option value="Middle East">Middle East</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#1b98d5] focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Leverage Score Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 whitespace-nowrap">Leverage:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={leverageRange[0]}
                  onChange={(e) => setLeverageRange([parseInt(e.target.value), leverageRange[1]])}
                  className="w-16"
                />
                <span className="text-xs text-gray-500">{leverageRange[0]}-{leverageRange[1]}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={leverageRange[1]}
                  onChange={(e) => setLeverageRange([leverageRange[0], parseInt(e.target.value)])}
                  className="w-16"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-200">
            <span>
              Showing {filteredMarkets.length} of {allMarkets.length} markets
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
            {(searchTerm || filterRegion !== 'all' || filterPriority !== 'all' || leverageRange[0] > 0 || leverageRange[1] < 100) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterRegion('all');
                  setFilterPriority('all');
                  setLeverageRange([0, 100]);
                }}
                className="text-[#1b98d5] hover:text-[#1b98d5]/80 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Market List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Market</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Spend</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Room Nights</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Avg Rate</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  <div className="flex items-center justify-end space-x-1">
                    <span>Cost/Trip</span>
                    <div className="group relative">
                      <div className="w-3 h-3 bg-gray-300 rounded-full text-xs flex items-center justify-center text-white cursor-help">
                        ?
                      </div>
                      <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Includes hotel spend + related expenses per traveler
                      </div>
                    </div>
                  </div>
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Leverage Score</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Priority</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarkets.map((market) => (
                <tr key={market.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-900">{market.city}</div>
                      <div className="text-sm text-gray-500">{market.country} • {market.region}</div>
                      {market.strategicTags && market.strategicTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {market.strategicTags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900">
                    {formatCurrency(market.totalSpend)}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-900">
                    {market.roomNights.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-900">
                    {formatCurrency(market.averageRate)}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-900">
                    {formatCurrency(market.costPerTrip)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1b98d5] h-2 rounded-full"
                          style={{ width: `${market.leverageScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{market.leverageScore}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(market.priority)}`}>
                      {market.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleAnalyze(market)}
                        className="text-[#1b98d5] hover:bg-[#1b98d5]/10 px-2 py-1 rounded text-sm transition-colors"
                      >
                        Analyze
                      </button>
                      <button 
                        onClick={() => handleDetails(market)}
                        className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded text-sm transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No markets match your current filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRegion('all');
                setFilterPriority('all');
                setLeverageRange([0, 100]);
              }}
              className="mt-2 text-[#1b98d5] hover:text-[#1b98d5]/80 transition-colors"
            >
              Clear filters to see all markets
            </button>
          </div>
        )}
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Opportunities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#65c18e]/10 rounded-lg border border-[#65c18e]/20">
              <div>
                <p className="font-medium text-gray-900">New York Consolidation</p>
                <p className="text-sm text-gray-600">Potential 18% savings through supplier optimization</p>
              </div>
              <span className="text-[#65c18e] font-semibold">$225K</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1b98d5]/10 rounded-lg border border-[#1b98d5]/20">
              <div>
                <p className="font-medium text-gray-900">London Rate Negotiation</p>
                <p className="text-sm text-gray-600">High leverage for better corporate rates</p>
              </div>
              <span className="text-[#1b98d5] font-semibold">$156K</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coverage Gaps</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#f58028]/10 rounded-lg border border-[#f58028]/20">
              <div>
                <p className="font-medium text-gray-900">Frankfurt</p>
                <p className="text-sm text-gray-600">No preferred supplier, high rates</p>
              </div>
              <span className="text-[#f58028] font-semibold">High Risk</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Singapore</p>
                <p className="text-sm text-gray-600">Limited options, consider expansion</p>
              </div>
              <span className="text-gray-600 font-semibold">Medium Risk</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}