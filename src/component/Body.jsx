import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import apiClient from "../utils/apiClient";
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
      const response = await apiClient.get("/profile/views");
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