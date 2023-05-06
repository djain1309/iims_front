import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Forms from './Forms';
// import axios from 'axios'

function App(props) {
  const [incident, setIncident] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // const [html, setHtml] = useState('MAP');
  const [htmlContent, setHtmlContent] = useState([]);


  const setIncidentHandler = (event) => {
    setIncident(event)
  }

  const setLatitudeHandler = (event) => {
    setLatitude(event)
  }

  const setLongitudeHandler = (event) => {
    setLongitude(event)
  }

  useEffect(()=> {
    console.log("Inside Effect", incident, latitude, longitude);
  }, [incident, latitude, longitude])


  const getMap = (response) => {
    
    console.log("INSIDE GET MAP")
    
    const path = response;
    console.log("path = ");
    console.log(path);
    const pathArray = path.split("@");
    console.log("pathArray = ");
    console.log(pathArray);
    // axios.get()
    setHtmlContent([])
    pathArray.forEach(async (url) => {
      try {
        setHtmlContent([])

        const response = await axios.get(`${props.host}/get_html_file/`, { params: { url: url } });
        console.log("response.data = ");
        console.log(response.data);
        if (!response.data.startsWith('Error:') && !htmlContent.includes(response.data)) {
          setHtmlContent(htmlContent => [...htmlContent, response.data]);
        }
        // if (!response.data.startsWith('Error:')) {
        //   setHtmlContent(htmlContent => [...htmlContent, response.data]);
        // }
      } catch (error) {
        console.error(error);
      }
      
      // try {
      //   const response = await axios.get(`${props.host}/get_html_file/`, { params: { url: url } });
      //   console.log("response.data = ");
      //   console.log(response.data);
      //   setHtmlContent(htmlContent => [...htmlContent, response.data]);
      // } catch (error) {
      //   console.error(error);
      // }
    });

  }

  return (
    <div className="App">
      <nav style={{background: 'beige', height: "50px", display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
        <b>Integrated Incident Management System (IIMS)</b>
      </nav>
      <div>
        <div style={{float: 'left', width: '60%', height: '1500px'}}>
        {htmlContent.map((content, index) => (
        <iframe
          key={index}
          title={`HTML file ${index}`}
          srcDoc={content}
          width="100%"
          height="500px"
        ></iframe>
      ))}
        </div>
      </div>
      <div>
        <div style={{float: 'right', width: '40%', height: '695px'}}>
        <Forms  setIncident={setIncidentHandler} 
                setLatitudeHandler={setLatitudeHandler}
                setLongitudeHandler={setLongitudeHandler}
                api = {props.host}
                getMap = {getMap}
           /> 

        </div>
      </div>
    </div>
  );
}

export default App;