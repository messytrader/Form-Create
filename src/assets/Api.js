
const mockQuestions = {
    Technology: [
      { id: 1, question: 'What is your favorite programming language?' },
      { id: 2, question: 'How many years of experience do you have in programming?' },
    ],
    Health: [
      { id: 1, question: 'How often do you exercise?' },
      { id: 2, question: 'What is your diet preference?' },
    ],
    Education: [
      { id: 1, question: 'What is your highest qualification?' },
      { id: 2, question: 'What field did you study?' },
    ],
  };
  
  // Mock API function to fetch additional questions
  export const fetchAdditionalQuestions = async (surveyTopic) => {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Return mock data based on the selected survey topic
    return mockQuestions[surveyTopic] || [];
  };
  