import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    console.log("Login attempt with:", { userName, password });

    // Validate inputs before making API call.
    if (!handleInputErrors(userName, password)) return;

    setLoading(true);
    try {
      // Send API request.
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      // Check if response is unsuccessful.
      if (!res.ok) {
        const errorData = await res.json(); // Parse error response.
        throw new Error(errorData.error || "Login failed!");
      }

      // Parse successful response.
      const data = await res.json();

      // Save user to localStorage and context.
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged in successfully!");
    } catch (error) {
      // Display error to user.
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

// Helper function to validate inputs.
function handleInputErrors(userName, password) {
  if (!userName || !password) {
    toast.error("Please fill in all fields.");
    return false;
  }
  return true;
}