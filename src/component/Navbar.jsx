import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(API_URL + "/logout", {}, {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      <div className="flex gap-2">
        {(user && typeof user === "object" && user._id) && <p className="text-xl font-bold text-gray-400"> Hi {user?.firstName}</p>}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {(user && typeof user === "object" && user._id) && <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={user.photoURL} />
            </div>}
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li >
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;