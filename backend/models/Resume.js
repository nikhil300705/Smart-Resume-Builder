const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  personalInfo: {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    portfolio: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    }
  },
  summary: {
    type: String,
    trim: true,
    maxlength: [1000, 'Summary cannot be more than 1000 characters']
  },
  experience: [{
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    }
  }],
  education: [{
    institution: {
      type: String,
      required: true,
      trim: true
    },
    degree: {
      type: String,
      required: true,
      trim: true
    },
    field: {
      type: String,
      trim: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String
    },
    gpa: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    }
  }],
  skills: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    },
    category: {
      type: String,
      enum: ['Technical', 'Soft', 'Language', 'Other'],
      default: 'Technical'
    }
  }],
  projects: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    technologies: [String],
    link: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    },
    startDate: String,
    endDate: String
  }],
  certifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    issuer: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true
    },
    link: {
      type: String,
      trim: true
    }
  }],
  template: {
    type: String,
    enum: ['modern', 'classic', 'creative', 'minimal'],
    default: 'modern'
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
resumeSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);