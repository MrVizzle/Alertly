import React from 'react';
import { User, CheckCircle2, Sparkles, Award } from 'lucide-react';
import '../../styles/animations.css';

const SettingsView = ({ user, setUser }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24">
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="glass rounded-3xl p-6 mb-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 float">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile & Settings</h2>
          <p className="text-gray-600">Manage your emergency profile</p>
        </div>
      </div>
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center space-x-4">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-2xl object-cover border-3 border-white shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold">{user.displayName}</h3>
              <p className="text-purple-100 text-sm">Emergency Contact Ready</p>
              <div className="flex items-center mt-1">
                <CheckCircle2 size={14} className="mr-1" />
                <span className="text-xs">Profile Verified</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={user.displayName}
              onChange={(e) => setUser({...user, displayName: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors font-medium"
            />
          </div>
          
          {/* Identifying Features */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Identifying Features
            </label>
            <textarea
              value={user.features}
              onChange={(e) => setUser({...user, features: e.target.value})}
              placeholder="Clothing, physical description, accessories..."
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors font-medium resize-none h-24"
            />
            <p className="text-xs text-gray-500 mt-1">Help responders identify you quickly</p>
          </div>
          
          {/* Emergency Contact */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Emergency Contact
            </label>
            <input
              type="tel"
              value={user.emergencyContact}
              onChange={(e) => setUser({...user, emergencyContact: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors font-medium"
            />
          </div>
          
          {/* Update Button */}
          <button className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg">
            Update Profile
          </button>
        </div>
      </div>
      
      {/* Demo Information */}
      <div className="glass rounded-3xl p-6 mb-6">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
          <Sparkles size={20} className="mr-2 text-yellow-500" />
          Demo Information
        </h4>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded-xl p-3">
            <div className="font-medium text-gray-800">Emergency PIN</div>
            <div className="text-gray-600">Use <code className="font-mono bg-gray-100 px-2 py-1 rounded">1234</code> to cancel alerts</div>
          </div>
          <div className="bg-white rounded-xl p-3">
            <div className="font-medium text-gray-800">Helper Dashboard</div>
            <div className="text-gray-600">Switch to "Response" tab to see responder view</div>
          </div>
          <div className="bg-white rounded-xl p-3">
            <div className="font-medium text-gray-800">AI Assistant</div>
            <div className="text-gray-600">Try different emergency scenarios for AI guidance</div>
          </div>
        </div>
      </div>
      
      {/* App Info */}
      <div className="text-center text-xs text-gray-500">
        <p>Alertly v2.0 • Built for safety • FAANG-level quality</p>
        <div className="flex items-center justify-center mt-2">
          <Award size={12} className="mr-1 text-yellow-500" />
          <span>Award-winning emergency platform</span>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsView;