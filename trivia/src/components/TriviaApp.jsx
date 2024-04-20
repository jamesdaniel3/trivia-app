import React, { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import '../styles/TriviaApp.css'; // Assuming you have a CSS file for styles

const TriviaApp = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch("https://the-trivia-api.com/v2/questions");
            const data = await response.json();
            setQuestions(data);
        };
        fetchQuestions();
    }, []);

    const handleAnswerSelection = (index, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [index]: answer
        });
    };

    const progress = Object.keys(selectedAnswers).length / questions.length * 100;

    return (
        <>
            <div className={"progress"}>
                <LinearProgress variant="determinate" value={progress} />
            </div>
            <h1 className="header">Trivia App</h1>
            <form className="trivia-form">
                {questions && questions.map((question, index) => (
                    <div key={question.id} className="question-container">
                        <fieldset>
                            <legend>{`${index + 1}. ${question.question.text}`}</legend>
                            {[question.correctAnswer, ...question.incorrectAnswers].sort().map((answer, answerIndex) => (
                                <div key={answerIndex} className="answer-option">
                                    <label style={{
                                        color: selectedAnswers[index] === answer ? (answer === question.correctAnswer ? 'green' : 'red') : 'inherit'
                                    }}>
                                        <input
                                            type="radio"
                                            name={`question_${index}`}
                                            value={answer}
                                            onChange={() => handleAnswerSelection(index, answer)}
                                        />
                                        {answer}
                                    </label>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                ))}
            </form>
        </>
    );
};

export default TriviaApp;