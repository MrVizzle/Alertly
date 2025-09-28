import React from 'react';
import { Shield, MapPin, Settings } from 'lucide-react';

const Navigation = ({ currentView, setCurrentView, activeAlertsCount }) => (
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
    <div className="flex justify-around items-center max-w-md mx-auto">
      <button
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
          currentView === 'home' 
            ? 'bg-red-500 text-white shadow-md' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Emergency Home"
      >
        <Shield size={24} />
        <span className="text-xs font-medium mt-1">Emergency</span>
      </button>
      
      <button
        onClick={() => setCurrentView('helper')}
        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 relative ${
          currentView === 'helper' 
            ? 'bg-blue-500 text-white shadow-md' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Helper Dashboard"
      >
        <MapPin size={24} />
        <span className="text-xs font-medium mt-1">Response</span>
        {activeAlertsCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            {activeAlertsCount}
          </div>
        )}
      </button>
      
      <button
        onClick={() => setCurrentView('settings')}
        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
          currentView === 'settings' 
            ? 'bg-purple-500 text-white shadow-md' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Profile Settings"
      >
        <Settings size={24} />
        <span className="text-xs font-medium mt-1">Profile</span>
      </button>
    </div>
  </div>
);

export default Navigation;