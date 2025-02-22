import React, { useState, useEffect } from "react";
import "./Memory.css";
import memoryQuestions from "./MemoryQuestions"; // Ensure this path is correct

// Get audio files
const audioFiles = {};
for (let i = 1; i <= 52; i++) {
    audioFiles[i] = require(`../AudioFiles/${i}.mp3`);
}

function Memory({ onBack, userData, updateUserData }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]); // Store user answers in an array
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
    const [pointsEarned, setPointsEarned] = useState(0);
    const [elo, setElo] = useState(userData?.memoryElo || 1200); // Use Memory Quiz Elo
    const [streak, setStreak] = useState(userData?.streak || 0);
    const [correctAnswers, setCorrectAnswers] = useState(userData?.correctAnswers || 0);
    const [totalQuestions, setTotalQuestions] = useState(userData?.totalQuestions || 0);
    const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

    // Filter questions within 100 Elo range
    const filteredQuestions = memoryQuestions.filter(
        (question) => Math.abs(question.difficulty - elo) <= 100
    );

    // Disable scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // Get the current question
    const currentQuestion = filteredQuestions[currentQuestionIndex];

    // Debugging: Log the current question and index
    useEffect(() => {
        console.log("Current Question Index:", currentQuestionIndex);
        console.log("Current Question:", currentQuestion);
        console.log("Filtered Questions:", filteredQuestions);
    }, [currentQuestionIndex, currentQuestion, filteredQuestions]);

    // Load the audio when the question changes
    useEffect(() => {
        if (currentQuestion && quizStarted) { // Only load audio if the quiz has started
            const newAudio = new Audio(audioFiles[currentQuestion.id]);
            setAudio(newAudio);

            // Add event listener for when the audio ends
            newAudio.addEventListener("ended", () => {
                setIsAudioPlaying(false); // Stop pulsating when audio ends
            });

            // Clean up the audio when the component unmounts or the question changes
            return () => {
                newAudio.pause();
                newAudio.currentTime = 0;
                newAudio.removeEventListener("ended", () => {}); // Clean up event listener
            };
        }
    }, [currentQuestion, quizStarted]);

    // Play the audio when the user clicks the "Play" button
    const handlePlayAudio = () => {
        if (audio) {
            audio.play()
                .then(() => {
                    setIsAudioPlaying(true);
                })
                .catch((error) => {
                    console.error("Error playing audio:", error);
                });
        }
    };

    // Handle user input for each answer field
    const handleInputChange = (index, value) => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[index] = value.toLowerCase(); // Convert to lowercase (allow spaces)
        setUserAnswers(newUserAnswers);
    };

    // Update Elo based on performance
    const updateElo = (userElo, questionDifficulty, proportionCorrect) => {
        const K = 32; // Elo rating constant (can be adjusted)

        // Calculate the expected score for the user
        const expectedScore = 1 / (1 + Math.pow(10, (questionDifficulty - userElo) / 400));

        // The actual score is the proportion of correct answers
        const actualScore = proportionCorrect;

        // Calculate the new Elo rating
        const newElo = userElo + K * (actualScore - expectedScore);

        return Math.round(newElo); // Round to the nearest integer
    };

    // Check the user's answer
    const checkAnswer = () => {
        if (!currentQuestion) return; // Guard clause if no question is loaded

        // Normalize the correct answers
        const normalizedCorrectAnswers = currentQuestion.answer
            .map((answer) => answer.toLowerCase()); // Convert to lowercase (allow spaces)

        // Normalize the user's answers
        const normalizedUserAnswers = userAnswers
            .map((answer) => answer.toLowerCase()) // Convert to lowercase (allow spaces)
            .filter((answer) => answer.length > 0); // Remove empty strings

        // Convert both arrays to sets for comparison
        const userAnswerSet = new Set(normalizedUserAnswers);
        const correctAnswerSet = new Set(normalizedCorrectAnswers);

        // Calculate the number of correct answers provided by the user
        let correctCount = 0;
        userAnswerSet.forEach((item) => {
            if (correctAnswerSet.has(item)) {
                correctCount++;
            }
        });

        // Calculate the proportion of correct answers
        const totalCorrectAnswers = correctAnswerSet.size;
        const proportionCorrect = correctCount / totalCorrectAnswers;

        // Determine if the answer is fully correct
        const isFullyCorrect = correctCount === totalCorrectAnswers;

        // Update Elo using the proportion of correct answers
        const newElo = updateElo(elo, currentQuestion.difficulty, proportionCorrect);

        // Update streak
        const newStreak = isFullyCorrect ? streak + 1 : 0;

        // Update user data
        const newData = {
            memoryElo: newElo, // Update Memory Quiz Elo
            streak: newStreak,
            correctAnswers: correctAnswers + (isFullyCorrect ? 1 : 0),
            totalQuestions: totalQuestions + 1,
        };

        // Update state
        setElo(newElo);
        setStreak(newStreak);
        setCorrectAnswers(newData.correctAnswers);
        setTotalQuestions(newData.totalQuestions);
        updateUserData(newData);

        // Set feedback state
        setCorrectCount(correctCount);
        setTotalCorrectAnswers(totalCorrectAnswers);
        setPointsEarned(Math.round(proportionCorrect * 10)); // Points earned (0-10)
        setIsCorrect(isFullyCorrect);
        setShowFeedback(true);
    };

    // Start the quiz
    const handleStartQuiz = () => {
        setQuizStarted(true); // Mark the quiz as started
        setCurrentQuestionIndex(0); // Start with the first question
    };

    // Move to the next question
    const handleNextQuestion = () => {
        setUserAnswers([]); // Reset user answers
        setShowFeedback(false);
        setIsCorrect(false);
        setIsAudioPlaying(false);

        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Load the next question
        } else {
            alert("Quiz completed!");
            setCurrentQuestionIndex(0); // Reset to the first question
            setQuizStarted(false); // Mark the quiz as ended
        }
    };

    // If no questions are within the 100 Elo range, show a message
    if (filteredQuestions.length === 0) {
        return (
            <div className="memory-window">
                <button className="back-button" onClick={onBack}>←</button>
                <h2 className="lora-font-title">Memory Quiz</h2>
                <p>No questions available within your Elo range. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="memory-window">
            <button className="back-button" onClick={onBack}>←</button>
            <h2 className="lora-font-title">Memory Quiz</h2>
            <p className="elo-rating">Elo Rating: {elo}</p>
            <p className="elo-rating">Question Difficulty: {currentQuestion?.difficulty || "N/A"}</p>
            <p>Streak: {streak}</p>
            <p>Accuracy: {totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) + "%" : "N/A"}</p>

            {!quizStarted ? (
                // Show "Start Quiz" button if the quiz hasn't started
                <button className="start-quiz-button" onClick={handleStartQuiz}>
                    Start Quiz
                </button>
            ) : currentQuestion ? (
                // Show the question and answer inputs if the quiz has started
                <div className="question-container">
                    {/* Play Audio Button */}
                    <div className="audio-controls">
                        <button
                            className={`play-button ${isAudioPlaying ? "playing" : ""}`}
                            onClick={handlePlayAudio}
                            disabled={isAudioPlaying}
                        >
                            {isAudioPlaying ? "Playing..." : "Play Audio"}
                        </button>
                    </div>

                    {/* Question */}
                    <h3>{currentQuestion.question}</h3>

                    {/* Answer Input Fields */}
                    <div className="answer-input">
                        {currentQuestion.answer.map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                value={userAnswers[index] || ""}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder={`Answer ${index + 1}`}
                                disabled={showFeedback}
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="button-container">
                        {!showFeedback && (
                            <button className="submit-button" onClick={checkAnswer}>
                                Submit
                            </button>
                        )}
                    </div>

                    {/* Feedback */}
                    {showFeedback && (
                        <div className="feedback">
                            {isCorrect ? (
                                <p className="correct-message">✅ Correct! You earned {pointsEarned} points.</p>
                            ) : (
                                <p className="incorrect-message">
                                    ❌ You provided {correctCount} out of {totalCorrectAnswers} correct answers.
                                    The correct answers are: {currentQuestion.answer.sort().join(", ")}
                                </p>
                            )}
                            <button className="next-button" onClick={handleNextQuestion}>
                                Next Question
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p>No question loaded. Please check the questions array.</p>
            )}
        </div>
    );
}

export default Memory;