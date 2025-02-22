import React, { useState, useEffect } from "react";
import "./Memory.css";
import memoryQuestions from "./MemoryQuestions"; // Ensure this path is correct

// Get audio files
const audioFiles = {};
for (let i = 1; i <= 32; i++) {
    audioFiles[i] = require(`../AudioFiles/${i}.mp3`);
}

function Memory({ onBack, userData, updateUserData }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
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
        if (currentQuestion) {
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
    }, [currentQuestion]);

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

    // Handle user input
    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    // Update Elo based on performance
    const updateElo = (correctCount, totalCorrectAnswers, questionDifficulty) => {
        const K = 32; // Elo rating constant
        const proportionCorrect = correctCount / totalCorrectAnswers;

        // Calculate performance factor
        const performanceFactor = proportionCorrect - 0.5; // Baseline is 50% correct

        // Calculate difficulty factor
        const difficultyFactor = questionDifficulty / 1000; // Normalize difficulty

        // Calculate Elo scaling factor
        const eloScalingFactor = 1 / (1 + elo / 2000); // Reduce Elo gain for high Elo users

        // Calculate Elo change
        const eloChange = K * performanceFactor * difficultyFactor * eloScalingFactor;

        // Update Elo
        const newElo = elo + eloChange;
        return Math.round(newElo); // Round to the nearest integer
    };

    // Check the user's answer
    const checkAnswer = () => {
        if (!currentQuestion) return; // Guard clause if no question is loaded

        // Normalize the user's answer
        const normalizedUserAnswer = userAnswer
            .toLowerCase() // Convert to lowercase
            .replace(/,/g, " ") // Replace commas with spaces
            .split(/\s+/) // Split into an array of words
            .filter((word) => word.length > 0); // Remove empty strings

        // Normalize the correct answers
        const normalizedCorrectAnswers = currentQuestion.answer
            .map((answer) => answer.toLowerCase()); // Convert to lowercase

        // Convert both arrays to sets for comparison
        const userAnswerSet = new Set(normalizedUserAnswer);
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

        // Update Elo
        const newElo = updateElo(correctCount, totalCorrectAnswers, currentQuestion.difficulty);

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

    // Move to the next question
    const handleNextQuestion = () => {
        setUserAnswer("");
        setShowFeedback(false);
        setIsCorrect(false);
        setIsAudioPlaying(false);

        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            alert("Quiz completed!");
            setCurrentQuestionIndex(0);
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
            <p>Streak: {streak}</p>
            <p>Accuracy: {totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) + "%" : "N/A"}</p>

            {currentQuestion ? (
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

                    {/* Answer Input and Submit Button */}
                    <div className="answer-input">
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={handleInputChange}
                            placeholder="Type your answer here..."
                            disabled={showFeedback}
                        />
                        <div className="button-container">
                            {!showFeedback && (
                                <button className="submit-button" onClick={checkAnswer}>
                                    Submit
                                </button>
                            )}
                        </div>
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