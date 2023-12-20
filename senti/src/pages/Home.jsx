import React from 'react';
import axios from 'axios';
import avatar from '../data/avatar.jpg';
import { MdOutlineWork, MdDesktopMac } from "react-icons/md";
import { CgArrowTopRight } from "react-icons/cg";


const Home = () => {
  const item = [
    {
      icon: <MdDesktopMac />,
      title: 'Team Leader',
      desc: 'Steve Smith',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
    {
      icon: <CgArrowTopRight />,
      title: 'Best Review',
      desc: '4.8',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
    },
    {
      icon: <MdOutlineWork />,
      title: 'Roles',
      desc: 'Customer Care Service',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
    },
  ];
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          
            <div style={{ width: '800px', height: '400px' }} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl ">
              
            <div className="flex items-center p-4">
              <img
                className="rounded-full w-20 h-20"
                src={avatar}
                alt="user-profile"
              />
              <div className="ml-4">
                <h2 className='text-3xl'>Welcome {localStorage.getItem("username")}</h2>
                <p className="text-sm text-gray-400 mt-1">{localStorage.getItem("post")==="E"?"Employee":"Manager"}</p>
              </div>
            </div>

            <div className="flex gap-5 border-b-1 border-color p-4">
            <button
              type="button"
              style={{ color: item[0].iconColor, backgroundColor: item[0].iconBg }}
              className=" text-xl rounded-lg p-3"
            >
              {item[0].icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item[0].title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item[0].desc} </p>
            </div>
          </div>

          <div className="flex gap-5 border-b-1 border-color p-4">
            <button
              type="button"
              style={{ color: item[1].iconColor, backgroundColor: item[1].iconBg }}
              className=" text-xl rounded-lg p-3"
            >
              {item[1].icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item[1].title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item[1].desc} </p>
            </div>
          </div>

          <div className="flex gap-5  p-4 ">
            <button
              type="button"
              style={{ color: item[2].iconColor, backgroundColor: item[2].iconBg }}
              className=" text-xl rounded-lg p-3"
            >
              {item[2].icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item[2].title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item[2].desc} </p>
            </div>
          </div>

            
          

            </div>
         
        </div>
      </div>

      
        </div>
  )
}

export default Home;