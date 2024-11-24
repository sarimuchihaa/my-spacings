import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with:", { username, password }); 
    await login(username, password);
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
          Login
          <span className="text-blue-500"> Spacings</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2" htmlFor="username"> <span className="text-base label-text text-white">Username</span></label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="w-full input input-bordered h-10"/>
          </div>

          <div>
            <label className="label" htmlFor="password"> <span className="text-base label-text text-white">Password</span></label>
            <input type="password"   id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full input input-bordered h-10"/>
          </div>

          <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white">
            {"Don't"} have an account?
          </Link>

          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
