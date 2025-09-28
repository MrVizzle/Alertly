export const MOCK_USER = {
  uid: 'user123',
  displayName: 'Sarah Johnson',
  photoURL: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
  features: 'Red winter coat, brown hair, 5\'6", wearing glasses',
  emergencyContact: '+1 (555) 123-4567'
};

export const MOCK_ALERTS = [
  {
    id: 'alert1',
    userId: 'user456',
    displayName: 'Alex Rivera',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    features: 'Navy blue hoodie, glasses, 5\'10", black backpack',
    lat: 33.4484,
    lng: -112.0740,
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    active: true,
    helpersResponding: ['helper1', 'helper2'],
    lastLocationUpdate: new Date(Date.now() - 5000)
  },
  {
    id: 'alert2',
    userId: 'user789',
    displayName: 'Maria Santos',
    photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    features: 'White jacket, long dark hair, 5\'4", red scarf',
    lat: 33.4520,
    lng: -112.0680,
    timestamp: new Date(Date.now() - 420000), // 7 minutes ago
    active: true,
    helpersResponding: [],
    lastLocationUpdate: new Date(Date.now() - 8000)
  }
];