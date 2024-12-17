import React, { useState,useEffect } from 'react'
import { getDocs,collection,query, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig/firebase';
import { Button,Modal,message } from 'antd';
import UNButton from '../Components/UNButton';
import UNInput from '../Components/UNInput';
import { FaRegTrashAlt } from "react-icons/fa";

const Grades = () => {
  const[marksList,setMarksList] = useState([]);
  const[marks, setMarks] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const[stdEmail,setStdEmail] = useState("");
  const[uid,setUid] = useState("")
  

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async() => {
    try {
      setConfirmLoading(true);
      if(marks>100){
        alert("Marks can't be higher than 100")
        throw error
      }
      
      let gradeValue = "";
    if (marks > 70) {
      gradeValue = "A";
    } else if (marks >= 59) {
      gradeValue = "B";
    } else if (marks >= 40) {
      gradeValue = "C";
    } else {
      gradeValue = "Fail";
    }
      
      await setDoc(doc(db,"marks",uid),{
        stdName: stdEmail,
        marks: marks,
        grade: gradeValue
      })
      getMarks()
      setConfirmLoading(false)
      setOpen(false)
      message.success("Marks Added!")
    } catch (error) {
      console.log(error)
    }
  }




  const getMarks = async()=>{
    try {
      let marksArr = []
      const q = query(collection(db, "marks"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        marksArr.push({ ...doc.data(), id: doc.id })}
      )
      setMarksList(marksArr)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMarks = async(marksId)=>{
    try {
      await deleteDoc(doc(db,"marks",marksId))
      getMarks()
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    getMarks()
  }, [])

  return (
    <div>
      <div className='w-full p-3 bg-slate-200 text-xl text-gray-900 flex justify-between rounded-lg font-semibold shadow-md'>
          <h1>Grades</h1>
          <UNButton label={"Add Marks"} onClick={showModal}/>

          <Modal
          title="Add Marks"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <h1 className='font-bold'>Student's Id</h1>
          <UNInput placeholder={"Enter student's Id"} onChange={(e)=>{setUid(e.target.value)}}/>
          <h1 className='font-bold'>Student's Name</h1>
          <UNInput placeholder={"Enter student's name"} onChange={(e)=>{setStdEmail(e.target.value)}}/>
          <h1 className='font-bold'>Obtained Marks</h1>
          <UNInput placeholder={"Enter obtained marks out off 100"} onChange={(e)=>{setMarks(Number(e.target.value))}}/>
          
        </Modal>
      </div>

      <div className="p-6 bg-gray-100 flex justify-center">
                 <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
                   <table className="min-w-full table-auto">
                     <thead>
                       <tr className="bg-blue-500 text-white text-sm leading-normal">
                         <th className="py-3 px-6 text-left">Student Name</th>
                         <th className="py-3 px-6 text-left">Obtained Marks</th>
                         <th className="py-3 px-6 text-left">Grade</th>
                       </tr>
                     </thead>
                     <tbody className="text-gray-600 text-sm font-light">
                       {marksList.map((stdMarks)=>(
                          <tr key={stdMarks.id}
                          className= "border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{stdMarks.stdName}</td>
                          <td className="py-3 px-6 text-left">{stdMarks.marks}</td>
                          <td className="py-3 px-6 text-left flex justify-between">{stdMarks.grade}<Button color="danger" variant="filled" onClick={()=>{deleteMarks(stdMarks.id)}}><FaRegTrashAlt/></Button></td>
                          
                        </tr>
                       ))}
                        
                         </tbody>                    
                    
                   </table>
                 </div>
               </div>

    </div>
  )
}

export default Grades
