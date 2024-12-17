import React, { useState,useEffect } from 'react'
import{Card} from 'antd'
import { db ,auth} from '../config/firebaseConfig/firebase'
import { getDoc,doc } from 'firebase/firestore'
import { FaAward } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const ViewGrades = () => {

  const[userDoc,setUserDoc] = useState({})
  const[message,setMessage] = useState("")
  const[txtClr,setTxtClr] = useState("")

  const getUser = async()=>{
    try {
    const user = auth.currentUser

    const docRef = doc(db,"marks",user.uid)
      const userObj = await getDoc(docRef)
      setUserDoc({...userObj.data()})
      if(userObj.data().grade == 'A'){
       setMessage("Congratulations! You secured A grade.")
       setTxtClr("bg-green-500 text-lg p-2 rounded-md")
      }
      else if(userObj.data().grade == 'B'){
       setMessage("Good.You secured a B grade")
       setTxtClr("bg-blue-500 text-lg p-2 rounded-md")
      }
      else if(userObj.data().grade == 'C'){
        setMessage("You need to work harder!")
        setTxtClr("bg-yellow-400 text-lg p-2 rounded-md text-black")
       }
      else if(userObj.data().grade == 'D'){
        setMessage("You have to improve a lot!")
        setTxtClr("bg-yellow-400 text-lg p-2 rounded-md text-black")
      }
      else if(userObj.data().grade == 'Fail'){
        setMessage("Unfortunately You have failed")
        setTxtClr("bg-red-600 text-lg p-2 rounded-md")
       }

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
        <h1 className='bg-lime-200 text-lime-800 rounded-md px-4 py-2 mx-3 text-xl font-bold'>Grades</h1>
      </div>
 
    <div className="flex justify-center items-center h-5/6 pt-3">
      <Card
        className="shadow-lime-200 w-96 shadow-sm rounded-lg bg-lime-200 hover:shadow-lg"
        hoverable
        style={{ borderRadius: "10px" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <h1 className='text-3xl font-bold text-lime-900'>Student Progress</h1>
          <h2 className="text-2xl font-semibold text-lime-800">
           {userDoc.stdName}
          </h2>
          <div className="flex justify-center text-md gap-2 w-full text-lime-800">
            <span className="font-bold flex gap-1 items-center"><FaAward/> Grade :</span>
            <span>{userDoc.grade}</span>
          </div>
          <div className="flex justify-center w-full gap-2 text-lime-800">
            <span className="font-bold flex gap-1 items-center"><FaTrophy/> Marks :</span>
            <span>{userDoc.marks}</span>
          </div>
          <div className='w-full flex justify-center text-white'>
            <h1 className={txtClr}>{message}</h1>
          </div>
        </div>
      </Card>
    </div>
  

    </div>
  )
}

export default ViewGrades
