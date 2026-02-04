import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import apiClient from '../utils/apiClient';

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const response = await apiClient.post("/signup", formData);
      const { user, token } = response.data;

      localStorage.setItem("token", token);

      dispatch(addUser(user));

      navigate("/profile");
    } catch (error) {
      console.error("Error: ", error.message);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div>

      <div className="min-h-screen flex items-center justify-center bg-base-200">

        <div className="card bg-neutral text-neutral-content w-96 shadow-2xl border border-gray-700">
          <div className="card-body">

            <h2 className="card-title text-center justify-center text-2xl font-bold">
              SignUp Page
            </h2>

            <div className="space-y-4 mt-4">

              <div>
                <label className="label">
                  <span className="label-text text-gray-300">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-gray-300">last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-gray-300">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  value={formData.emailId}
                  onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-indigo-500"
                />
              </div>

            </div>
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            <div className="card-actions justify-center mt-6">
              <button className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                onClick={handleSignUp}
              >
                SIGNUP
              </button>
              <p>Already User ? <Link to="/login">Login</Link></p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default SignUp