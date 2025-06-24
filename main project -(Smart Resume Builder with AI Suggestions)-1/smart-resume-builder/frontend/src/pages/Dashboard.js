import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import AISuggestions from '../components/AISuggestions';
import { resumeAPI } from '../utils/api';
import { 
  PlusIcon, 
  DocumentTextIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  DocumentDuplicateIcon,
  DownloadIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'form', 'preview'

  // Default resume structure
  const defaultResume = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await resumeAPI.getResumes();
      setResumes(response.data);
    } catch (err) {
      setError('Failed to fetch resumes');
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentResume({ ...defaultResume, title: 'New Resume' });
    setIsCreating(true);
    setIsEditing(true);
    setView('form');
  };

  const handleEditResume = async (resumeId) => {
    try {
      const response = await resumeAPI.getResume(resumeId);
      setCurrentResume(response.data);
      setIsEditing(true);
      setView('form');
    } catch (err) {
      setError('Failed to load resume');
    }
  };

  const handleViewResume = async (resumeId) => {
    try {
      const response = await resumeAPI.getResume(resumeId);
      setCurrentResume(response.data);
      setIsEditing(false);
      setView('preview');
    } catch (err) {
      setError('Failed to load resume');
    }
  };

  const handleSaveResume = async (resumeData) => {
    try {
      if (isCreating) {
        const response = await resumeAPI.createResume(resumeData);
        setResumes(prev => [response.data, ...prev]);
        setIsCreating(false);
      } else {
        const response = await resumeAPI.updateResume(currentResume._id, resumeData);
        setResumes(prev => prev.map(r => r._id === currentResume._id ? response.data : r));
      }
      setCurrentResume(null);
      setIsEditing(false);
      setView('list');
    } catch (err) {
      setError('Failed to save resume');
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeAPI.deleteResume(resumeId);
        setResumes(prev => prev.filter(r => r._id !== resumeId));
      } catch (err) {
        setError('Failed to delete resume');
      }
    }
  };

  const handleDuplicateResume = async (resumeId) => {
    try {
      const response = await resumeAPI.duplicateResume(resumeId);
      setResumes(prev => [response.data, ...prev]);
    } catch (err) {
      setError('Failed to duplicate resume');
    }
  };

  const handleBackToList = () => {
    setCurrentResume(null);
    setIsCreating(false);
    setIsEditing(false);
    setView('list');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                {view === 'list' && 'Manage your resumes and create new ones'}
                {view === 'form' && (isCreating ? 'Create a new resume' : 'Edit your resume')}
                {view === 'preview' && 'Preview your resume'}
              </p>
            </div>
            
            {view === 'list' && (
              <button
                onClick={handleCreateNew}
                className="btn-primary flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                New Resume
              </button>
            )}
            
            {(view === 'form' || view === 'preview') && (
              <button
                onClick={handleBackToList}
                className="btn-secondary flex items-center"
              >
                ← Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mx-4 mt-4 rounded-lg">
          {error}
          <button 
            onClick={() => setError(null)}
            className="float-right text-red-800 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {view === 'list' && (
          <div>
            {resumes.length === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new resume.
                </p>
                <div className="mt-6">
                  <button onClick={handleCreateNew} className="btn-primary">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Resume
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <div key={resume._id} className="card hover:shadow-lg transition-shadow duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {resume.title || 'Untitled Resume'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewResume(resume._id)}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditResume(resume._id)}
                        className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDuplicateResume(resume._id)}
                        className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume._id)}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'form' && currentResume && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <ResumeForm
                resume={currentResume}
                onSave={handleSaveResume}
                isEditing={isEditing}
              />
            </div>
            <div className="sticky top-4">
              <ResumePreview resume={currentResume} />
              <AISuggestions resume={currentResume} />
            </div>
          </div>
        )}

        {view === 'preview' && currentResume && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center space-x-4 no-print">
              <button
                onClick={() => setView('form')}
                className="btn-secondary flex items-center"
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Resume
              </button>
              <button
                onClick={() => window.print()}
                className="btn-primary flex items-center"
              >
                <DownloadIcon className="h-5 w-5 mr-2" />
                Download PDF
              </button>
            </div>
            <ResumePreview resume={currentResume} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;