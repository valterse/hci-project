import React, { useState, useEffect } from "react";
import "./App.css";
import GeneralKnowledge from "./GeneralKnowledge/GeneralKnowledge";
import Memory from "./Memory/Memory";
import Login from "./Login/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
    const [activeWindow, setActiveWindow] = useState("home");
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    const defaultUserData = {
                        elo: 1200, // General Knowledge Elo
                        memoryElo: 1200, // Memory Quiz Elo
                        streak: 0,
                        correctAnswers: 0,
                        totalQuestions: 0,
                    };
                    await setDoc(userDocRef, defaultUserData);
                    setUserData(defaultUserData);
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
        setActiveWindow("home");
    };

    const updateUserData = async (newData) => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                // Merge new data with existing data to avoid overwriting the other Elo
                const updatedData = { ...userDoc.data(), ...newData };
                await updateDoc(userDocRef, updatedData);
                setUserData(updatedData);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserData(null);
            setActiveWindow("home");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    if (activeWindow === "general") {
        return <GeneralKnowledge onBack={() => setActiveWindow("home")} userData={userData} updateUserData={updateUserData} />;
    }
    if (activeWindow === "memory") {
        return <Memory onBack={() => setActiveWindow("home")} userData={userData} updateUserData={updateUserData} />;
    }

    return (
        <div className="App">
            <div className="logout">
                <button className="logout-button" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
            <img src="/coolerlogo3.png" alt="AUDIMIND Logo" className="logo" />
            <div className="elo-ratings">
                <p>General Knowledge Elo: {userData?.elo || 1200}</p>
                <p>Memory Quiz Elo: {userData?.memoryElo || 1200}</p>
            </div>
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