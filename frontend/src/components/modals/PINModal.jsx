import React from 'react';
import { Shield } from 'lucide-react';

const PINModal = ({ showPINModal, pin, setPIN, handleCancelAlert, setShowPINModal }) => {
  if (!showPINModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl transform transition-all duration-300 scale-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Security Verification</h3>
          <p className="text-gray-600">Enter your 4-digit PIN to cancel the alert</p>
        </div>
        
        <input
          type="password"
          value={pin}
          onChange={(e) => setPIN(e.target.value)}
          placeholder="• • • •"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-center text-3xl tracking-[0.5em] mb-6 focus:border-red-500 focus:outline-none transition-colors"
          maxLength={4}
          autoFocus
        />
        
        <div className="flex space-x-3">
          <button
            onClick={() => {setShowPINModal(false); setPIN('');}}
            className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-semibold transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleCancelAlert}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl font-semibold transition-all duration-200 disabled:opacity-50"
            disabled={pin.length !== 4}
          >
            Confirm
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700 text-center">
            <strong>Demo PIN:</strong> <code className="font-mono bg-white px-2 py-1 rounded">1234</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PINModal;