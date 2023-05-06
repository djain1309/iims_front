import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';

const MapViewer = (props) => {
  // Initialize the state with an array of maps
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    setMaps(props.maps);
    setSelectedMap(props.maps[0]);
  }, [props.maps]);
  
  const handleMapClick = (map) => {
    setSelectedMap(map);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {/* First map with size 500x200 */}
        {selectedMap && (
          <Grid item xs={12}>
            <Paper style={{ width: "500px", height: "200px" }}>
              <iframe
                src={selectedMap.url}
                title={selectedMap.name}
                width="500"
                height="200"
                frameBorder="0"
                scrolling="no"
              />
            </Paper>
          </Grid>
        )}

        {/* 100x100 maps */}
        {maps && maps.map((map, index) => (
          <Grid item xs={3} key={index}>
            <iframe
              src={map.url}
              title={map.name}
              width="100"
              height="100"
              frameBorder="0"
              scrolling="no"
              onClick={() => handleMapClick(map)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MapViewer;
