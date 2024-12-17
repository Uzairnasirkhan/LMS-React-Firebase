import React, { useState,useEffect } from 'react'
import {Card , Avatar} from 'antd'
import { db } from '../config/firebaseConfig/firebase'
import { doc , getDoc } from 'firebase/firestore'
import { auth } from '../config/firebaseConfig/firebase';
import { FaVenusMars } from "react-icons/fa6";
import { BiSolidUserBadge } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";

const Profile = () => {
 
  const[userDoc,setUserDoc] = useState({})

  const getUser = async()=>{
    try {
    const user = auth.currentUser

    const docRef = doc(db,"users",user.uid)
      const userObj = await getDoc(docRef)
      setUserDoc({...userObj.data()})
 
    } catch (error) {
       console.log(error)      
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className='h-screen'>

      <div className="shadow-sm bg-gray-100 flex items-center">
        <h1 className="py-3 px-4 text-2xl text-blue-700 flex items-center gap-2 font-bold"><GiGraduateCap className="text-3xl" />EduTrack</h1>
        <h1 className='bg-teal-200 text-teal-800 rounded-md px-4 py-2 mx-3 text-xl font-bold'>Profile</h1>
      </div>

      {/* <Header label={"Profile"}/> */}
    <div className="flex items-center justify-center h-5/6 pt-4">
      <Card className="shadow-sm rounded-lg w-full max-w-sm px-4 py-2 bg-teal-200 shadow-teal-200 hover:shadow-lg">
        <div className="flex flex-col items-center">
          <Avatar 
            src={userDoc.imageUrl} 
            size={120} 
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold text-teal-800 mb-2">{userDoc.name}</h2>
          <p className="text-teal-600 mb-4">{userDoc.email}</p>
          <div className="w-full">
            <div className="flex mb-2 gap-1">
              <span className="text-teal-800 font-bold flex items-center gap-1"><BiSolidUserBadge/> User Id:</span>
              <span className="text-teal-700 font-medium">{userDoc.id}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-teal-800 font-bold flex items-center gap-1"><FaVenusMars/> Gender:</span>
              <span className="text-teal-700 font-medium">{userDoc.gender}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>



    </div>
  )
}

export default Profile
