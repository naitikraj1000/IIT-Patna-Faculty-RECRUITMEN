import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { authchange, userchange } from "../redux/infromationslice";
import Loading from "../src/component/loading";
async function checkAuth(dispatch) {
  try {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    let res = await fetch(`${backendurl}/verifytoken`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    

    let data = await res.json(); // Now it's safe to parse JSON
    dispatch(authchange(true));
    dispatch(userchange(data.user_id));
    console.log("AUTH IS TRUE, User ID:", data.user_id);
  } catch (error) {
    
    console.error("Protected route error:", error.message);
  }
}

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.information.isAuth);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {

    if (isAuth==false) {
      checkAuth(dispatch).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <Loading/>;
  
  return isAuth ? children : <Navigate to="/signin" />;
}
