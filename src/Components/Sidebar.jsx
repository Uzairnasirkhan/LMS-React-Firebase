import React, { useState } from "react";
import {
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { MdLibraryBooks } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { PiUserSquareFill } from "react-icons/pi";
import { Drawer } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig/firebase";
import { GiGraduateCap } from "react-icons/gi";

const Sidebar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate()

  const logoutUser = async()=>{
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const SidebarContent = () => (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white flex flex-col h-screen fixed top-0 left-0">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-blue-500 mx-2">
        <h1 className="text-lg font-bold tracking-wide">
          <div className="flex justify-center items-center mb-2 mt-2">
                      <h1 className="text-2xl text-white flex items-center gap-2"><GiGraduateCap className="text-3xl"/>EduTrack</h1>
                    </div>
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1">
        <Link
          className="px-4 py-3 hover:bg-blue-500 cursor-pointer flex items-center"
          to={"users"}
        >
          <PiUserSquareFill className="mr-3" />
          <span>Students</span>
        </Link>
        <Link
          className="px-4 py-3 hover:bg-blue-500 cursor-pointer flex items-center"
          to={"courses"}
        >
          <MdLibraryBooks className="mr-3" />
          <span>Courses</span>
        </Link>
        <Link
          className="px-4 py-3 hover:bg-blue-500 cursor-pointer flex items-center"
          to={"grades"}
        >
          <FaTrophy className="mr-3" />
          <span>Grades</span>
        </Link>
      </ul>

      {/* Footer Section */}
      <div className="h-16 border-t border-blue-700 flex items-center justify-center">
        <button className="text-sm text-white hover:underline flex items-center hover:text-red-600"
        onClick={logoutUser}>
          <LogoutOutlined className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Hamburger Menu for Mobile */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden text-blue-800"
        onClick={toggleMobileMenu}
      >
        <MenuOutlined className="text-2xl" />
      </button>

      {/* Sidebar for Larger Screens */}
      <div className="hidden md:flex">{SidebarContent()}</div>

      {/* Drawer for Mobile Screens */}
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={toggleMobileMenu}
        open={isMobileMenuOpen}
        bodyStyle={{ padding: 0 }}
      >
        {SidebarContent()}
      </Drawer>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6 ml-0 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
