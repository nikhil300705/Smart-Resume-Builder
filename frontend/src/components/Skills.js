import React, { useState } from 'react';
import { Plus, X, Code, Users, Zap, Star } from 'lucide-react';

const Skills = ({ skills, setSkills }) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('intermediate');

  // Initialize skills if not provided
  const currentSkills = skills || { technical: [], soft: [] };

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      const updatedSkills = {
        ...currentSkills,
        technical: [...(currentSkills.technical || []), {
          name: newTechnicalSkill.trim(),
          level: skillLevel
        }]
      };
      setSkills(updatedSkills);
      setNewTechnicalSkill('');
      setSkillLevel('intermediate');
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      const updatedSkills = {
        ...currentSkills,
        soft: [...(currentSkills.soft || []), newSoftSkill.trim()]
      };
      setSkills(updatedSkills);
      setNewSoftSkill('');
    }
  };

  const removeTechnicalSkill = (index) => {
    const updatedSkills = {
      ...currentSkills,
      technical: currentSkills.technical.filter((_, i) => i !== index)
    };
    setSkills(updatedSkills);
  };

  const removeSoftSkill = (index) => {
    const updatedSkills = {
      ...currentSkills,
      soft: currentSkills.soft.filter((_, i) => i !== index)
    };
    setSkills(updatedSkills);
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'technical') {
        addTechnicalSkill();
      } else {
        addSoftSkill();
      }
    }
  };

  const renderSkillLevel = (level) => {
    const levels = {
      beginner: { color: 'text-yellow-600', stars: 1 },
      intermediate: { color: 'text-blue-600', stars: 2 },
      advanced: { color: 'text-green-600', stars: 3 },
      expert: { color: 'text-purple-600', stars: 4 }
    };

    const levelInfo = levels[level] || levels.intermediate;
    
    return (
      <div className={`flex items-center ${levelInfo.color}`}>
        {[...Array(4)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < levelInfo.stars ? 'fill-current' : ''}
          />
        ))}
      </div>
    );
  };

  const commonTechnicalSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS',
    'SQL', 'Git', 'Docker', 'AWS', 'MongoDB', 'TypeScript',
    'Java', 'C++', 'Angular', 'Vue.js', 'PHP', 'MySQL'
  ];

  const commonSoftSkills = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
    'Time Management', 'Adaptability', 'Creative Thinking',
    'Project Management', 'Analytical Thinking', 'Attention to Detail'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Zap size={16} />
          <span>Showcase your expertise</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Code className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Technical Skills</h3>
          </div>

          {/* Add Technical Skill */}
          <div className="space-y-3 mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTechnicalSkill}
                onChange={(e) => setNewTechnicalSkill(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'technical')}
                placeholder="Enter a technical skill"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <button
                onClick={addTechnicalSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Technical Skills List */}
          <div className="space-y-2 mb-4">
            {currentSkills.technical && currentSkills.technical.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-blue-800">
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                  {typeof skill === 'object' && skill.level && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600 capitalize">{skill.level}</span>
                      {renderSkillLevel(skill.level)}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeTechnicalSkill(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Common Technical Skills */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {commonTechnicalSkills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setNewTechnicalSkill(skill);
                    setTimeout(() => addTechnicalSkill(), 100);
                  }}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-green-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Soft Skills</h3>
          </div>

          {/* Add Soft Skill */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'soft')}
              placeholder="Enter a soft skill"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={addSoftSkill}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Soft Skills List */}
          <div className="space-y-2 mb-4">
            {currentSkills.soft && currentSkills.soft.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2"
              >
                <span className="font-medium text-green-800">{skill}</span>
                <button
                  onClick={() => removeSoftSkill(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Common Soft Skills */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {commonSoftSkills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setNewSoftSkill(skill);
                    setTimeout(() => addSoftSkill(), 100);
                  }}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Summary */}
      {(currentSkills.technical?.length > 0 || currentSkills.soft?.length > 0) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Skills Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Technical Skills: {currentSkills.technical?.length || 0}
              </p>
              <div className="flex flex-wrap gap-1">
                {currentSkills.technical?.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
                {currentSkills.technical?.length > 5 && (
                  <span className="text-xs text-gray-500">
                    +{currentSkills.technical.length - 5} more
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Soft Skills: {currentSkills.soft?.length || 0}
              </p>
              <div className="flex flex-wrap gap-1">
                {currentSkills.soft?.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {currentSkills.soft?.length > 5 && (
                  <span className="text-xs text-gray-500">
                    +{currentSkills.soft.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!currentSkills.technical || currentSkills.technical.length === 0) &&
       (!currentSkills.soft || currentSkills.soft.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Zap size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No skills added yet</p>
          <p className="text-gray-400">Add your technical and soft skills to showcase your expertise</p>
        </div>
      )}
    </div>
  );
};

export default Skills;