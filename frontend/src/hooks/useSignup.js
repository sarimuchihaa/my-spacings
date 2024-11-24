import { useState } from "react"
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async({fullName,userName,password}) => {
        const success = handleInputErrors({fullName,userName,password})
        if(!success) return;
    
        setLoading(true);
        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ fullName,userName,password})
            });

            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            // localStorage, context
        }   catch (error) {
            toast.error(error.message)
        }   finally {
            setLoading(false);
        }
    };

    return {loading, signup};
};
export default useSignup;

function handleInputErrors({fullName,userName,password}){
    if(!fullName || !userName || !password) {
      toast.error('Please fill in all fields')
      return false
    }

    if(password.length < 6){
      toast.error('Password must be at least 6 characters')
      return false
    }

    return true
}