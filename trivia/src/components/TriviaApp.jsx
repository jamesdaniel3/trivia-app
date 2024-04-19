import React, { useEffect, useState } from "react";
import '../styles/TriviaApp.css'; // Assuming you have a CSS file for styles

const TriviaApp = () => {
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch("https://the-trivia-api.com/v2/questions");
            const data = await response.json();
            setQuestions(data);
        };
        fetchQuestions();
    }, []);

    return (
        <>
            <h1 className="header">Trivia App</h1>
            <form className="trivia-form">
                {questions && questions.map((question, index) => (
                    <div key={question.id} className="question-container">
                        <fieldset>
                            <legend>{`${index + 1}. ${question.question.text}`}</legend>
                            {[question.correctAnswer, ...question.incorrectAnswers].sort().map((answer, answerIndex) => (
                                <div key={answerIndex} className="answer-option">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question_${index}`}
                                            value={answer}
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