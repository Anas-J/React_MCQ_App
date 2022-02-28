import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const questions = [
		{
			questionText: 'What is the capital of India?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'New Delhi', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is the prime manister of India?',
			answerOptions: [
				{ answerText: 'Amit Shah', isCorrect: false },
				{ answerText: 'Narendra Modi', isCorrect: true },
				{ answerText: 'Charles Putin', isCorrect: false },
				{ answerText: 'Ambani', isCorrect: false },
			],
		},
		{
			questionText: 'What is 5 * 4?',
			answerOptions: [
				{ answerText: '20', isCorrect: true },
				{ answerText: '36', isCorrect: false },
				{ answerText: '45', isCorrect: false },
				{ answerText: '54', isCorrect: false },
			],
		},
		{
			questionText: 'What is 2*3 ?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: true },
				{ answerText: '7', isCorrect: false },
			],
    },
    {
			questionText: 'What is 5 + 4 ?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '9', isCorrect: true },
				{ answerText: '7', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(0);
  const [timer, setTimer] = useState(30);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
      setScore(score + 1);
      setIsCorrect(1);
		} else {
      setIsCorrect(2);
    }

    setTimeout(() => {
      setIsCorrect(0);
      setTimer(30);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 2000)
  };
  useEffect(() => {
    if (!showScore) {
      let time;
      clearTimeout(time);
      time = setTimeout(() => {
        setIsCorrect(0);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setTimer(30);
        } else {
          setShowScore(true);
        }
      }, 30000)
    }
  }, [currentQuestion])

  useEffect(() => {
    if (!showScore) {
      const time =setInterval(() => {
        setTimer(timer - 1);
      }, 1000)
      return () => clearInterval(time);
    }
  }, [timer]);

	return (
		<div className = {isCorrect === 0 ? "app": `${isCorrect === 1 ? "app correct" : "app incorrect"}`}>
			{showScore ? (
				<div className='score'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
            <div className="time">Time Left: {timer} secs</div>
					</div>
					<div className='answer'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className={isCorrect === true ? "correct": ""} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
