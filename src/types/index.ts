export interface TravelData {
  id: string;
  city: string;
  country: string;
  region: string;
  totalSpend: number;
  roomNights: number;
  averageRate: number;
  bookingLeadTime: number;
  cancellationRate: number;
  supplierCaptureRatio: number;
  travelerSatisfaction: number;
  negotiatedRateUtilization: number;
}

export interface Supplier {
  id: string;
  name: string;
  type: 'hotel_chain' | 'boutique' | 'extended_stay';
  totalSpend: number;
  roomNights: number;
  captureRatio: number;
  leverageScore: number;
  markets: string[];
  contractStatus: 'active' | 'expiring' | 'negotiating';
}

export interface KPI {
  id: string;
  name: string;
  category: 'cost' | 'behavior' | 'satisfaction' | 'compliance';
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  priority: 'high' | 'medium' | 'low';
}

export interface StrategyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'completed';
  kpis: string[];
}

export interface ExportData {
  strategyGoals: StrategyGoal[];
  priorityMarkets: TravelData[];
  supplierRecommendations: Supplier[];
  kpiTargets: KPI[];
  complianceNotes: string[];
}