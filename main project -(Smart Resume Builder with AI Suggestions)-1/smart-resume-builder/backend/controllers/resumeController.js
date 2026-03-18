const Resume = require('../models/Resume');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Get all resumes for authenticated user
// @route   GET /api/resume
// @access  Private
const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id })
            .sort({ updatedAt: -1 })
            .populate('user', 'name email');
        
        res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes
        });
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching resumes',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get single resume by ID
// @route   GET /api/resume/:id
// @access  Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Check if user owns this resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this resume'
            });
        }

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error fetching resume:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while fetching resume',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Create new resume
// @route   POST /api/resume
// @access  Private
const createResume = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const {
            title,
            personalInfo,
            summary,
            experience,
            education,
            skills,
            projects,
            certifications,
            languages,
            template,
            isPublic
        } = req.body;

        // Create resume with user ID
        const resume = await Resume.create({
            user: req.user.id,
            title: title || 'Untitled Resume',
            personalInfo: personalInfo || {},
            summary: summary || '',
            experience: experience || [],
            education: education || [],
            skills: skills || [],
            projects: projects || [],
            certifications: certifications || [],
            languages: languages || [],
            template: template || 'modern',
            isPublic: isPublic || false
        });

        // Populate user information
        await resume.populate('user', 'name email');

        res.status(201).json({
            success: true,
            message: 'Resume created successfully',
            data: resume
        });
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating resume',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Update resume
// @route   PUT /api/resume/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        let resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Check if user owns this resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this resume'
            });
        }

        // Update fields
        const updateFields = {
            title: req.body.title,
            personalInfo: req.body.personalInfo,
            summary: req.body.summary,
            experience: req.body.experience,
            education: req.body.education,
            skills: req.body.skills,
            projects: req.body.projects,
            certifications: req.body.certifications,
            languages: req.body.languages,
            template: req.body.template,
            isPublic: req.body.isPublic,
            updatedAt: Date.now()
        };

        // Remove undefined fields
        Object.keys(updateFields).forEach(key => {
            if (updateFields[key] === undefined) {
                delete updateFields[key];
            }
        });

        resume = await Resume.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        res.status(200).json({
            success: true,
            message: 'Resume updated successfully',
            data: resume
        });
    } catch (error) {
        console.error('Error updating resume:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while updating resume',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Check if user owns this resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this resume'
            });
        }

        await Resume.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting resume:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while deleting resume',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Duplicate resume
// @route   POST /api/resume/:id/duplicate
// @access  Private
const duplicateResume = async (req, res) => {
    try {
        const originalResume = await Resume.findById(req.params.id);

        if (!originalResume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Check if user owns this resume
        if (originalResume.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to duplicate this resume'
            });
        }

        // Create duplicate
        const duplicateData = originalResume.toObject();
        delete duplicateData._id;
        delete duplicateData.createdAt;
        delete duplicateData.updatedAt;
        duplicateData.title = `${originalResume.title} - Copy`;
        duplicateData.isPublic = false; // Always make duplicates private initially

        const duplicatedResume = await Resume.create(duplicateData);
        await duplicatedResume.populate('user', 'name email');

        res.status(201).json({
            success: true,
            message: 'Resume duplicated successfully',
            data: duplicatedResume
        });
    } catch (error) {
        console.error('Error duplicating resume:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while duplicating resume',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get public resume (for sharing)
// @route   GET /api/resume/public/:id
// @access  Public
const getPublicResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id)
            .populate('user', 'name');

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        if (!resume.isPublic) {
            return res.status(403).json({
                success: false,
                message: 'This resume is not publicly accessible'
            });
        }

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error fetching public resume:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while fetching public resume',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Toggle resume visibility
// @route   PATCH /api/resume/:id/visibility
// @access  Private
const toggleResumeVisibility = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Check if user owns this resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to modify this resume'
            });
        }

        resume.isPublic = !resume.isPublic;
        resume.updatedAt = Date.now();
        await resume.save();

        res.status(200).json({
            success: true,
            message: `Resume is now ${resume.isPublic ? 'public' : 'private'}`,
            data: {
                id: resume._id,
                isPublic: resume.isPublic
            }
        });
    } catch (error) {
        console.error('Error toggling resume visibility:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while updating resume visibility',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get resume analytics/stats
// @route   GET /api/resume/:id/analytics
// @access  Private
const getResumeAnalytics = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Check if user owns this resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view analytics for this resume'
            });
        }

        // Calculate basic analytics
        const analytics = {
            totalSections: 0,
            completedSections: 0,
            completionPercentage: 0,
            wordCount: 0,
            lastUpdated: resume.updatedAt,
            isPublic: resume.isPublic,
            sections: {
                personalInfo: {
                    completed: Boolean(resume.personalInfo && resume.personalInfo.name),
                    fields: resume.personalInfo ? Object.keys(resume.personalInfo).length : 0
                },
                summary: {
                    completed: Boolean(resume.summary && resume.summary.trim()),
                    wordCount: resume.summary ? resume.summary.split(/\s+/).length : 0
                },
                experience: {
                    completed: Boolean(resume.experience && resume.experience.length > 0),
                    count: resume.experience ? resume.experience.length : 0
                },
                education: {
                    completed: Boolean(resume.education && resume.education.length > 0),
                    count: resume.education ? resume.education.length : 0
                },
                skills: {
                    completed: Boolean(resume.skills && resume.skills.length > 0),
                    count: resume.skills ? resume.skills.length : 0
                },
                projects: {
                    completed: Boolean(resume.projects && resume.projects.length > 0),
                    count: resume.projects ? resume.projects.length : 0
                },
                certifications: {
                    completed: Boolean(resume.certifications && resume.certifications.length > 0),
                    count: resume.certifications ? resume.certifications.length : 0
                },
                languages: {
                    completed: Boolean(resume.languages && resume.languages.length > 0),
                    count: resume.languages ? resume.languages.length : 0
                }
            }
        };

        // Count total and completed sections
        const sectionKeys = Object.keys(analytics.sections);
        analytics.totalSections = sectionKeys.length;
        analytics.completedSections = sectionKeys.filter(key => 
            analytics.sections[key].completed
        ).length;
        analytics.completionPercentage = Math.round(
            (analytics.completedSections / analytics.totalSections) * 100
        );

        // Calculate total word count
        analytics.wordCount = analytics.sections.summary.wordCount;
        if (resume.experience) {
            resume.experience.forEach(exp => {
                if (exp.description) {
                    analytics.wordCount += exp.description.split(/\s+/).length;
                }
            });
        }

        res.status(200).json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching resume analytics:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid resume ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while fetching resume analytics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Search resumes
// @route   GET /api/resume/search
// @access  Private
const searchResumes = async (req, res) => {
    try {
        const { q, template, sortBy = 'updatedAt', order = 'desc' } = req.query;

        // Build search query
        let query = { user: req.user.id };

        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { 'personalInfo.name': { $regex: q, $options: 'i' } },
                { summary: { $regex: q, $options: 'i' } }
            ];
        }

        if (template) {
            query.template = template;
        }

        // Build sort object
        const sortOrder = order === 'desc' ? -1 : 1;
        const sortObj = { [sortBy]: sortOrder };

        const resumes = await Resume.find(query)
            .sort(sortObj)
            .populate('user', 'name email');

        res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes
        });
    } catch (error) {
        console.error('Error searching resumes:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while searching resumes',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume,
    duplicateResume,
    getPublicResume,
    toggleResumeVisibility,
    getResumeAnalytics,
    searchResumes
};