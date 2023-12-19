import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { CgProfile } from "react-icons/cg";
import { IoCallSharp } from "react-icons/io5";
import { FiCreditCard } from 'react-icons/fi';
import { SlCalender } from "react-icons/sl";
import { logout } from '../utils/access';
import { logWithIn } from '@syncfusion/ej2-react-charts';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const item = [
    {
      icon: <CgProfile />,
      title: 'My Profile',
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
    {
      icon: <IoCallSharp />,
      title: 'Call History',
      desc: 'Past Call History',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
    },
    {
      icon: <FiCreditCard />,
      title: 'My Calender',
      desc: 'To-do and Daily Tasks',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
    },
  ];

  const customFunc=()=>{
    navigate('/profile');
  }

  const callFunc=()=>{
    navigate('/call')
  }

  const calenderFunc=()=>{
    navigate('/calendar')
  }
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {localStorage.getItem("username")} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {localStorage.getItem("post")==="E"?"Employee":"Manager"}  </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {localStorage.getItem("email")} </p>
        </div>
      </div>
      <div>
        
          <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              onClick={() => customFunc()}
              style={{ color: item[0].iconColor, backgroundColor: item[0].iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item[0].icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item[0].title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item[0].desc} </p>
            </div>
          </div>

          <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              onClick={()=> callFunc()}
              style={{ color: item[1].iconColor, backgroundColor: item[1].iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item[1].icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item[1].title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item[1].desc} </p>
            </div>
          </div>

          <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              onClick={()=> calenderFunc()}
              style={{ color: item[2].iconColor, backgroundColor: item[2].iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item[2].icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item[2].title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item[2].desc} </p>
            </div>
          </div>
          
        
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          onClick={logout}
        />
      </div>
    </div>

  );
};

export default UserProfile;
