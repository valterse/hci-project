import React, { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import "./Login.css";
import googleLogo from "../google.png";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const auth = getAuth();
    const db = getFirestore();
    const googleProvider = new GoogleAuthProvider();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Initialize user data in Firestore
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    elo: 1200,
                    streak: 0,
                    correctAnswers: 0,
                    totalQuestions: 0,
                });
            }
            onLogin(userCredential.user.uid); // Redirect to the main app page
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");

        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;

            // Check if the user already exists in Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                // Initialize user data in Firestore for new Google users
                await setDoc(doc(db, "users", user.uid), {
                    elo: 1200,
                    streak: 0,
                    correctAnswers: 0,
                    totalQuestions: 0,
                });
            }

            onLogin(user.uid); // Redirect to the main app page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isLogin ? "Log in" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="toggle-button-container">
                        <button
                            type="button"
                            className="toggle-button"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Need an account? Sign Up" : "Already have an account? Log in"}
                        </button>
                    </div>
                    <button type="submit">{isLogin ? "Log in" : "Sign Up"}</button>
                </form>
                <button className="google-login-button" onClick={handleGoogleLogin}>
                    <img
                        src={googleLogo} // Use the imported image
                        alt="Google Logo"
                        className="google-logo"
                    />
                    Google
                </button>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Login;