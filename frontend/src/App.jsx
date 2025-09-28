import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_USER, MOCK_ALERTS } from './data/mockData';
import { useToast } from './hooks/useToast';
import HomeView from './components/views/HomeView';
import HelperDashboardView from './components/views/HelperDashboardView';
import SettingsView from './components/views/SettingsView';
import Navigation from './components/layout/Navigation';
import Toast from './components/layout/Toast';
import PINModal from './components/modals/PINModal';
import './styles/animations.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(MOCK_USER);
  const [activeAlert, setActiveAlert] = useState(null);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [showPINModal, setShowPINModal] = useState(false);
  const [pin, setPIN] = useState('');
  const [alertDuration, setAlertDuration] = useState(0);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [aiCategory, setAiCategory] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showCustomAi, setShowCustomAi] = useState(false);
  
  const { toast, showToast } = useToast();

  // Enhanced timer with location updates
  useEffect(() => {
    let interval;
    if (activeAlert) {
      interval = setInterval(() => {
        setAlertDuration(prev => prev + 1);
        // Simulate location updates
        if (Math.random() > 0.7) {
          setAlerts(prevAlerts => 
            prevAlerts.map(alert => 
              alert.userId === user.uid 
                ? { ...alert, lastLocationUpdate: new Date() }
                : alert
            )
          );
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeAlert, user.uid]);

  // Auto-select first alert when switching to helper view
  useEffect(() => {
    if (currentView === 'helper' && alerts.length > 0 && !selectedAlert) {
      setSelectedAlert(alerts[0]);
    }
  }, [currentView, alerts, selectedAlert]);

  const handleSendAlert = () => {
    const newAlert = {
      id: `alert_${Date.now()}`,
      userId: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      features: user.features,
      lat: 33.4484 + (Math.random() - 0.5) * 0.01,
      lng: -112.0740 + (Math.random() - 0.5) * 0.01,
      timestamp: new Date(),
      active: true,
      helpersResponding: [],
      lastLocationUpdate: new Date()
    };
    
    setActiveAlert(newAlert);
    setAlerts(prev => [...prev, newAlert]);
    setAlertDuration(0);
    showToast('🚨 Emergency alert broadcasted! Location sharing active.', 'success');
  };

  const handleCancelAlert = () => {
    if (pin === '1234') {
      setActiveAlert(null);
      setAlerts(prev => prev.map(alert => 
        alert.userId === user.uid ? { ...alert, active: false } : alert
      ));
      setShowPINModal(false);
      setPIN('');
      setAlertDuration(0);
      showToast('✅ Alert cancelled successfully. Location sharing stopped.', 'success');
    } else {
      showToast('❌ Incorrect PIN. Try again.', 'error');
      setPIN('');
    }
  };

  const handleMarkResponding = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, helpersResponding: [...alert.helpersResponding, `helper_${Date.now()}`] }
        : alert
    ));
    showToast('🏃‍♂️ Marked as responding! Navigate safely to location.', 'success');
  };

  const handleAiCategorySelect = (category, subcategory) => {
    setIsAiLoading(true);
    setAiCategory(subcategory);
    
    setTimeout(() => {
      setAiResponse(subcategory.response);
      setIsAiLoading(false);
      showToast('🤖 AI guidance ready!', 'success');
    }, 1500);
  };

 const handleCustomAiQuery = () => {
    if (!customPrompt.trim()) return;
    
    setIsAiLoading(true);
    setShowCustomAi(true);
    
    setTimeout(() => {
      setAiResponse(`🤖 AI CUSTOM RESPONSE:\n\nBased on your query: "${customPrompt}"\n\n1. Assess the situation safely\n2. Call 911 if immediate danger\n3. Provide first aid if trained\n4. Stay with the person\n5. Document important details\n6. Follow up with authorities\n\nRemember: Your safety comes first. Only help within your capabilities.`);
      setIsAiLoading(false);
      setCustomPrompt('');
      showToast('🤖 Custom AI response generated!', 'success');
    }, 2000);
  };

  return (
    <div className="font-sans min-h-screen">
      {/* Main Content with bottom padding for navbar */}
      <div className="pb-20">
        {currentView === 'home' && (
          <HomeView 
            activeAlert={activeAlert}
            handleSendAlert={handleSendAlert}
            setShowPINModal={setShowPINModal}
            alertDuration={alertDuration}
          />
        )}
        {currentView === 'helper' && (
          <HelperDashboardView 
            alerts={alerts}
            selectedAlert={selectedAlert}
            setSelectedAlert={setSelectedAlert}
            handleMarkResponding={handleMarkResponding}
            aiCategory={aiCategory}
            setAiCategory={setAiCategory}
            customPrompt={customPrompt}
            setCustomPrompt={setCustomPrompt}
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
            isAiLoading={isAiLoading}
            setIsAiLoading={setIsAiLoading}
            showCustomAi={showCustomAi}
            setShowCustomAi={setShowCustomAi}
            handleAiCategorySelect={handleAiCategorySelect}
            handleCustomAiQuery={handleCustomAiQuery}
          />
        )}
        {currentView === 'settings' && (
          <SettingsView 
            user={user}
            setUser={setUser}
          />
        )}
      </div>
      
      {/* Modals */}
      <PINModal 
        showPINModal={showPINModal}
        pin={pin}
        setPIN={setPIN}
        handleCancelAlert={handleCancelAlert}
        setShowPINModal={setShowPINModal}
      />
      
      {/* Toast Notifications */}
      <Toast toast={toast} />
      
      {/* Navigation */}
      <Navigation 
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeAlertsCount={alerts.filter(a => a.active).length}
      />
    </div>
  );
}

export default App;