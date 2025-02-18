import { Outlet } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if(user) return;
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",
        { withCredentials: true } //Pass the cookie in the api call
      );
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401) navigate("/login");
      console.log(err);
    }
  };
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
