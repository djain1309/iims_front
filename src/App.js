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
  const [bigScreen, setBigScreen] = useState('');


  const setIncidentHandler = (event) => {
    setIncident(event)
  }

  const setLatitudeHandler = (event) => {
    setLatitude(event)
  }

  const setLongitudeHandler = (event) => {
    setLongitude(event)
  }
  const getMap = (response) => {
    const path = response;
    const pathArray = path.split("@");
  
    Promise.all(pathArray.map(url => axios.get(`${props.host}/get_html_file/`, { params: { url: url } })))
    .then(responses => {
      const htmlContents = responses.map(response => response.data);
      const uniqueHtmlContents = htmlContents.filter(content => !content.startsWith('Error:') && !htmlContent.includes(content));
      setHtmlContent(htmlContent => [...htmlContent, ...uniqueHtmlContents]);
      setBigScreen(uniqueHtmlContents[0]);
    })
    .catch(error => console.error(error));
  };

  const handleMapClick = (key) => {
    console.log("KEY CHECK = ", key)
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
                srcDoc={bigScreen}
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
            <Grid item xs={3} key={index} onClick={() => handleMapClick(content)}
            >
              <iframe
                key={index}
                srcDoc={content}
                title={`HTML file ${index}`}
                width="300"
                height="300"
                frameBorder="0"
                scrolling="no"
                style={{ pointerEvents: "auto" }}
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