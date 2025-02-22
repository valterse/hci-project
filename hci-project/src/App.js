import React, { useState, useEffect } from "react";
import "./App.css";
import GeneralKnowledge from "./GeneralKnowledge/GeneralKnowledge";
import Login from "./Login/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDFBR9gIBjmUnxjOnMVDi2gAyv83CGQtro",
    authDomain: "hci-project-5cb3f.firebaseapp.com",
    projectId: "hci-project-5cb3f",
    storageBucket: "hci-project-5cb3f.appspot.com",
    messagingSenderId: "331116604954",
    appId: "1:331116604954:web:67daaa75605e47b72beba3",
    measurementId: "G-3J7EDTDZKE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

function App() {
    const [activeWindow, setActiveWindow] = useState("home"); // Default to "home"
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
                const userDoc = await getDoc(userDocRef); // Check if the document exists

                if (userDoc.exists()) {
                    // If the document exists, set the user data
                    setUserData(userDoc.data());
                } else {
                    // If the document doesn't exist, create it with default values
                    const defaultUserData = {
                        elo: 1200,
                        streak: 0,
                        correctAnswers: 0,
                        totalQuestions: 0,
                    };
                    await setDoc(userDocRef, defaultUserData); // Create the document
                    setUserData(defaultUserData); // Set the default data in state
                }

                setUser(user);
                setActiveWindow("home");
            } else {
                setUser(null);
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = (userId) => {
        setActiveWindow("home"); // Explicitly set activeWindow to "home" after login
    };

    const updateUserData = async (newData) => {
        if (user) {
            await updateDoc(doc(db, "users", user.uid), newData);
            setUserData(newData);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            setUser(null); // Clear the user state
            setUserData(null); // Clear the user data state
            setActiveWindow("home"); // Reset the active window
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (!user) {
        return <Login onLogin={handleLogin} />; // Show login page if user is not logged in
    }

    if (activeWindow === "general") {
        return <GeneralKnowledge onBack={() => setActiveWindow("home")} userData={userData} updateUserData={updateUserData} />;
    }

    // Render the main app page with buttons
    return (
        <div className="App">
            <div className="logout">
                <button className="logout-button" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
            <h1>AUDIMIND</h1>
            <div className="buttons">
                <button className="lora-font-bold" onClick={() => setActiveWindow("general")}>
                    General Knowledge
                </button>
                <button className="lora-font-bold" onClick={() => setActiveWindow("memory")}>
                    Memory
                </button>
            </div>
        </div>
    );
}

export default App;