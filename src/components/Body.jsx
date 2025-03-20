import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const userData = useSelector((store)=> store.user);
   // if token is present try to fetch profile of user , as user will logout only when cookie expire
   const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {withCredentials: true});
         console.log(res?.data?.data);
         dispatch(addUser(res?.data?.data));
      } 
      catch(err) {
         if(err.status === 401) {
            navigate("/login");
          }
         console.error(err?.message);
      }
    
   }
   // useEffect hook gets called when component is loaded
   useEffect(() => {
      if(!userData) {
         fetchUser();
      }
   }, []);
   
  return (
     <div> 
        <NavBar/>
        <Outlet/>
        <Footer/>
     </div>
  )
}

export default Body