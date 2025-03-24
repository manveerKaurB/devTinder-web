import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/Constants';
import { removeFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({user}) => {
const dispatch = useDispatch();
const {firstName, lastName, gender, photoUrl, skills, age, about, _id} = user;
const handleSendRequest = async (status, toUserId) => {
    const response = await axios.post(BASE_URL + "/request/send/" + status + "/" + toUserId, {}, {withCredentials: true});
    dispatch(removeFeed(toUserId));
    console.log(response);
}
  return (
    <div className="flex justify-center">
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure>
                <img
                src={photoUrl}
                alt="User" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{skills}</p>
                <p>{about}</p>
                <div className="card-actions justify-center m-4">
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard