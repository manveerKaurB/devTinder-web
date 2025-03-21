import React from 'react'

const UserCard = ({user}) => {
const {firstName, lastName, gender, photoUrl, skills, age, about} = user;
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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard