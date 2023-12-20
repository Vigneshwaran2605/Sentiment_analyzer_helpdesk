import { AudioRecorder } from 'react-audio-voice-recorder';
import React, { useEffect, useRef, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { IoCallSharp } from "react-icons/io5";
import { customersGrid1 } from '../../data/dummy';
import { Header } from '../../components';
import { IoIosAddCircle } from "react-icons/io";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const Analysis = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const fileInputRef = useRef(null);
  const [customersData, setCustomersData] = useState([]);
  const updatedata = ()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`

    axios.get("api/employee-summary/").then((e) => {
      setCustomersData(e.data?.employees_summary );
    })
  }

  useEffect(() => {
    updatedata()
  }, [])

  const handleButtonClick = () => {
    // Trigger file input click when the button is clicked
    fileInputRef.current.click();
  };

  
 

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Header category="Details" title="Analysis" />
        
      </div>
      <GridComponent
        dataSource={customersData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        // editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid1.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Analysis;