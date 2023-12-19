import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CircularProgress from './CircularProgress';
import 'react-circular-progressbar/dist/styles.css';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { grid } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios';


const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Performance = () => {
  const { currentColor, currentMode } = useStateContext();
  const percentage = (4.7/5.0) * 100
  const toolbarOptions = ['Search'];
  const [employeesData, setEmployeesData] = useState([]);

  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`
    axios.get("api/analysis").then((e) => {
      setEmployeesData(e.data)
    })
  },[])
  return (
    
    <div className="mt-12">

<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Analysis" title="Calls Performance" />
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {grid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
    <h1 className='text-white text-5xl mx-20 my-10'>Benjamin's Performance.</h1>
      <div className="flex gap-10 flex-wrap justify-center">
        
        <div>
          

          
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          
          <div className="m-5 w-72 md:w-400">
          <div
            className=" rounded-2xl w-72 md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Montly Performance</p>

              
            </div>

            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
              
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">187 Calls</p>
              <p className="text-gray-400">Weekly report</p>
            </div>

            <div className="w-40">
              <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={false} height="160px" />
            </div>
          </div>
          </div>
          
        </div>

        
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Customer Satisfaction</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3 m-3 ">
          <div className="flex justify-between">
          <div>
                <p className="text-2xl text-white font-semibold my-8">Overall Score</p>
               
              </div>
          </div>

         <div className="mt-5 px-20 pb-6">
    <CircularProgress size={200} strokeWidth={15} percentage={75} color={currentColor}/>
              </div>
              <div></div>
<div></div>
<div></div>
<div></div>
<div></div>

        </div>
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3 m-3 ">
          <div className="flex justify-between">
          <div>
                <p className="text-2xl text-white font-semibold my-8">Average Product Rating</p>
               
              </div>
          </div>

         <div className="mt-5 px-20 pb-6">
    <CircularProgress size={200} strokeWidth={15} percentage={75} color={currentColor}/>
              </div>

              <div></div>
<div></div>
<div></div>
<div></div>
<div></div>
        </div>
        <div className=" md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3 m-3 ">
          <div className="flex justify-between">
          <div>
                <p className="text-2xl text-white font-semibold my-8">Average Employee Rating</p>
               
              </div>
          </div>

         <div className="mt-5 px-20 pb-6">
    <CircularProgress size={200} strokeWidth={15} percentage={75} color={currentColor}/>
              </div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
