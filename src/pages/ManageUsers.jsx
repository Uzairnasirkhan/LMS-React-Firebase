import React from 'react'
import UNButton from '../Components/UNButton'
import { Modal,Avatar,message } from 'antd';
import { useState,useEffect } from 'react';
import {db,auth} from "../config/firebaseConfig/firebase"
import UNInput from '../Components/UNInput';
import { doc, setDoc , getDocs, collection, query} from 'firebase/firestore'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';


const ManageUsers = () => {

  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("");
  const[stdName,setStdName] = useState("")
  const[gender,setGender] = useState("")
  const[stdList,setStdList] = useState([])
  const[imageUrl,setImageUrl] = useState("")
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
 
  
  const showModal = () => {
    setOpen(true)
  };
  
  const handleOk = async() => {
    if(!stdName || !gender || !email || !password){
        alert("Fill all the fields!")
    }
    else{
      setConfirmLoading(true);
     const userSignup = await createUserWithEmailAndPassword(auth,email,password)
     const uid = userSignup.user.uid
     
     await setDoc(doc(db,"users",uid),{
      name: stdName,
      id: uid,
      email: email, 
      password: password,
      gender: gender,
      imageUrl: imageUrl
     })

     await getStudents();
     setConfirmLoading(false)
    setOpen(false);
     message.success("Student Added!")
    setEmail("");
    setPassword("");
    setStdName("");
    setGender("");
    
    }
    
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const getStudents = async()=>{
    try {
      let stdArr = []
      const q = query(collection(db, "users"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if(doc.data().userType !== "admin"){
        stdArr.push({ ...doc.data(), id: doc.id })
        }
      })
      setStdList(stdArr)
    } catch (error) {
      console.log(error)
    }
  }

 

  useEffect(() => {
    getStudents()
  }, [])


  return (
    <div>
      <div className='w-full p-3 bg-slate-200 text-xl text-gray-900 flex justify-between rounded-lg font-semibold shadow-md'>
          <h1>Students</h1>
          <UNButton label={"Add Student"} onClick={showModal}/>
          <Modal title="Student Registration" open={open} onOk={handleOk} onCancel={handleCancel}
          confirmLoading={confirmLoading}>
              <UNInput placeholder={"Enter student's full name"} onChange={(e)=>{setStdName(e.target.value)}}/>
              <UNInput placeholder={"Enter student's email"}  onChange={(e)=>{setEmail(e.target.value)}}/>
              <UNInput placeholder={"Enter student's password"}  onChange={(e)=>{setPassword(e.target.value)}}/>
              <UNInput placeholder={"Enter student's gender"}  onChange={(e)=>{setGender(e.target.value)}}/>
              <UNInput placeholder={"Enter sudent's image URL"}  onChange={(e)=>{setImageUrl(e.target.value)}}/>
          </Modal>
          
      </div>

    
                 <div className="p-6 bg-gray-100 flex justify-center">
                 <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
                   <table className="min-w-full table-auto">
                     <thead>
                       <tr className="bg-blue-500 text-white text-sm leading-normal">

                         <th className="py-3 px-6 text-left">Name</th>
                         <th className="py-3 px-6 text-left">Email</th>
                         <th className="py-3 px-6 text-left">Password</th>
                         <th className="py-3 px-6 text-left">Gender</th>
                         <th className="py-3 px-6 text-left">Student Id</th>
                       </tr>
                     </thead>
                     <tbody className="text-gray-600 text-sm font-light">
                       {stdList.map((student)=>(
                          <tr key={student.id}
                          className= "border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left flex gap-2 items-center"><Avatar src={student.imageUrl} size={40}/>{student.name}</td>
                          <td className="py-3 px-6 text-left">{student.email}</td>
                          <td className="py-3 px-6 text-left">{student.password}</td>
                          <td className="py-3 px-6 text-left">{student.gender}</td>
                          <td className="py-3 px-6 text-left">{student.id}</td>
                        </tr>
                       ))}
                        
                         </tbody>
                   </table>
                 </div>
               </div>
           
           



    </div>
  )
}

export default ManageUsers
