import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [error, setError] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const handleEditProfile = async () => {
        // clear errors 
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit" , {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            }, {withCredentials: true})
            dispatch(addUser(res?.data?.data));
            setShowNotification(true);
            // clear notification after 5 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
        catch(err) {
            setError(err?.response?.data);
        }
    }

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                <h2 className="card-title justify-center">Edit Passowrd</h2>
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">           
                    <label className="fieldset-label">First Name</label>
                    <input type="text" className="input" placeholder="First Name" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                    
                    <label className="fieldset-label">Last Name</label>
                    <input type="text" className="input" placeholder="Last Name" value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>

                    <label className="fieldset-label">Photo Url</label>
                    <input type="text" className="input" placeholder="Photo Url" value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}/>

                    <label className="fieldset-label">Age</label>
                    <input type="text" className="input" placeholder="Age" value={age}
                    onChange={(e) => setAge(e.target.value)}/>

                    <label className="fieldset-label">Gender</label>
                    <input type="text" className="input" placeholder="Gender" value={gender}
                    onChange={(e) => setGender(e.target.value)}/>

                    <label className="fieldset-label">About</label>
                    <input type="text" className="input" placeholder="About" value={about}
                    onChange={(e) => setAbout(e.target.value)}/>

                    <p className="text-red-500">{error}</p>

                    <button className="btn btn-neutral mt-4" onClick={handleEditProfile}>Save Profile</button>

                </fieldset>
                </div>
            </div>
        </div>
        <UserCard user={{firstName, lastName, age, gender, photoUrl, about}}/>
    </div>
    { showNotification && 
    <div className="toast toast-top toast-end my-20">
        <div className="alert alert-success">
            <span>Profile Saved successfully</span>
        </div>
    </div>
    }
    </>
  )
}

export default EditProfile