
import React, { useState} from 'react';
import { fetchAdditionalQuestions } from '../assets/Api'

const Task3 = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteLanguage: '',
        experienceYears: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: '',
      });
    
      const [errors, setErrors] = useState({});
      const [additionalQuestions, setAdditionalQuestions] = useState([]);
      const [submitted, setSubmitted] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [apiError, setApiError] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const validateForm = () => {
        let validationErrors = {};
    
        if (!formData.fullName.trim()) validationErrors.fullName = 'Full Name is required !';
        if (!formData.email.trim()) validationErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) validationErrors.email = 'Email is invalid !';
    
        if (!formData.surveyTopic) validationErrors.surveyTopic = 'Survey Topic is required';
    
        if (formData.surveyTopic === 'Technology') {
          if (!formData.favoriteLanguage) validationErrors.favoriteLanguage = 'Favorite Programming Language is required !';
          if (!formData.experienceYears) validationErrors.experienceYears = 'Years of Experience is required !';
          else if (isNaN(formData.experienceYears) || formData.experienceYears <= 0)
            validationErrors.experienceYears = 'Years of Experience must be a positive number !';
        }
    
        if (formData.surveyTopic === 'Health') {
          if (!formData.exerciseFrequency) validationErrors.exerciseFrequency = 'Exercise Frequency is required !';
          if (!formData.dietPreference) validationErrors.dietPreference = 'Diet Preference is required !';
        }
    
        if (formData.surveyTopic === 'Education') {
          if (!formData.highestQualification) validationErrors.highestQualification = 'Highest Qualification is required !';
          if (!formData.fieldOfStudy) validationErrors.fieldOfStudy = 'Field of Study is required !';
        }
    
        if (!formData.feedback.trim()) validationErrors.feedback = 'Feedback is required and must be at least 50 characters !';
        else if (formData.feedback.trim().length < 50)
          validationErrors.feedback = 'Feedback must be at least 50 characters long !';
    
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
      };
    
      const fetchAdditionalQuestionsFromApi = async () => {
        try {
          setIsLoading(true);
          const questions = await fetchAdditionalQuestions(formData.surveyTopic);
          setAdditionalQuestions(questions);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching additional questions:', error);
          setApiError('Failed to fetch additional questions. Please try again.');
          setIsLoading(false);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log('Form Data:', formData);
          await fetchAdditionalQuestionsFromApi();
    
          setSubmitted(true);
        }
      };
    
      if (submitted) {
        return (
          <div className="max-w-md mx-auto mt-8 p-6 bg-gray-200 rounded-lg shadow-xl space-y-4">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
    
            {additionalQuestions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Additional Questions:</h3>
                <ul>
                  {additionalQuestions.map((question) => (
                    <li key={question.id}>{question.question}</li>
                  ))}
                </ul>
              </div>
            )}
    
           <div className='mt-10'><a href="/" className='px-4 py-2 bg-black text-white rounded-full  hover:bg-blue-600 focus:outline-none w-48 md:w-1/3 text-center '> Go Back</a></div> 
          </div>
        );
      }
    
  return (
   <>
   <div className='bg-gradient-to-r from-pink-700 to bg-purple-800 w-full h-full p-3 flex justify-center'>
        <div className='h-auto w-1/2 flex flex-col justify-center'>
          <h2 className="text-3xl font-semibold mb-4 text-white text-center">Survey Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-black ">
            <div>
              <label className="block mb-1 font-medium text-lg  ">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : ''} rounded`}
              />
              {errors.fullName && <p className="text-white text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-lg  ">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : ''} rounded`}
              />
              {errors.email && <p className="text-white text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium  text-lg ">Survey Topic</label>
              <select
                name="surveyTopic"
                value={formData.surveyTopic}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border ${errors.surveyTopic ? 'border-red-500' : ''} rounded`}
              >
                <option value="">Select Survey Topic</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
              {errors.surveyTopic && <p className="text-white text-xs mt-1">{errors.surveyTopic}</p>}
            </div>

            {formData.surveyTopic === 'Technology' && (
              <div>
                <label className="block mb-1 font-medium text-lg ">Favorite Programming Language</label>
                <select
                  name="favoriteLanguage"
                  value={formData.favoriteLanguage}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.favoriteLanguage ? 'border-red-500' : ''} rounded`}
                >
                  <option value="">Select Language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteLanguage && <p className="text-white text-xs mt-1">{errors.favoriteLanguage}</p>}

                <label className="block mt-4 mb-1 font-medium text-lg ">Years of Experience</label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.experienceYears ? 'border-red-500' : ''} rounded`}
                />
                {errors.experienceYears && <p className="text-white text-xs mt-1">{errors.experienceYears}</p>}
              </div>
            )}

            {formData.surveyTopic === 'Health' && (
              <div>
                <label className="block mb-1 font-medium text-lg ">Exercise Frequency</label>
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.exerciseFrequency ? 'border-red-500' : ''} rounded`}
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && <p className="text-white text-xs mt-1">{errors.exerciseFrequency}</p>}

                <label className="block mt-4 mb-1 font-medium text-lg ">Diet Preference</label>
                <select
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.dietPreference ? 'border-red-500' : ''} rounded`}
                >
                  <option value="">Select Preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && <p className="text-white text-xs mt-1">{errors.dietPreference}</p>}
              </div>
            )}

            {formData.surveyTopic === 'Education' && (
              <div>
                <label className="block mb-1 font-medium text-lg ">Highest Qualification</label>
                <select
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.highestQualification ? 'border-red-500' : ''} rounded`}
                >
                  <option value="">Select Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && <p className="text-white text-xs mt-1">{errors.highestQualification}</p>}

                <label className="block mt-4 mb-1 font-medium text-lg ">Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.fieldOfStudy ? 'border-red-500' : ''} rounded`}
                />
                {errors.fieldOfStudy && <p className="text-white text-xs mt-1">{errors.fieldOfStudy}</p>}
              </div>
            )}

            <div>
              <label className="block mt-4 mb-1 font-medium text-lg ">Feedback</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border ${errors.feedback ? 'border-red-500' : ''} rounded`}
              />
              {errors.feedback && <p className="text-white text-xs mt-1">{errors.feedback}</p>}
            </div>

            <div className="mt-6 flex justify-center gap-16">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-blue-600 focus:outline-none w-48 md:w-1/3"
              >
                Submit
              </button>
              <a href="/" className='px-4 py-2 bg-black text-white rounded-full hover:bg-blue-600 focus:outline-none w-48 md:w-1/3 text-center '> Home</a>
            </div>
          </form>
        </div>
      </div>
   </>
  )
}

export default Task3