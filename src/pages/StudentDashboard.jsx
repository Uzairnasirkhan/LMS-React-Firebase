import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaClipboardList } from "react-icons/fa";
import { auth, db } from "../config/firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GiGraduateCap } from "react-icons/gi";
import { signOut } from "firebase/auth";

const StudentDashboard = () => {

  const navigate = useNavigate()
  const [userData,setUserData] = useState({})
  const user = auth.currentUser
  
  const getUser = async()=>{
    try {
      const docRef = doc(db,"users",user.uid)
      const userObj = await getDoc(docRef)
      setUserData({...userObj.data()})
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = async()=>{
      try {
            await signOut(auth)
            navigate("/")
          } catch (error) {
            console.log(error)
          }
  }

useEffect(()=>{
  getUser()
},[])

  return (
    <div className="h-screen overflow-hidden">
      
      <div className="py-3 px-6 shadow-sm bg-gray-100 flex justify-between items-center">
         <h1 className="text-2xl text-blue-700 flex items-center gap-2 font-bold"><GiGraduateCap className="text-3xl"/>EduTrack</h1>
         <div className="flex items-center gap-3">
         <Button color="danger" variant="outlined" onClick={logOut}>Logout</Button>
         <img
            src={userData.imageUrl}
            alt="Profile"
            className="h-10 w-10 border-4 border-gray-800 rounded-full object-cover"
         />
         </div>
         
       </div>

      <div className="flex flex-col">

        {/* Welcoming Section with Light Blue Gradient */}
        <div className="text-blue-700 py-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome! {userData.name}</h1>
          <p className="text-lg">Your Learning Journey Starts Here</p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-1 justify-center items-center px-4 md:px-16 py-8">
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">

            {/* Profile Section with Soft Pastel Color */}
            <div className="flex-1 bg-teal-200 p-6 rounded-xl shadow-md text-center">
              <FaUserCircle className="text-white text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-teal-800 mb-4">Your Profile</h2>
              <p className="text-teal-700 text-sm mb-4">View your personal information</p>
              <Link to="/profile">
                <Button
                  className="text-white border-none bg-teal-500 hover:bg-teal-600"
                  icon={<FaUserCircle />}
                >
                  View Profile
                </Button>
              </Link>
            </div>

            {/* Grades Section with Soft Pastel Color */}
            <div className="flex-1 bg-lime-200 p-6 rounded-xl shadow-md text-center">
              <FaClipboardList className="text-white text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-lime-800 mb-4">Your Grades</h2>
              <p className="text-lime-700 text-sm mb-4">View your progress and recent grades</p>
              <Link to="/view-grades">
                <Button
                  className="text-white border-none bg-lime-600 hover:bg-lime-700"
                  icon={<FaClipboardList />}
                >
                  View Grades
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sign Out Section */}
        <div className="p-6 text-center">
          <Button
            type="danger"
            className="w-full text-white"
            onClick={() => {
              // Add sign-out functionality here
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>

    </div>
   
  );
};

export default StudentDashboard;
