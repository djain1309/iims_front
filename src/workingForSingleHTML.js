import React, { useState, useEffect } from 'react';
import './App.css';
import Forms from './Forms';
// import axios from 'axios'

function App(props) {
  const [incident, setIncident] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // const [html, setHtml] = useState('MAP');
  const [htmlContent, setHtmlContent] = useState(null);
  // const [htmlList, setHtmlList] = useState(null);


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
    console.log(response)
    setHtmlContent(response)

    // Trying getting multiple files from my system to render on the screen
    /**
     * The files are stored in /home/roman/HtmlFolder this path.
And they can be in any numbers and with any names.
     */
    // axios.get('/home/roman/HtmlFolder')
    //   .then(response => {
    //     setHtmlFiles(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

  }

  return (
    <div className="App">
      <nav style={{background: 'beige', height: "50px", display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
        <b>Integrated Incident Management System (IIMS)</b>
      </nav>
      <div>
        <div style={{float: 'left', width: '60%', height: '1500px'}}>
          {/* <div dangerouslySetInnerHTML={{ __html: html }}></div>
           */}
           {htmlContent && (
          <iframe
            title="Flask-generated HTML"
            srcDoc={htmlContent}
            style={{ width: '100%', height: '800px' }}
        />
      )}
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