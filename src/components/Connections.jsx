import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';

const Connections = () => {
const dispatch = useDispatch();
const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {   
        const res = await axios.get( BASE_URL +"/user/connections", {withCredentials: true});
        dispatch(addConnections(res?.data?.data));
    }   
    catch(err) {
        console.error(err);
    }
  }

  useEffect(()=> {
    fetchConnections();
  }, [])

  if(!connections) return;
  if(connections.length === 0) return <h1>No connections found.</h1>;

  return (
    <div className="flex justify-between items-center text-center my-10">
        <h1 className="font-bold text-2xl">
            Connections
        </h1>
        {connections.map((connection) => {
            const {_id, firstName, lastName, photoUrl, age, gender, about} = connection;
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
                </div>
            )
        })}
    </div>
  )
}

export default Connections