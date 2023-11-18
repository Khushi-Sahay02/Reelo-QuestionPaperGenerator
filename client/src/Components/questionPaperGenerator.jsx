
import React, { useState } from 'react';
import Question from './Question/question';
import './styles.css';

const QuestionPaperGenerator = () => {
  const [totalMarks, setTotalMarks] = useState('');
  const [error, setError] = useState();
  const [easyPercentage, setEasyPercentage] = useState('');
  const [mediumPercentage, setMediumPercentage] = useState('');
  const [hardPercentage, setHardPercentage] = useState('');
  const [questionPaper, setQuestionPaper] = useState(null);

  const generateQuestionPaper = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-question-paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalMarks,
          easyPercentage,
          mediumPercentage,
          hardPercentage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(typeof errorData.error);
        setError(errorData.error || 'Failed to fetch data from the server.');
        return;
      }

      const data = await response.json();
      setQuestionPaper(data);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className='form-css'>
      <h1>Question Paper Generator</h1>
      <div>
        <label>Total Marks:</label>
        <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} />
      </div>
      <div>
        <label>Difficulty Percentage - Easy:</label>
        <input type="number" value={easyPercentage} onChange={(e) => setEasyPercentage(e.target.value)} />
      </div>
      <div>
        <label>Difficulty Percentage - Medium:</label>
        <input type="number" value={mediumPercentage} onChange={(e) => setMediumPercentage(e.target.value)} />
      </div>
      <div>
        <label>Difficulty Percentage - Hard:</label>
        <input type="number" value={hardPercentage} onChange={(e) => setHardPercentage(e.target.value)} />
      </div>
      <div className='button-css'>
      <button onClick={generateQuestionPaper}>Generate Question Paper</button>
      </div>
      {error && (
        <div>
        <p className='error-message'>{error}</p>
      </div>
      )}
      {questionPaper && (
        <div>
          <h1 style={{margin:'20px'}}>Question Paper:</h1>
          <ul>
            {questionPaper.map(({question,subject,topic,difficulty,marks}) => (
              <Question 
              question={question}
              subject={subject}
              topic={topic}
              difficulty={difficulty}
              marks={marks}/>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionPaperGenerator;
