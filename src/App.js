import logo from './logo.svg';
import './App.css';
import axios from "axios";
import QRCode from "react-qr-code";
import React from 'react';
import copy from "copy-to-clipboard"; 
import logomain from "./images/logomain.png"
import FTIcon from "react-file-type-icons";
function App() {
  const [file,setfile]=React.useState();
  const [downlink,setdownlink]=React.useState("Try Choosing File");
  const [viewlink,setviewlink]=React.useState("Try Choosing File");
  const [copy1,setcopy1]=React.useState("Copy");
  const [copy2,setcopy2]=React.useState("Copy");
  function handlecopy1(){
    setcopy1("Copied")
    copy(downlink)


  }
  function handlecopy2(){
    setcopy2("Copied")
    copy(viewlink)


  }
  function getviewlink(){
    setviewlink(link_data2);
  }

  function getdownlink(){
    setdownlink(link_data1)
    

  }
  const [link_data1,setlink_data1]=React.useState("Try Choosing File");
  const [link_data2,setlink_data2]=React.useState("Try Choosing File");
 console.log(file)
  
  function handlechange(event){
    setfile(event.target.files[0])


  }
  function apicall(){
    var formdata =new FormData();
    formdata.append("file",file);
  
    axios.post("https://qr-access-backend.herokuapp.com/upload",formdata)
    .then(response=>{
      setlink_data1(response.data.webContentLink)
      setlink_data2(response.data.webViewLink)
    })
    .catch((err)=>{console.log(err)})
    setcopy1("Copy");
    setcopy2("Copy");
  }
  
  
  return (
    <div>
    
    <div className='box'>
    <div className='left-part'>
    {file && 
      <div className='file-preview'>
      <FTIcon fileName={file.name} size="5em" color="red"/>
      
      <div className='file-name'>
      <span>{file.name}</span>
      </div>
      </div>
      
    }
    
    <div className='buttons'>
    <input type="file" onChange={handlechange} id="choose"></input>
    <label htmlFor='choose' className='label'>Select Files</label>
    </div>

    </div>
    <div className='right-part'>
    <div style={{ background: 'white', padding: '16px' }} className="qr-code">
     <QRCode value={link_data1}  /><br/>
     <button onClick={apicall} className="get-qr">GET QR</button>
    </div>

    </div>
    <div className='get-link1'>
    <button  onClick={getdownlink} className="btn-1">Get Download Link</button>
    <input type="text" value={downlink} readOnly  ></input>
    <button onClick={handlecopy1} >{copy1}</button>
  
    </div>
    <div className='get-link2'>
    <button  onClick={getviewlink} className="btn-1">Get View Link</button>
    <input type="text" value={viewlink} readOnly  ></input>
    <button onClick={handlecopy2} >{copy2}</button>
  
    </div>
    
    </div>




    <div className='footer'>
    <small>2022 © | made in ❤️ with react by techiecoder</small>

    </div>
  </div>
  );
}

export default App;
