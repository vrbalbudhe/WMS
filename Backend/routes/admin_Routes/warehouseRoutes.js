// Path: Backend/routes/admin_Routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../../controllers/admin/admin_crud_controllers/warehouseController');
const fieldController = require('../../controllers/admin/admin_crud_controllers/fieldController');

// Simple test route
router.get('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

// Field routes
router.post('/fields', fieldController.createField);
router.get('/fields', fieldController.getAllFields);
router.put('/fields/:id', fieldController.updateField);
router.delete('/fields/:id', fieldController.deleteField);

// Warehouse routes
router.post('/', warehouseController.createWarehouse);
router.get('/', warehouseController.getAllWarehouses);
router.get('/:id', warehouseController.getWarehouseById);
router.put('/:id', warehouseController.updateWarehouse);
router.delete('/:id', warehouseController.deleteWarehouse);

module.exports = router;