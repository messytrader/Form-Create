import React,{useState} from 'react'

const Task2 = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: {
          JavaScript: false,
          CSS: false,
          Python: false,
        },
        interviewTime: '',
      });
    
      const [errors, setErrors] = useState({});
      const [position, setPosition] = useState('');
      const [submitted, setSubmitted] = useState(false); // Track form submission status
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === 'checkbox') {
          setFormData({
            ...formData,
            additionalSkills: {
              ...formData.additionalSkills,
              [name]: checked,
            },
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };
    
      const handlePositionChange = (e) => {
        const { value } = e.target;
        setPosition(value);
        setFormData({ ...formData, position: value });
    
        if (value !== 'Developer' && value !== 'Designer') {
          setFormData({ ...formData, relevantExperience: '' });
        }
        if (value !== 'Designer') {
          setFormData({ ...formData, portfolioUrl: '' });
        }
        if (value !== 'Manager') {
          setFormData({ ...formData, managementExperience: '' });
        }
      };
    
      const validate = () => {
        let validationErrors = {};
        if (!formData.fullName) validationErrors.fullName = 'Full Name is required';
        if (!formData.email) validationErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Email is invalid';
    
        if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone Number is required';
        else if (!/^\d+$/.test(formData.phoneNumber)) validationErrors.phoneNumber = 'Phone Number is invalid';
    
        if (position === 'Developer' || position === 'Designer') {
          if (!formData.relevantExperience) validationErrors.relevantExperience = 'Relevant Experience is required';
          else if (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)
            validationErrors.relevantExperience = 'Relevant Experience must be a positive number';
        }
    
        if (position === 'Designer') {
          if (!formData.portfolioUrl) validationErrors.portfolioUrl = 'Portfolio URL is required';
          else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioUrl))
            validationErrors.portfolioUrl = 'Portfolio URL is invalid';
        }
    
        if (position === 'Manager' && !formData.managementExperience)
          validationErrors.managementExperience = 'Management Experience is required';
    
        if (!Object.values(formData.additionalSkills).some(skill => skill))
          validationErrors.additionalSkills = 'At least one additional skill must be selected';
    
        if (!formData.interviewTime) validationErrors.interviewTime = 'Preferred Interview Time is required';
    
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          setSubmitted(true); // Set form submission status to true
        }
      };
    
      const handleReset = () => {
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          position: '',
          relevantExperience: '',
          portfolioUrl: '',
          managementExperience: '',
          additionalSkills: {
            JavaScript: false,
            CSS: false,
            Python: false,
          },
          interviewTime: '',
        });
        setErrors({});
        setPosition('');
        setSubmitted(false);
      };
      if(submitted){
        return(   
            <div className="max-w-md mx-auto mt-8 p-6 bg-gray-200  rounded-lg shadow-xl space-y-4">
            <h3 className="text-lg font-semibold">Summary of Your Application:</h3>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Applying for Position:</strong> {formData.position}</p>
            {position === 'Developer' || position === 'Designer' ? (
              <p><strong>Relevant Experience:</strong> {formData.relevantExperience} years</p>
            ) : null}
            {position === 'Designer' ? (
              <p><strong>Portfolio URL:</strong> <a href={formData.portfolioUrl} target="_blank" rel="noopener noreferrer">{formData.portfolioUrl}</a></p>
            ) : null}
            {position === 'Manager' ? (
              <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
            ) : null}
            <p><strong>Additional Skills:</strong> {Object.entries(formData.additionalSkills)
                .filter(([key, value]) => value)
                .map(([key]) => key)
                .join(', ')}</p>
            <p><strong>Preferred Interview Time:</strong> {formData.interviewTime}</p>
    
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Go Back
            </button>
          </div>)
     
      }
    
  return (
  <>
  <div className='bg-gradient-to-r from-pink-700 to bg-purple-800 w-full h-full p-3 flex justify-center'>
  <div className='h-full w-1/2 flex flex-col justify-center'>
  <h2 className="text-3xl  text-white text-center font-semibold mb-4">Job Application Form</h2>
    
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : ''} rounded`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : ''} rounded`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : ''} rounded`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Applying for Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handlePositionChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {position === 'Developer' || position === 'Designer' ? (
            <div>
              <label className="block mb-1 font-medium">Relevant Experience (in years)</label>
              <input
                type="number"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.relevantExperience ? 'border-red-500' : ''} rounded`}
              />
              {errors.relevantExperience && <p className="text-white text-xs mt-1">{errors.relevantExperience}</p>}
            </div>
          ) : null}

          {position === 'Designer' ? (
            <div>
              <label className="block mb-1 font-medium">Portfolio URL</label>
              <input
                type="text"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.portfolioUrl ? 'border-red-500' : ''} rounded`}
              />
              {errors.portfolioUrl && <p className="text-white text-xs mt-1">{errors.portfolioUrl}</p>}
            </div>
          ) : null}

          {position === 'Manager' ? (
            <div>
              <label className="block mb-1 font-medium">Management Experience</label>
              <textarea
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.managementExperience ? 'border-red-500' : ''} rounded`}
              />
              {errors.managementExperience && <p className="text-white text-xs mt-1">{errors.managementExperience}</p>}
            </div>
          ) : null}

          <div>
            <label className="block mb-1 font-medium">Additional Skills</label>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="JavaScript"
                  checked={formData.additionalSkills.JavaScript}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">JavaScript</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="CSS"
                  checked={formData.additionalSkills.CSS}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">CSS</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="Python"
                  checked={formData.additionalSkills.Python}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Python</span>
              </label>
            </div>
            {errors.additionalSkills && <p className="text-white text-xs mt-1">{errors.additionalSkills}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Preferred Interview Time</label>
            <input
              type="datetime-local"
              name="interviewTime"
              value={formData.interviewTime}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.interviewTime ? 'border-red-500' : ''} rounded`}
            />
            {errors.interviewTime && <p className="text-white text-xs mt-1">{errors.interviewTime}</p>}
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
    </div></>
  )
}

export default Task2