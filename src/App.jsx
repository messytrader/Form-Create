
import Form from './components/Form'
import Task2 from './components/Task2'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Task3 from './components/Task3';

function App() {

  return (
   <>
     <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/task3" element={<Task3 />} />
      </Routes>
    </Router>
   </>
  )
}

export default App
