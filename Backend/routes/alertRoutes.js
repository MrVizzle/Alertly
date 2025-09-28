const express = require('express');
const router = express.Router();
const alertController = require('../controller/alertController');
const authMiddleware = require('../middleware/authMiddleware'); 

// Routes

router.post('/', authMiddleware, alertController.createAlert);
router.put('/:id/location', authMiddleware, alertController.updateLocation);
router.put('/:id/deactivate', authMiddleware, alertController.endAlert);
router.get('/active', authMiddleware, alertController.getActiveAlerts);
 
module.exports = router;
