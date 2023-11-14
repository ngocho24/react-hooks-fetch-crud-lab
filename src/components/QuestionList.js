import React from 'react';

const QuestionList = ({ questions, onUpdateCorrectIndex }) => {
  const handleDropdownChange = (questionId, event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    onUpdateCorrectIndex(questionId, newCorrectIndex);
  };

  return (
    <div>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.text}
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => handleDropdownChange(question.id, e)}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
