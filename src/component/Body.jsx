import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const fetchUser = async () => {
    if (userData && typeof userData === "object" && userData._id) {
      return;
    }
    try {
      const response = await axios.get(API_URL + "/profile/views", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      navigate("/login");
      console.log("Error: ", error.message);
    }
  }

  useEffect(() => {

    fetchUser();

  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Body