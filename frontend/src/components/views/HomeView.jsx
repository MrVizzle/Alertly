import React from 'react';
import { Shield, AlertCircle, Star, Clock, CheckCircle2 } from 'lucide-react';
import { formatDuration } from '../../utils/helpers';
import '../../styles/animations.css';

const HomeView = ({ activeAlert, handleSendAlert, setShowPINModal, alertDuration }) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden pb-24">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-20 float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-20 float" style={{animationDelay: '1s'}}></div>
    </div>
    
    {!activeAlert ? (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mr-3">
              <Shield size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Alertly
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-medium">Emergency response in seconds</p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <Star size={16} className="text-yellow-400 mr-1" />
            <span>Award-winning safety platform</span>
          </div>
        </div>
        
        {/* Simple Alert Button */}
        <div className="relative mb-12">
          <button
            onClick={handleSendAlert}
            className="w-64 h-64 bg-red-600 hover:bg-red-700 text-white rounded-full flex flex-col items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
            aria-label="Send emergency alert"
          >
            <AlertCircle size={48} className="mb-2" />
            <span className="text-xl font-bold">SEND ALERT</span>
            <span className="text-sm opacity-90 mt-1">Tap for emergency</span>
          </button>
        </div>
        
        {/* Privacy notice */}
        <div className="glass rounded-2xl p-6 max-w-sm text-center">
          <div className="flex items-center justify-center mb-3">
            <Shield size={20} className="text-green-600 mr-2" />
            <span className="font-semibold text-gray-800">Privacy Protected</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your location is shared only during active alerts. Auto-stops after 30 minutes.
          </p>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">2.3s</div>
            <div className="text-xs text-gray-500">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">99.9%</div>
            <div className="text-xs text-gray-500">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">24/7</div>
            <div className="text-xs text-gray-500">Available</div>
          </div>
        </div>
      </div>
    ) : (
      // Simple Alert Active State 
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-red-600 rounded-full pulse-ring"></div>
            <div className="absolute inset-2 bg-red-600 rounded-full pulse-ring" style={{animationDelay: '0.5s'}}></div>
            <CheckCircle2 size={48} className="text-white relative z-10" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alert Sent</h2>
        <p className="text-gray-600 mb-1">Help is on the way</p>
        
        <div className="flex items-center text-lg font-mono text-red-600 mb-8">
          <Clock size={20} className="mr-2" />
          {formatDuration(alertDuration)}
        </div>
        
        <button
          onClick={() => setShowPINModal(true)}
          className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium mb-4 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          CANCEL ALERT
        </button>
        
        <p className="text-sm text-gray-500">
          Stop sharing in 30 min automatically
        </p>
      </div>
    )}
  </div>
);

export default HomeView;