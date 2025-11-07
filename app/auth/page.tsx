"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.push("/");
    } catch (error) {
      setError("Failed to " + (isLogin ? "sign in" : "sign up"));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (error) {
      setError("Failed to sign in with Google");
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className="google-btn">
          Sign in with Google
        </button>
        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
