const express = require('express');
const router = express.Router();
const Employee = require('../Models/employee'); // Adjust the path if necessary

// CRUD for Employee

// Create a new employee
router.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        designation: req.body.designation,
        gender: req.body.gender,
        courses: req.body.courses, // Capture courses
        image: req.body.image
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update employee
router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            Object.assign(employee, req.body);
            const updatedEmployee = await employee.save();
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete employee
// Delete employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            console.log('Employee not found');
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        console.error('Error deleting employee:', error); // Detailed error logging
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
