
import React, { useState } from "react";
import { Button, Input, Form, Typography } from "antd";
import {db,auth} from "../config/firebaseConfig/firebase"
import { getDoc ,doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";


const { Title } = Typography;

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState('');
  const navigate = useNavigate() 
  const [loggedUser,setLoggedUser] = useState({})

  const loginHandler  = async()=>{
    try {
      const userLogin = await signInWithEmailAndPassword(auth,email,password)

      const uid = userLogin.user.uid
      // console.log(uid)
      const myDoc = await getDoc(doc(db,"users",uid))
      const userData = myDoc.data()
      // console.log(myDoc.data())
      if (userData) {
        setLoggedUser({ ...userData }); // Update state if needed
        // console.log(userData); // Directly log the fetched data
  
        if (userData.userType === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        console.error("No user data found for the given UID.");
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const onFinish = async (values) => {
    setLoading(true); // Set loading to true when the login process starts
    try {
      await loginHandler(); // Wait for the login process to complete
      
      
    } catch (error) {
      alert("Login failed:", error.message);
    } finally {
      setLoading(false); // Ensure loading is turned off after completion (success or error)
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };


  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-[#f0f4fc]">
      <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-md">
        <div level={3} className="text-center mb-4 font-bold">
          <div className="flex justify-center items-center mb-2">
            <h1 className="text-3xl text-blue-600 flex items-center gap-2"><GiGraduateCap className="text-4xl"/>EduTrack</h1>
          </div>
          <h1 className="text-gray-800 text-2xl">Login</h1>
        </div>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        
      </div>
    </div>
    </div>
  )
}

export default Login
