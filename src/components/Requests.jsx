import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice';
import axios from 'axios';

const Requests = () => {
const dispatch = useDispatch();
const requests = useSelector((store)=> store.requests);
const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials: true});
    dispatch(addRequests(res?.data?.data));
}
useEffect(() => {
    fetchRequests();
}, [])
if(!requests) return;
if(requests.length === 0) (<div> No requests!!</div>)
  return (
    <div className="text-center my-10">
    <h1 className="font-bold text-2xl">
        Connection Requests
    </h1>
    {requests.map((request) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;
        return (
            <div className="items-center justify-between m-4 p-4 rounded-lg bg-base-200 flex w-2/3" key={_id}>
                <div>
                    <img alt="photo" className="w-20 h-20" src= {photoUrl}/>
                </div>
                <div>
                    <h2>{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                </div>    
                <div>
                    <button className="btn btn-primary mx-2">Accept</button>
                    <button className="btn btn-secondary mx-2">Reject</button>
                </div>    
            </div>
        )
    })}
    </div>
  )
}

export default Requests