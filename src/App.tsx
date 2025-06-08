import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import StrategyBuilder from './components/Modules/StrategyBuilder';
import MarketPrioritization from './components/Modules/MarketPrioritization';
import SupplierLeverage from './components/Modules/SupplierLeverage';
import KPIDashboard from './components/Modules/KPIDashboard';
import ComplianceAssistant from './components/Modules/ComplianceAssistant';
import StrategyExport from './components/Modules/StrategyExport';

function App() {
  const [activeModule, setActiveModule] = useState('strategy');

  const getModuleTitle = (module: string) => {
    switch (module) {
      case 'strategy':
        return 'Strategy Builder';
      case 'markets':
        return 'Market Prioritization';
      case 'suppliers':
        return 'Supplier Leverage';
      case 'kpis':
        return 'KPI Dashboard';
      case 'compliance':
        return 'Compliance Assistant';
      case 'export':
        return 'Strategy Export';
      default:
        return 'FerskStrategy';
    }
  };

  const getModuleSubtitle = (module: string) => {
    switch (module) {
      case 'strategy':
        return 'Define goals and build your travel program strategy';
      case 'markets':
        return 'Analyze and prioritize high-value travel markets';
      case 'suppliers':
        return 'Assess negotiating leverage with hotel suppliers';
      case 'kpis':
        return 'Monitor performance against strategic targets';
      case 'compliance':
        return 'Track policy adherence and manage exceptions';
      case 'export':
        return 'Export strategy to FerskTech execution tools';
      default:
        return 'Travel Program Intelligence Platform';
    }
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'strategy':
        return <StrategyBuilder />;
      case 'markets':
        return <MarketPrioritization />;
      case 'suppliers':
        return <SupplierLeverage />;
      case 'kpis':
        return <KPIDashboard />;
      case 'compliance':
        return <ComplianceAssistant />;
      case 'export':
        return <StrategyExport />;
      default:
        return <StrategyBuilder />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getModuleTitle(activeModule)} 
          subtitle={getModuleSubtitle(activeModule)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}

export default App;