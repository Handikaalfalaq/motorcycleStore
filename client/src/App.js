/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Navbars from "./component/Navbars";
import Homes from "./component/Homes"
import {Route, Routes} from "react-router-dom"
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import {API, setAuthToken} from './config/Api';

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
    }
  }, []);

  return (
    <div style={{ maxWidth:"2500px", margin:"auto"}}>
      <Navbars/>
      
      <Routes>
            <Route exact path="/" element={<Homes/>} />
        </Routes>
    </div>
  );
}

export default App;
