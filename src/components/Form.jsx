import React,{useState} from 'react'
import { Link } from 'react-router-dom';

const Form = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        isAttendingWithGuest: 'No',
        guestName: '',
      });
    
      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false); 
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            console.log('Submitted:', values);

          setSubmitted(true);
        }
      };
    
      const validate = (values) => {
        let errors = {};
        if (!values.name.trim()) {
          errors.name = 'Name is required';
        }
    
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = 'Email is invalid';
        }
    
        if (!values.age) {
          errors.age = 'Age is required';
        } else if (isNaN(values.age) || values.age <= 0) {
          errors.age = 'Age must be a number greater than 0';
        }
    
        if (values.isAttendingWithGuest === 'Yes' && !values.guestName.trim()) {
          errors.guestName = 'Guest Name is required';
        }
    
        return errors;
      };
      if (submitted) {
        return (
          <div className="max-w-md mx-auto mt-8 p-6 bg-gray-200  rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Summarize Data</h2>
            <div className="space-y-4">
              <div><strong>Name:</strong> {values.name}</div>
              <div><strong>Email:</strong> {values.email}</div>
              <div><strong>Age:</strong> {values.age}</div>
              <div><strong>Attending with a guest:</strong> {values.isAttendingWithGuest}</div>
              {values.isAttendingWithGuest === 'Yes' && (
                <div><strong>Guest Name:</strong> {values.guestName}</div>
              )}
              <button
                onClick={() => setSubmitted(false)}
                className="w-1/2 bg-black hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
              >
                Go Back
              </button>
            </div>
          </div>
        );
      }
  return (
    <>
    <div className='bg-gradient-to-r from-pink-700 to bg-purple-800 w-full h-screen flex flex-col justify-center items-center gap-20 '>
        <div className='h-auto w-1/2 flex flex-col justify-center'>
    <h2 className="text-3xl text-white font-semibold mb-4 text-center">Event Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${errors.name && 'border-red-500'} rounded`}
          />
          {errors.name && <p className="text-white text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${errors.email && 'border-red-500'} rounded`}
          />
          {errors.email && <p className="text-white text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border ${errors.age && 'border-red-500'} rounded`}
          />
          {errors.age && <p className="text-white text-xs mt-1">{errors.age}</p>}
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Are you attending with a guest?</label>
          <select
            name="isAttendingWithGuest"
            value={values.isAttendingWithGuest}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {values.isAttendingWithGuest === 'Yes' && (
          <div>
            <label className="block mb-1 font-medium">Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={values.guestName}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${errors.guestName && 'border-red-500'} rounded`}
            />
            {errors.guestName && <p className="text-white text-xs mt-1">{errors.guestName}</p>}
          </div>
        )}

        <button type="submit" className=" w-1/2 md:w-1/4 bg-black hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full ">
          Register
        </button>
      </form>
      </div>
      <div className='flex justify-center space-x-3 w-full'>
       
        <Link to="/Task2" className='w-1/2 md:w-1/4 bg-black hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full'>Go to Task 2</Link>
        <Link to="/Task3" className='w-1/2 md:w-1/4 bg-black hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full'>Go to Task 3</Link>
      </div>
    </div>


    </>
  )
}

export default Form