import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store)=> store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {withCredentials: true});
      dispatch(addfeed(res.data));
      console.log(res);
    } 
    catch(err) {
      console.log(err);
    }
  }
  // load feed when page loads
  useEffect(()=> {
    getFeed();
  }, []);

  return feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
      {/* {feed.forEach(user =>  <UserCard user={user}/>)} */}
    </div>
  )
}

export default Feed