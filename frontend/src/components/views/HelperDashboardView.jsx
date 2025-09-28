import React from 'react';
import { 
  MapPin, Phone, Navigation, Clock, AlertCircle, CheckCircle2, X, 
  User, Award, Brain, MessageSquare, Send, Loader2 
} from 'lucide-react';
import { AI_CATEGORIES } from '../../data/aiCategories';
import '../../styles/animations.css';

const HelperDashboardView = ({ 
  alerts, 
  selectedAlert, 
  setSelectedAlert, 
  handleMarkResponding,
  aiCategory,
  setAiCategory,
  customPrompt,
  setCustomPrompt,
  aiResponse,
  setAiResponse,
  isAiLoading,
  setIsAiLoading,
  showCustomAi,
  setShowCustomAi,
  handleAiCategorySelect,
  handleCustomAiQuery
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="flex h-screen">
      {/* Enhanced Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center glass rounded-3xl p-8">
            <MapPin size={64} className="text-blue-600 mx-auto mb-4 float" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Live Emergency Map</h3>
            <p className="text-gray-600 mb-1">Mapbox Integration Active</p>
            <p className="text-sm text-gray-500">Phoenix Metropolitan Area</p>
            <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-medium">
              🟢 Real-time tracking enabled
            </div>
          </div>
        </div>
        
        {/* Enhanced Alert Pins */}
        {alerts.filter(alert => alert.active).map((alert, index) => (
          <div
            key={alert.id}
            className="absolute cursor-pointer transform hover:scale-110 transition-transform"
            style={{
              top: `${25 + index * 20}%`,
              left: `${30 + index * 25}%`,
            }}
            onClick={() => setSelectedAlert(alert)}
            title={`Emergency: ${alert.displayName}`}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl pulse-ring">
                <AlertCircle size={20} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {alert.displayName}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Details Panel */}
      <div className="w-96 bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <Award size={24} className="mr-2" />
            Emergency Hub
          </h2>
          <p className="text-blue-100 mt-1">{alerts.filter(a => a.active).length} active alerts</p>
        </div>
        
        {/* Alerts List - Always Visible */}
        <div className="flex-1 overflow-y-auto">
          {alerts.filter(alert => alert.active).map(alert => (
            <div 
              key={alert.id}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                selectedAlert?.id === alert.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={alert.photoURL}
                    alt={alert.displayName}
                    className="w-14 h-14 rounded-2xl object-cover shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white pulse-ring"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg">{alert.displayName}</h3>
                  <p className="text-sm text-gray-600 mb-1">{alert.features}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock size={12} className="mr-1" />
                    {Math.floor((Date.now() - alert.timestamp) / 60000)}m ago
                    <span className="mx-2">•</span>
                    <MapPin size={12} className="mr-1 text-green-600" />
                    Updated {Math.floor((Date.now() - alert.lastLocationUpdate) / 1000)}s ago
                  </div>
                  {alert.helpersResponding.length > 0 && (
                    <div className="flex items-center">
                      <User size={12} className="text-blue-600 mr-1" />
                      <span className="text-xs text-blue-600 font-medium">
                        {alert.helpersResponding.length} helpers responding
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Action Buttons - Always Visible */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('tel:911', '_blank');
                  }}
                  className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium flex items-center justify-center transition-colors"
                >
                  <Phone size={12} className="mr-1" />
                  911
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkResponding(alert.id);
                  }}
                  className="py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium flex items-center justify-center transition-colors"
                >
                  <CheckCircle2 size={12} className="mr-1" />
                  Respond
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${alert.lat},${alert.lng}`, '_blank');
                  }}
                  className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium flex items-center justify-center transition-colors"
                >
                  <Navigation size={12} className="mr-1" />
                  Go
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* AI Assistance Panel - Only when selected alert needs AI help */}
        {selectedAlert && (
          <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
            <div className="p-4">
              <button
                onClick={() => setShowCustomAi(!showCustomAi)}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
              >
                <Brain size={16} className="mr-2" />
                AI Emergency Assistant
              </button>
            </div>
            
            {showCustomAi && (
              <div className="px-4 pb-4">
                {/* AI Categories */}
                {!aiCategory && (
                  <div className="space-y-3 mb-4">
                    {Object.entries(AI_CATEGORIES).map(([key, category]) => (
                      <div key={key} className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className={`p-3 bg-gradient-to-r ${
                          category.color === 'red' ? 'from-red-500 to-red-600' :
                          category.color === 'orange' ? 'from-orange-500 to-orange-600' :
                          'from-blue-500 to-blue-600'
                        } text-white`}>
                          <h4 className="font-semibold flex items-center text-sm">
                            <category.icon size={14} className="mr-2" />
                            {category.title}
                          </h4>
                        </div>
                        <div className="p-2 space-y-1">
                          {category.subcategories.map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => handleAiCategorySelect(category, sub)}
                              className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium text-gray-700"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Custom AI Query */}
                    <div className="border-2 border-dashed border-purple-300 rounded-xl p-3 bg-purple-50">
                      <h4 className="font-semibold text-purple-900 mb-2 flex items-center text-sm">
                        <MessageSquare size={14} className="mr-2" />
                        Custom Query
                      </h4>
                      <div className="space-y-2">
                        <textarea
                          value={customPrompt}
                          onChange={(e) => setCustomPrompt(e.target.value)}
                          placeholder="Describe the emergency..."
                          className="w-full p-2 border border-purple-200 rounded-lg text-xs resize-none h-16 focus:border-purple-400 focus:outline-none"
                        />
                        <button
                          onClick={handleCustomAiQuery}
                          disabled={!customPrompt.trim() || isAiLoading}
                          className="w-full py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs"
                        >
                          {isAiLoading ? (
                            <Loader2 size={14} className="animate-spin mr-1" />
                          ) : (
                            <Send size={14} className="mr-1" />
                          )}
                          Get AI Guidance
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* AI Response Display */}
                {(aiCategory || (showCustomAi && aiResponse)) && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 flex items-center text-sm">
                        <Brain size={16} className="mr-2 text-purple-600" />
                        {aiCategory ? aiCategory.name : 'Custom Response'}
                      </h3>
                      <button
                        onClick={() => {
                          setAiCategory(null);
                          setAiResponse('');
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    {isAiLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <Loader2 size={24} className="animate-spin text-purple-600 mx-auto mb-2" />
                          <p className="text-xs text-gray-600">AI analyzing...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                        <pre className="whitespace-pre-wrap text-xs text-gray-800 font-medium leading-relaxed">
                          {aiResponse}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default HelperDashboardView;