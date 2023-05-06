import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Forms from './Forms';
// import axios from 'axios'
// import MapViewer from "./MapViewer"
import { Grid } from '@material-ui/core';

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
    const path = response;
    const pathArray = path.split("@");
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
      } catch (error) {
        console.error(error);
      }
    });
  }

  

  return (
    <div className="App">
      <nav style={{background: 'beige', height: "50px", display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
        <b>Integrated Incident Management System (IIMS)</b>
      </nav>
      <div style={{ float: 'left', width: '60%', height: '1500px' }}>
        <div>
          <Grid item xs={12}>
              <iframe
                srcDoc={htmlContent[0]}
                title={`HTML file`}
                width="1000"
                height="700"
                frameBorder="0"
                scrolling="no"
              />
          </Grid>
          </div>
        <div style={{overflowX: "auto", display: "flex", maxWidth:'100%', margin:"0 0" }}>
          {htmlContent.map((content, index) => (
            <Grid item xs={3} key={index}>
              <iframe
                key={index}
                srcDoc={content}
                title={`HTML file ${index}`}
                width="300"
                height="300"
                frameBorder="0"
                scrolling="no"
                // onClick={() => handleMapClick(map)}
              />
            </Grid>
          ))}
        </div>
      </div>
      <div style={{ float: 'right', width: '40%', height: '695px' }}>
        <Forms
          setIncident={setIncidentHandler}
          setLatitudeHandler={setLatitudeHandler}
          setLongitudeHandler={setLongitudeHandler}
          api={props.host}
          getMap={getMap}
        />
      </div>

      </div>
  );
}

export default App;