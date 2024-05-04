// Imports
const asyncHandler = require('express-async-handler')
const Assignment = require('../models/assignmentModel')

// Find all assignments
const findAssignments = asyncHandler(async (req, res) => {
    try {
        let assignments
        
        // Check if user is admin
        if (req.user.isAdmin) {
            assignments = await Assignment.find()
        } else {
            assignments = await Assignment.find({ subject: { $in: req.user.subjects } })
        }
        
        res.status(200).json(assignments)
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Server Error' })
    }
})

// Create assignment
const createAssignment = asyncHandler(async (req, res) => {
    const { subject, description, score } = req.body

    // Check if the user is an admin
    if (!req.user.isAdmin) {
        res.status(403).json({ error: 'Forbidden: Only admins can create assignments' })
        return
    }

    // Check if required data is provided
    if (!subject || !description || !score) {
        res.status(400).json({ error: 'Bad Request: Incomplete data' })
        return
    }

    try {
        // Check if an assignment with the same subject already exists for the user
        const existingAssignment = await Assignment.findOne({
            description,
            user: req.user.id
        })

        if (existingAssignment) {
            res.status(400).json({ error: 'Assignment with the same subject already exists' })
            return
        }

        // Create the assignment
        const assignment = await Assignment.create({
            subject,
            description,
            score,
            user: req.user.id
        })

        res.status(201).json(assignment)
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Server Error' })
    }
})

// Find assignment by Id
const findAssignmentById = asyncHandler(async (req, res) => {
    try {
        let assignment

        // Check if user is admin
        if (req.user.isAdmin) {
            assignment = await Assignment.findById(req.params.id)
        } else {
            assignment = await Assignment.findOne({ _id: req.params.id, subject: { $in: req.user.subjects } })
        }

        if (!assignment) {
            res.status(404).json({ error: 'Assignment not found' })
            return
        }

        res.status(200).json({ assignment })
    } catch (error) {
        res.status(500).json({ error: 'Server Error' })
    }
})

// Update assignment
const updateAssignment = asyncHandler(async (req, res) => {
    try {
        // Find assignment and update
        const update = await Assignment.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )

        // Check if user is admin
        if (!req.user.isAdmin) {
            res.status(403).json({ error: 'Forbidden: Only admins can create assignments' })
            return
        }

        if (!update) {
            // If update is null, assignment not found
            res.status(404).json({ error: 'Assignment not found' })
            return
        }

        // Success: Return the updated assignment
        res.status(200).json(update)
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Server Error' })
    }
})

// Delete assignment
const deleteAssignment = asyncHandler(async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id)

        // Check if user is admin
        if (!req.user.isAdmin) {
            res.status(403).json({ error: 'Forbidden: Only admins can create assignments' })
            return
        }

        
        if (!assignment) {
            res.status(404).json({ error: 'Assignment not found' })
            return
        }

        await Assignment.deleteOne({ _id: req.params.id }) // Delete by ID

        res.status(200).json({ id: req.params.id })
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Server Error' })
    }
})

// Exports
module.exports = {
    findAssignments,
    createAssignment,
    findAssignmentById,
    updateAssignment,
    deleteAssignment
}