const Alert = require('../model/alertModels');

// Socket.io reference (set in server.js when io is initialized)
let io;
const setSocketIo = (socketIoInstance) => {
  io = socketIoInstance;
};

// ============================
// 📌 Create Alert
// ============================
const createAlert = async (req, res) => {
  try {
    const { description, location } = req.body;

    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({ error: 'Location (lat, lng) is required' });
    }

    const userId = req.user && (req.user._id || req.user.id || req.user.userId);

    const alert = new Alert({
      userId: userId, // comes from auth middleware
      description: description || '',
      location,
      isActive: true
    });

    await alert.save();

    // Emit socket event for new alert
    if (io) {
      io.emit('alert:new', {
        alertId: alert._id,
        userId: alert.userId,
        description: alert.description,
        location: alert.location,
        createdAt: alert.createdAt
      });
    }

    res.status(201).json(alert);
  } catch (error) {
    console.error('❌ Error creating alert:', error.message);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

// ============================
// 📌 Update Location
// ============================
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const alert = await Alert.findById(id);
    if (!alert || !alert.isActive) {
      return res.status(404).json({ error: 'Active alert not found' });
    }

    alert.location = { lat, lng };
    await alert.save();

    // Emit socket event for location update
    if (io) {
      io.emit('alert:update', {
        alertId: alert._id,
        location: alert.location,
        updatedAt: alert.updatedAt
      });
    }

    res.status(200).json(alert);
  } catch (error) {
    console.error('❌ Error updating location:', error.message);
    res.status(500).json({ error: 'Failed to update location' });
  }
};

// ============================
// 📌 End Alert
// ============================
const endAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await Alert.findById(id);
    if (!alert || !alert.isActive) {
      return res.status(404).json({ error: 'Active alert not found' });
    }

    alert.isActive = false;
    await alert.save();

    // Emit socket event for alert ending
    if (io) {
      io.emit('alert:end', {
        alertId: alert._id,
        endedAt: alert.updatedAt
      });
    }

    res.status(200).json({ message: 'Alert ended successfully' });
  } catch (error) {
    console.error('❌ Error ending alert:', error.message);
    res.status(500).json({ error: 'Failed to end alert' });
  }
};

// ============================
// 📌 Get Active Alerts
// ============================
const getActiveAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ isActive: true }).populate('userId', 'firstName lastName profilePicture');
    res.status(200).json(alerts);
  } catch (error) {
    console.error('❌ Error fetching active alerts:', error.message);
    res.status(500).json({ error: 'Failed to fetch active alerts' });
  }
};

module.exports = {
  setSocketIo,
  createAlert,
  updateLocation,
  endAlert,
  getActiveAlerts
};

