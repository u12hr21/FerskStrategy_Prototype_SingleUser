import React, { useState } from 'react';
import Card from '../Common/Card';
import MetricCard from '../Common/MetricCard';
import { Download, FileText, Database, Share2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function StrategyExport() {
  const [selectedExports, setSelectedExports] = useState<string[]>([]);

  const exportTargets = [
    {
      id: 'ferskpolicy',
      name: 'FerskPolicy',
      description: 'Custom policy builder and management',
      icon: FileText,
      status: 'ready',
      lastExport: '2024-01-10',
      dataPoints: ['Strategic goals', 'Compliance rules', 'Supplier preferences', 'Market priorities']
    },
    {
      id: 'fersksource',
      name: 'FerskSource',
      description: 'Hotel RFP automation and sourcing',
      icon: Database,
      status: 'ready',
      lastExport: '2024-01-08',
      dataPoints: ['Priority markets', 'Supplier leverage scores', 'Volume data', 'Rate targets']
    },
    {
      id: 'ferskaudit',
      name: 'FerskAudit',
      description: 'Rate compliance monitoring',
      icon: CheckCircle,
      status: 'ready',
      lastExport: '2024-01-12',
      dataPoints: ['KPI targets', 'Compliance thresholds', 'Monitoring rules', 'Alert settings']
    },
    {
      id: 'ferskplanner',
      name: 'FerskPlanner',
      description: 'Traveler feedback and planning',
      icon: Share2,
      status: 'coming_soon',
      lastExport: null,
      dataPoints: ['Satisfaction targets', 'Feedback categories', 'Market preferences', 'Service standards']
    }
  ];

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Comprehensive strategy summary for presentations',
      icon: FileText,
      recommended: true
    },
    {
      id: 'json',
      name: 'JSON Data',
      description: 'Structured data for API integration',
      icon: Database,
      recommended: false
    },
    {
      id: 'dashboard',
      name: 'Shareable Dashboard',
      description: 'Interactive view for stakeholders',
      icon: Share2,
      recommended: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-[#65c18e]" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-[#f58028]" />;
      case 'coming_soon':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-[#65c18e]/10 text-[#65c18e] border-[#65c18e]/20';
      case 'in_progress':
        return 'bg-[#f58028]/10 text-[#f58028] border-[#f58028]/20';
      case 'coming_soon':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleExportSelection = (targetId: string) => {
    setSelectedExports(prev => 
      prev.includes(targetId) 
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  const handleExport = (format: string) => {
    // Simulate export process
    console.log(`Exporting to ${format} for targets:`, selectedExports);
    alert(`Export initiated for ${format.toUpperCase()} format`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Available Exports"
          value={exportTargets.filter(t => t.status === 'ready').length}
          color="blue"
          icon={<Download className="w-6 h-6" />}
        />
        <MetricCard
          title="Last Export"
          value="2 days ago"
          color="green"
          icon={<Clock className="w-6 h-6" />}
        />
        <MetricCard
          title="Export Formats"
          value={exportFormats.length}
          color="orange"
          icon={<FileText className="w-6 h-6" />}
        />
        <MetricCard
          title="Integration Ready"
          value={exportTargets.filter(t => t.status === 'ready').length}
          color="green"
          icon={<CheckCircle className="w-6 h-6" />}
        />
      </div>

      {/* Export Targets */}
      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">FerskTech Suite Integration</h2>
          <p className="text-gray-600 mt-1">Export your strategy to other tools in the FerskTech ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exportTargets.map((target) => {
            const Icon = target.icon;
            const isSelected = selectedExports.includes(target.id);
            const isDisabled = target.status === 'coming_soon';
            
            return (
              <div
                key={target.id}
                className={`border-2 rounded-lg p-6 transition-all duration-200 cursor-pointer ${
                  isDisabled 
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                    : isSelected
                    ? 'border-[#232e66] bg-[#232e66]/5 shadow-md'
                    : 'border-gray-200 hover:border-[#1b98d5] hover:shadow-md'
                }`}
                onClick={() => !isDisabled && handleExportSelection(target.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#232e66] text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{target.name}</h3>
                      <p className="text-sm text-gray-600">{target.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(target.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(target.status)}`}>
                      {target.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Data Points Included:</p>
                    <div className="flex flex-wrap gap-1">
                      {target.dataPoints.map((point) => (
                        <span key={point} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {target.lastExport && (
                    <div className="text-sm text-gray-500">
                      Last export: {new Date(target.lastExport).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Export Formats */}
      <Card>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Export Formats</h3>
          <p className="text-gray-600 mt-1">Choose how you want to export your strategy data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exportFormats.map((format) => {
            const Icon = format.icon;
            
            return (
              <div key={format.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#1b98d5]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#1b98d5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{format.name}</h4>
                    {format.recommended && (
                      <span className="px-2 py-1 bg-[#65c18e]/10 text-[#65c18e] rounded text-xs font-medium">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{format.description}</p>
                
                <button
                  onClick={() => handleExport(format.id)}
                  disabled={selectedExports.length === 0}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedExports.length === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#232e66] text-white hover:bg-[#232e66]/90'
                  }`}
                >
                  Export as {format.name}
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Export Summary */}
      {selectedExports.length > 0 && (
        <Card className="bg-[#232e66]/5 border-[#232e66]/20">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Summary</h3>
              <p className="text-gray-600 mb-4">
                Ready to export strategy data to {selectedExports.length} selected tool{selectedExports.length > 1 ? 's' : ''}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedExports.map((targetId) => {
                  const target = exportTargets.find(t => t.id === targetId);
                  return (
                    <span key={targetId} className="px-3 py-1 bg-[#232e66] text-white rounded-full text-sm">
                      {target?.name}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedExports([])}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear Selection
              </button>
              <button
                onClick={() => handleExport('bulk')}
                className="px-6 py-2 bg-[#232e66] text-white rounded-lg hover:bg-[#232e66]/90 transition-colors"
              >
                Export All Selected
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}