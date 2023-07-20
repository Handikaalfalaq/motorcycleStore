import Navbars from "./component/Navbars";
import Index from "./pages/Index";
import {Route, Routes, redirect} from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import {API, setAuthToken} from './config/Api';

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    
    if (!isLoading) {
      if (state.isLogin === false) {
        // navigate('/');
        redirect('/');
      }
    }
  }, [isLoading]);

  

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  return (
    <div style={{ maxWidth:"2500px", margin:"auto"}}>
      <Navbars/>
      
      <Routes>
            <Route exact path="/" element={<Index/>} />
        </Routes>
    </div>
  );
}

export default App;
