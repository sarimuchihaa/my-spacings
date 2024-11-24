import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
  });

  const {signup} = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(inputs);
      toast.success("User added successfully! 🎉", {
        position: "top-right",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Signup failed. Please try again.", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <div
    style={{
      backgroundImage: "url('/bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: '100vh',
      width: '100%',
    }}>
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> Spacings</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* FULLNAME */}
          <div>
            <label className='label p-2'> <span className='text-base label-text text-white'>Full Name</span></label>
            <input type='text' placeholder='Enter fullname' className='w-full input input-bordered h-10' value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})}/>
          </div>

          {/* USERNAME */}
          <div>
            <label className='label p-2'> <span className='text-base label-text text-white'>Username</span></label>
            <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' value={inputs.userName} onChange={(e) => setInputs({...inputs, userName: e.target.value})}/>
          </div>

          {/* PASSWORD */}
          <div>
            <label className='label'> <span className='text-base label-text text-white'>Password</span></label>
            <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
          </div>
          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>Already have an account?</Link>

          <div>
						<button type="submit" className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
					</div>
        </form>  
    </div>
  </div>
</div>
);
}

export default SignUp;