import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  SparklesIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      icon: <DocumentTextIcon className="h-8 w-8 text-blue-600" />,
      title: "Professional Templates",
      description: "Choose from a variety of ATS-friendly resume templates designed by industry experts."
    },
    {
      icon: <SparklesIcon className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent recommendations for content, skills, and formatting to make your resume stand out."
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-blue-600" />,
      title: "Industry-Specific",
      description: "Tailored suggestions based on your industry and job role for maximum impact."
    },
    {
      icon: <ChartBarIcon className="h-8 w-8 text-blue-600" />,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview feature as you build your resume."
    }
  ];

  const benefits = [
    "ATS-friendly templates that pass applicant tracking systems",
    "AI-powered content suggestions and improvements",
    "Multiple export formats (PDF, DOC, TXT)",
    "Real-time collaboration and sharing",
    "Industry-specific templates and examples",
    "Professional formatting and design"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
            Build Your Perfect Resume with AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 fade-in">
            Create professional, ATS-friendly resumes in minutes with our intelligent resume builder. 
            Get hired faster with AI-powered suggestions and industry-specific templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              Get Started Free
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced features help you create resumes that get noticed by both ATS systems and hiring managers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Everything You Need to Land Your Dream Job
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive resume builder includes all the tools and features you need to create 
                a professional resume that stands out from the competition.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link 
                  to="/register" 
                  className="btn-primary inline-flex items-center"
                >
                  Start Building Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="lg:pl-12">
              <div className="bg-white rounded-lg shadow-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="border-b-2 border-blue-600 pb-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">John Doe</h3>
                  <p className="text-gray-600">Senior Software Engineer</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Experience</h4>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Tech Corp - Senior Engineer</p>
                      <p>2020 - Present</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Node.js</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Python</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers who have successfully landed their dream jobs.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
          >
            Get Started for Free
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;