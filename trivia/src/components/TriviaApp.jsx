import React, { useEffect, useState } from "react";

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
            <h1 className={"header"}>Trivia App</h1>
            <form>
                {questions && questions.map((question, index) => (
                    <div key={question.id}>
                        <fieldset>
                            <legend>{`${index + 1}. ${question.question.text}`}</legend>
                            {[question.correctAnswer, ...question.incorrectAnswers].sort().map((answer, answerIndex) => (
                                <label key={answerIndex}>
                                    <input
                                        type="radio"
                                        name={`question_${index}`}
                                        value={answer}
                                    />
                                    {answer}
                                </label>
                            ))}
                        </fieldset>
                    </div>
                ))}
            </form>
        </>
    );
};

export default TriviaApp;