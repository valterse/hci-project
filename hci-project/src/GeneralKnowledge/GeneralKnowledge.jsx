import React, { useState, useEffect } from "react";
import "./GeneralKnowledge.css";
import questions from "./GeneralKnowledgeQuestions";
import Modal from "./ExplanationModal";

function GeneralKnowledge({ onBack, userData, updateUserData }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [elo, setElo] = useState(userData?.elo || 1200); // Use General Knowledge Elo
    const [streak, setStreak] = useState(userData?.streak || 0);
    const [correctAnswers, setCorrectAnswers] = useState(userData?.correctAnswers || 0);
    const [totalQuestions, setTotalQuestions] = useState(userData?.totalQuestions || 0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [shuffledIndices, setShuffledIndices] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState({
        Geography: false,
        Technology: false,
        Biology: false,
        History: false,
    });
    const [incorrectQueue, setIncorrectQueue] = useState([]);
    const [questionsSinceLastIncorrect, setQuestionsSinceLastIncorrect] = useState(0);

    const K = 32;

    useEffect(() => {
        if (userData) {
            setElo(userData.elo);
            setStreak(userData.streak);
            setCorrectAnswers(userData.correctAnswers);
            setTotalQuestions(userData.totalQuestions);
        }
    }, [userData]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleTopicToggle = (topic) => {
        setSelectedTopics((prev) => ({
            ...prev,
            [topic]: !prev[topic],
        }));
    };

    const startQuiz = () => {
        const activeTopics = Object.keys(selectedTopics).filter((topic) => selectedTopics[topic]);
        if (activeTopics.length === 0) {
            alert("Please select at least one topic.");
            return;
        }

        const filteredByElo = questions.filter((q) => Math.abs(q.difficulty - elo) <= 150);
        const filteredByTopics = filteredByElo.filter((q) => activeTopics.includes(q.topic));

        if (filteredByTopics.length === 0) {
            alert("No questions available within your Elo range and selected topics.");
            return;
        }

        const shuffled = shuffleArray([...Array(filteredByTopics.length).keys()]);
        setFilteredQuestions(filteredByTopics);
        setShuffledIndices(shuffled);
        setQuizStarted(true);
        setStartTime(Date.now());
    };

    const handleOptionClick = (option) => {
        if (showAnswer) return;

        setSelectedOption(option);
        setShowAnswer(true);

        const correct = option === filteredQuestions[shuffledIndices[currentQuestionIndex]].answer;
        const endTime = Date.now();
        const responseTime = (endTime - startTime) / 1000;

        // Calculate updated values
        const newTotalQuestions = totalQuestions + 1;
        const newCorrectAnswers = correct ? correctAnswers + 1 : correctAnswers;
        const newStreak = correct ? streak + 1 : 0;
        const newElo = updateElo(correct ? 1 : 0, newStreak, newCorrectAnswers, newTotalQuestions, responseTime);

        // Update state
        setTimeTaken(responseTime);
        setTotalQuestions(newTotalQuestions);
        setCorrectAnswers(newCorrectAnswers);
        setStreak(newStreak);
        setElo(newElo);

        // Prepare data to update in Firestore
        const newData = {
            elo: newElo, // Update General Knowledge Elo
            streak: newStreak,
            correctAnswers: newCorrectAnswers,
            totalQuestions: newTotalQuestions,
        };

        // Update user data in Firestore
        updateUserData(newData);

        // If the answer is incorrect, add the question to the incorrect queue
        if (!correct) {
            setIncorrectQueue((prev) => [...prev, shuffledIndices[currentQuestionIndex]]);
        }

        // Increment the counter for questions since the last incorrect question
        setQuestionsSinceLastIncorrect((prev) => prev + 1);
    };

    const updateElo = (score, streak, correctAnswers, totalQuestions, timeTaken) => {
        const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
        const D_t = filteredQuestions[shuffledIndices[currentQuestionIndex]].difficulty;
        const S_t = streak * 10;
        const A_t = accuracy * 100;
        const T_t = Math.max(0, 20 - timeTaken);

        const expectedScore = 1 / (1 + Math.pow(10, (D_t - (elo + S_t + A_t - T_t)) / 400));
        const newElo = elo + K * (score - expectedScore);
        return Math.round(newElo); // Return the updated Elo
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setShowAnswer(false);
        setShowExplanationModal(false);

        // Check if it's time to re-ask an incorrect question
        if (questionsSinceLastIncorrect >= 5 && incorrectQueue.length > 0) {
            // Re-ask the first question in the incorrect queue
            const nextQuestionIndex = incorrectQueue[0];
            setCurrentQuestionIndex(nextQuestionIndex);
            setIncorrectQueue((prev) => prev.slice(1)); // Remove the re-asked question from the queue
            setQuestionsSinceLastIncorrect(0); // Reset the counter
        } else if (currentQuestionIndex < shuffledIndices.length - 1) {
            // Move to the next question
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            // Quiz completed
            alert(`Quiz Completed! Your final Elo rating: ${elo}`);
            setCurrentQuestionIndex(0);
            const shuffled = shuffleArray([...Array(filteredQuestions.length).keys()]);
            setShuffledIndices(shuffled);
        }

        setStartTime(Date.now()); // Reset the timer for the next question
    };

    const handleExplanationClick = () => {
        setShowExplanationModal(true);
    };

    if (!quizStarted) {
        return (
            <div className="general-window">
                <button className="back-button" onClick={onBack}>←</button>
                <h2 className="lora-font-title">General Knowledge Quiz</h2>
                <p className="elo-rating">Elo Rating: {elo}</p>

                <div className="topic-selection">
                    <h3>Select Topics:</h3>
                    <div className="topic-buttons">
                        {Object.keys(selectedTopics).map((topic) => (
                            <button
                                key={topic}
                                className={`topic-button ${selectedTopics[topic] ? "selected" : ""}`}
                                onClick={() => handleTopicToggle(topic)}
                            >
                                {topic.charAt(0).toUpperCase() + topic.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="start-button-container">
                    <button className="start-button" onClick={startQuiz}>Start Quiz</button>
                </div>
            </div>
        );
    }

    if (filteredQuestions.length === 0) {
        return <div>No questions available within your Elo range and selected topics.</div>;
    }

    const currentQuestion = filteredQuestions[shuffledIndices[currentQuestionIndex]];

    return (
        <div className="general-window">
            <button className="back-button" onClick={onBack}>←</button>
            <h2 className="lora-font-title">General Knowledge Quiz</h2>
            <p className="elo-rating">Elo Rating: {elo}</p>
            <p>Streak: {streak}</p>
            <p>Accuracy: {totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) + "%" : "N/A"}</p>
            <p>Last Response Time: {timeTaken.toFixed(2)}s</p>

            <div className="question-container">
                <h3>{currentQuestion.question}</h3>
                <div className="options">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-button 
                                ${showAnswer && option === selectedOption ? "selected" : ""} 
                                ${showAnswer && option === currentQuestion.answer ? "correct" : ""} 
                                ${showAnswer && option !== currentQuestion.answer && option === selectedOption ? "incorrect" : ""}`
                            }
                            onClick={() => handleOptionClick(option)}
                            disabled={showAnswer}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {showAnswer && (
                    <div>
                        {selectedOption === currentQuestion.answer ? (
                            <p className="correct-message">✅ Correct!</p>
                        ) : (
                            <p className="incorrect-message">
                                ❌ Incorrect! The correct answer is: {currentQuestion.answer}
                                {selectedOption && ` (you answered ${selectedOption})`}
                            </p>
                        )}
                        <div className="button-container">
                            <button className="explanation-button" onClick={handleExplanationClick}>
                                Explanation
                            </button>
                            <button className="next-button" onClick={handleNextQuestion}>Next</button>
                        </div>
                    </div>
                )}
            </div>

            <Modal isOpen={showExplanationModal} onClose={() => setShowExplanationModal(false)}>
                <p className="explanation-text">{currentQuestion.explanation}</p>
            </Modal>
        </div>
    );
}

export default GeneralKnowledge;