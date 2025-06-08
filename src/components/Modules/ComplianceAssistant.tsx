import React, { useState } from 'react';
import Card from '../Common/Card';
import MetricCard from '../Common/MetricCard';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileText, Users } from 'lucide-react';

export default function ComplianceAssistant() {
  const [activeTab, setActiveTab] = useState('overview');

  const complianceMetrics = [
    {
      id: '1',
      rule: 'Preferred Supplier Usage',
      description: 'Bookings must use preferred suppliers when available',
      compliance: 68,
      violations: 156,
      severity: 'medium',
      trend: 'improving'
    },
    {
      id: '2',
      rule: 'Advance Booking Policy',
      description: 'Hotel bookings must be made 7+ days in advance',
      compliance: 82,
      violations: 89,
      severity: 'low',
      trend: 'stable'
    },
    {
      id: '3',
      rule: 'Rate Approval Threshold',
      description: 'Rates above $300/night require approval',
      compliance: 45,
      violations: 234,
      severity: 'high',
      trend: 'declining'
    },
    {
      id: '4',
      rule: 'Expense Justification',
      description: 'High-cost bookings require business justification',
      compliance: 91,
      violations: 23,
      severity: 'low',
      trend: 'improving'
    }
  ];

  const recentViolations = [
    {
      id: '1',
      traveler: 'John Smith',
      rule: 'Rate Approval Threshold',
      booking: 'Ritz Carlton NYC - $450/night',
      date: '2024-01-15',
      status: 'pending_review',
      amount: 1350
    },
    {
      id: '2',
      traveler: 'Sarah Johnson',
      rule: 'Preferred Supplier Usage',
      booking: 'Independent Hotel - $280/night',
      date: '2024-01-14',
      status: 'approved_exception',
      amount: 840
    },
    {
      id: '3',
      traveler: 'Mike Chen',
      rule: 'Advance Booking Policy',
      booking: 'Marriott SF - Same day booking',
      date: '2024-01-13',
      status: 'violation_confirmed',
      amount: 320
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-[#f58028]/10 text-[#f58028] border-[#f58028]/20';
      case 'low':
        return 'bg-[#65c18e]/10 text-[#65c18e] border-[#65c18e]/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved_exception':
        return 'bg-[#65c18e]/10 text-[#65c18e] border-[#65c18e]/20';
      case 'pending_review':
        return 'bg-[#f58028]/10 text-[#f58028] border-[#f58028]/20';
      case 'violation_confirmed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return 'text-[#65c18e]';
    if (compliance >= 60) return 'text-[#f58028]';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Overall Compliance"
          value={Math.round(complianceMetrics.reduce((sum, m) => sum + m.compliance, 0) / complianceMetrics.length)}
          unit="%"
          color="blue"
          icon={<Shield className="w-6 h-6" />}
        />
        <MetricCard
          title="Active Violations"
          value={complianceMetrics.reduce((sum, m) => sum + m.violations, 0)}
          color="orange"
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <MetricCard
          title="High Severity"
          value={complianceMetrics.filter(m => m.severity === 'high').length}
          color="red"
          icon={<XCircle className="w-6 h-6" />}
        />
        <MetricCard
          title="Pending Reviews"
          value={recentViolations.filter(v => v.status === 'pending_review').length}
          color="orange"
          icon={<FileText className="w-6 h-6" />}
        />
      </div>

      {/* Tab Navigation */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Policy Overview', icon: Shield },
              { id: 'violations', name: 'Recent Violations', icon: AlertTriangle },
              { id: 'trends', name: 'Compliance Trends', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#232e66] text-[#232e66]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </Card>

      {/* Policy Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Policy Compliance Status</h3>
            <div className="space-y-4">
              {complianceMetrics.map((metric) => (
                <div key={metric.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{metric.rule}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(metric.severity)}`}>
                          {metric.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{metric.description}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getComplianceColor(metric.compliance)}`}>
                        {metric.compliance}%
                      </p>
                      <p className="text-sm text-gray-500">Compliance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            metric.compliance >= 80 ? 'bg-[#65c18e]' :
                            metric.compliance >= 60 ? 'bg-[#f58028]' : 'bg-red-500'
                          }`}
                          style={{ width: `${metric.compliance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900 font-medium">{metric.violations} violations</p>
                      <p className="text-xs text-gray-500">Last 30 days</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Recent Violations Tab */}
      {activeTab === 'violations' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Policy Violations</h3>
                <p className="text-gray-600 mt-1">Review and manage compliance exceptions</p>
              </div>
              <button className="px-4 py-2 bg-[#232e66] text-white rounded-lg hover:bg-[#232e66]/90 transition-colors">
                Export Report
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Traveler</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Violation</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Booking Details</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentViolations.map((violation) => (
                    <tr key={violation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#1b98d5] rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{violation.traveler}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{violation.rule}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-gray-900">{violation.booking}</p>
                          <p className="text-sm text-gray-500">{new Date(violation.date).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">
                        ${violation.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(violation.status)}`}>
                          {violation.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="text-[#1b98d5] hover:bg-[#1b98d5]/10 px-2 py-1 rounded text-sm transition-colors">
                            Review
                          </button>
                          <button className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded text-sm transition-colors">
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Compliance Trends Tab */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Improving Policies</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#65c18e]/10 rounded-lg border border-[#65c18e]/20">
                  <div>
                    <p className="font-medium text-gray-900">Expense Justification</p>
                    <p className="text-sm text-gray-600">91% compliance (+5% this month)</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-[#65c18e]" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#65c18e]/10 rounded-lg border border-[#65c18e]/20">
                  <div>
                    <p className="font-medium text-gray-900">Preferred Supplier Usage</p>
                    <p className="text-sm text-gray-600">68% compliance (+3% this month)</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-[#65c18e]" />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Concern</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">Rate Approval Threshold</p>
                    <p className="text-sm text-gray-600">45% compliance (-8% this month)</p>
                  </div>
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f58028]/10 rounded-lg border border-[#f58028]/20">
                  <div>
                    <p className="font-medium text-gray-900">Advance Booking Policy</p>
                    <p className="text-sm text-gray-600">82% compliance (no change)</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-[#f58028]" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}