import React, { useEffect, useState } from 'react'
import { Button, Modal,message } from 'antd';
import UNInput from '../Components/UNInput';
import UNButton from '../Components/UNButton'
import { addDoc, getDocs, collection, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig/firebase';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

const Courses = () => {
  
  const[courseCode,setCourseCode] = useState("")
  const[courseName,setCourseName] = useState("")
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [courseList,setCourseList] = useState([])

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async() => {
    if(!courseCode || !courseName){
      alert("Fill all the fields!")
    }
    else{
      setConfirmLoading(true);
      await addDoc(collection(db,"courses"),{
        courseCode: courseCode,
        courseName: courseName
      })
      getCourses()
      setConfirmLoading(false)
      setOpen(false)
      message.success("Course Added!")
      setCourseCode("")
      setCourseName("")
    }
    
  }


  const getCourses = async()=>{
    try {
      let coursesArr = []
      const q = query(collection(db, "courses"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        coursesArr.push({ ...doc.data(), id: doc.id })
      })
      setCourseList(coursesArr)
      // console.log(coursesArr)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCourse = async(cid)=>{
    try {
      await deleteDoc(doc(db,"courses",cid))
      getCourses()
      message.success("Course deleted!")
    } catch (error) {
      console.log(error)
    }
  }

 

  const editCourse = async(cid)=>{
    try {
     let a = prompt("Enter Updated Course Name")
     if(!a===""){
      await updateDoc(doc(db,"courses",cid),{
        courseName: a
      })
      getCourses()
      message.success("Course updated!")
     }
     else{
      message.error("please write the course name")
     }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
      getCourses()
  },[])

  return (
    <div>
      <div className='w-full p-3 bg-slate-200 text-xl text-gray-900 flex justify-between rounded-lg font-semibold shadow-md'>
          <h1>Courses</h1>
          <UNButton label={"Register Course"} onClick={showModal}/>
          
        <Modal
          title="Register Course"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
            <UNInput placeholder={"Enter Course Code"} onChange={(e)=>{setCourseCode(e.target.value)}}/>
           <UNInput placeholder={"Enter Course Name"} onChange={(e)=>{setCourseName(e.target.value)}}/>
           
        </Modal>
        
      </div>

      <div>

      <div className="p-6 bg-gray-100 flex justify-center">
        
                 <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
                   <table className="min-w-full table-auto">
                     <thead>
                       <tr className="bg-blue-500 text-white text-sm leading-normal">
                         <th className="py-3 px-6 text-left">Course Code</th>
                         <th className="py-3 px-6 text-left">Course Name</th>
                       </tr>
                     </thead>
                     <tbody className="text-gray-600 text-sm font-light">
                       {courseList.map((course)=>(
                          <tr 
                          className= "border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{course.courseCode}</td>
                          <td className="py-3 px-6 text-left flex justify-between">{course.courseName}
                          <div className='flex gap-2'>
                          <Button color="primary" variant="filled" onClick={()=>{editCourse(course.id)}}><FiEdit3/></Button>
                          <Button color="danger" variant="filled" onClick={()=>{deleteCourse(course.id)}}><FaRegTrashAlt/></Button>  
                          </div></td>
                          
                        </tr>
                       ))}
                        
                         </tbody>
                   </table>
                 </div>
      </div>

      </div>
    </div>
  )
}

export default Courses
