import { AudioRecorder } from 'react-audio-voice-recorder';
import React, { useEffect, useRef, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { IoCallSharp } from "react-icons/io5";
import { customersGrid } from '../data/dummy';
import { Header } from '../components';
import { IoIosAddCircle } from "react-icons/io";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const CallHistory = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const [open, setOpen] = React.useState(false);
  const [clients, setClients] = React.useState([]);
  const fileInputRef = useRef(null);
  const clientref = useRef(0);
  const [customersData, setCustomersData] = useState([]);
  const updatedata = ()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`
    axios.get("api/client").then((e) => {
      setClients(e.data);
    })
    axios.get("api/call-history/").then((e) => {
      setCustomersData(e.data);
    })
  }

  useEffect(() => {
    updatedata()
  }, [])

  const handleButtonClick = () => {
    // Trigger file input click when the button is clicked
    fileInputRef.current.click();
  };

  function saveAudio(selectedFile) {
    const formData = new FormData();
    formData.append('client', clientref.current.value);
    formData.append('audio_file', selectedFile);
    formData.append('employee', localStorage.getItem("id"));

    axios.post('http://localhost:8000/api/call-history/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Call history created:', response.data);
        // Handle successful creation, display success message, etc.
      })
      .catch(error => {
        console.error('There was a problem creating call history:', error);
        // Handle errors, display error message, etc.
      });
      updatedata()

  }

  const addAudioElement = (blob) => {
    console.log(blob)
    var file = new File([blob], "recorded.ogg", {
      type: "audio/ogg; codecs=opus"
    });
    saveAudio(file)
    setOpen(false)
  };

  const handleFileChange = (event) => {
    // Handle file selection here
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    saveAudio(selectedFile)
    setOpen(false);
    // You can perform further operations with the selected file
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Header category="Details" title="Call History" />
        <button
          type="button"
          style={{ color: '#7ED31D', backgroundColor: '#D3F6AB' }}
          className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl absolute top-12 right-16"
        >
          <IoCallSharp />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 300, borderRadius: '10px', height: 300 }} className=" flex flex-col items-center justify-evenly ">
            <div>
              <lable>Client</lable>
            <select name="client" ref={clientref} className='py-1 px-3 rounded-lg mx-3 border-0 min-w-[100px] text-center'>
                  {clients.map((e) => (<option className=' outline-none' value={e.id}>{e.username}</option>))}
                </select>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                  // autoGainControl,
                  // channelCount,
                  // deviceId,
                  // groupId,
                  // sampleRate,
                  // sampleSize,
                }}
                downloadFileExtension="wav"
                onNotAllowedOrFound={(err) => console.table(err)}
                mediaRecorderOptions={{
                  audioBitsPerSecond: 128000,

                }}
              // showVisualizer={true}
              />
              <div className=' mb-1'>OR</div>
              <div className=' flex'>

               
                <button
                  type="button"
                  style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                  className="text-md opacity-0.9 p-2 hover:drop-shadow-xl  rounded-full"
                  onClick={handleButtonClick}
                >
                  Upload File
                </button>
              </div>
            </div>

          </Box>
        </Modal>
        <button
          type="button"
          style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
          className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl absolute top-12 right-44"
          onClick={handleOpen}
        >
          <IoIosAddCircle />
        </button>
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
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default CallHistory;