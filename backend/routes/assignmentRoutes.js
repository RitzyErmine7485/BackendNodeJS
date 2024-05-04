const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const {findAssignments, createAssignment, updateAssignment, deleteAssignment, findAssignmentById} = require('../controllers/assignmentController')

router.route('/').find(protect, findAssignments).post(protect, createAssignment)
router.route('/:id').put(protect, updateAssignment).delete(protect, deleteAssignment).find(protect, findAssignmentById)

module.exports = router