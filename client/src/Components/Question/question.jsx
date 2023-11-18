import React from 'react'
import './question.styles.css'
const Question = ({question,subject,topic,difficulty,marks}) => {
    return (
        <div className="question-container">
          <h3 className="question">Question : {question}</h3>
          <div className="question-details">
            <p>
              <strong>Subject:</strong> {subject}
            </p>
            <p>
              <strong>Topic:</strong> {topic}
            </p>
            <p>
              <strong>Difficulty:</strong> {difficulty}
            </p>
            <p>
              <strong>Marks:</strong> {marks}
            </p>
          </div>
        </div>
      )
}

export default Question;