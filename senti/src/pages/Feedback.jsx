import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { SiUnderarmour } from 'react-icons/si';
import axios from 'axios';


const Feedback = () => {
  const { currentColor } = useStateContext();
  const [data, setData] = useState([]);
  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`
    axios.get("api/employee").then((e) => {
      setData(e.data);
    })
  },[])
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center"></div>
    <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl " style={{width:'700px', height:'450px'}}>
    <form>
      <div className="space-y-12">
      <div className="sm:col-span-4">
          <label htmlFor="username" className="block font-medium leading-6 text-white text-xl pb-4">Employee name</label>
          <div className="mt-2">
           
              
              <select className=' bg-white py-1 px-3 border-2 border-gray-200 rounded-md w-full'>
                {data.map((e)=>(<option key={e.id} value={e.id}>{e.username}</option>))}
              </select>
            
          </div>
        </div> 

        
      </div>
      <div className="sm:col-span-4">
        
        </div>

      <div className="col-span-full">
          <label htmlFor="about" className="block font-medium leading-6 text-white text-xl pb-4 pt-4">Feedback</label>
          <div className="mt-2">
            <textarea id="about" name="about" rows="3" placeholder='Enter Feedback' className="block w-full p-2 bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" className="text-white text-xl pb-4 pt-4 font-semibold leading-6 ">Cancel</button>
    <button type="submit" className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{backgroundColor: currentColor}}>Send</button>
  </div>
    </form>
    </div>
    </div>
    </div>
     
    
  );
};

export default Feedback;