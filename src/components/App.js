import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [page, setPage] = useState('List');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (newQuestion) => {
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        setPage('List');
      } else {
        console.error('Failed to add question');
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedQuestions = questions.filter((question) => question.id !== questionId);
        setQuestions(updatedQuestions);
      } else {
        console.error('Failed to delete question');
      }
    } catch (error) {
      console.error('Error sending DELETE request:', error);
    }
  };

  const handleUpdateCorrectIndex = async (questionId, newCorrectIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correctIndex: newCorrectIndex,
        }),
      });

      if (response.ok) {
          const updatedQuestions = questions.map((question) =>
          question.id === questionId ? { ...question, correctIndex: newCorrectIndex } : question
        );
        setQuestions(updatedQuestions);
      } else {
        console.error('Failed to update correct index');
      }
    } catch (error) {
      console.error('Error sending PATCH request:', error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === 'Form' ? (
        <QuestionForm onSubmit={handleFormSubmit} />
      ) : (
        <QuestionList questions={questions} onUpdateCorrectIndex={handleUpdateCorrectIndex} />
      )}
    </main>
  );
}

export default App;
