import React from 'react';
import { 
  Target, 
  MapPin, 
  Building2, 
  BarChart3, 
  Shield, 
  Download,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const modules = [
  { id: 'strategy', name: 'Strategy Builder', icon: Target },
  { id: 'markets', name: 'Market Prioritization', icon: MapPin },
  { id: 'suppliers', name: 'Supplier Leverage', icon: Building2 },
  { id: 'kpis', name: 'KPI Dashboard', icon: BarChart3 },
  { id: 'compliance', name: 'Compliance Assistant', icon: Shield },
  { id: 'export', name: 'Strategy Export', icon: Download },
];

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#232e66] to-[#1b98d5] rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#232e66]">FerskStrategy</h1>
            <p className="text-xs text-gray-500">Travel Program Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-[#232e66] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#232e66]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{module.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>FerskTech Suite v1.0</p>
          <p className="mt-1">Corporate Travel Intelligence</p>
        </div>
      </div>
    </div>
  );
}