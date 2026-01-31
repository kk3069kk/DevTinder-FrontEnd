import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { useSelector } from 'react-redux';


const Login = () => {
  const [emailId, setEmailId] = useState("kk1@gmail.com");
  const [password, setPassword] = useState("Googlechrome@1");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData && typeof userData === "object" && userData._id) {
      navigate("/");
    }
  }, [userData, navigate]);
  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL + "/login", {
        emailId,
        password
      }, {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error.message);
      setErrorMessage("Invalid email or password");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card bg-neutral text-neutral-content w-96 shadow-2xl border border-gray-700">
        <div className="card-body">

          <h2 className="card-title text-center justify-center text-2xl font-bold">
            Login Page
          </h2>

          <div className="space-y-4 mt-4">


            <div>
              <label className="label">
                <span className="label-text text-gray-300">Email</span>
              </label>
              <input
                type="email"
                placeholder="mail@site.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text text-gray-300">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-indigo-500"
              />
            </div>

          </div>
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          <div className="card-actions justify-center mt-6">
            <button className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>

        </div>
      </div>

    </div>

  )
}

export default Login