"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import TodoForm from "../components/TodoForm";
import { addTodo } from "../../firebase/todos";

export default function AddTodoPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return <div className="container">Loading...</div>;
  if (!user) return null;

  const handleSubmit = async (
    title: string,
    description: string,
    completed: boolean = false
  ) => {
    try {
      await addTodo(user.uid, title, description, completed);
      router.prefetch("/"); // Prefetch the homepage
      router.refresh(); // Refresh the current route's data
      router.push("/"); // Navigate to homepage
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#1E1E1E] text-white">
      {/* Back button in its own container */}
      <div className="border-b border-gray-800 mb-6">
        <div className="container max-w-[800px] mx-auto px-8 py-4">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center bg-black/20 hover:bg-black/30 text-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* Header section */}
      <div className="container max-w-[800px] mx-auto px-8">
        <div className="header mb-8">
          <div className="flex justify-between items-center">
            <div className="user-info flex items-center gap-4">
              <span className="text-gray-300">{user.email}</span>
              <button
                onClick={() => router.push("/auth")}
                className="auth-btn bg-[#dc3545] text-white px-4 py-1 rounded hover:opacity-90 transition-opacity"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container max-w-[800px] mx-auto px-8">
        {/* Form */}
        <div className="bg-[#252525] rounded-lg">
          <TodoForm onSubmit={handleSubmit} onClose={() => router.push("/")} />
        </div>
      </div>
    </main>
  );
}
