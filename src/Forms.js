import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
// import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from 'axios';

function Forms(props) {

    
    const [nameOfEvent, setNameOfEvent] = useState('');
    const [date, setDate] = useState(null);

    const selectNameOfEventHandler = (event) => {
        console.log(event.target.value);
        setNameOfEvent(event.target.value);
    }

    const [incident, setIncident] = useState('');
    const setIncidentHandler = (event) => {
        console.log(event.target.value);
        setIncident(event.target.value);
    }

    const [latitude, setLatitude] = useState({latitudeValue: null, top: null});
    const setLatitudeHandler = (event) => {
        console.log(event.target.value);
        setLatitude({...latitude, latitudeValue: event.target.value});
    }
    const setTopHandler = (event) => {
        console.log(event.target.value);
        setLatitude({...latitude, top: event.target.value});
    }

    const [longitude, setLongitude] = useState({longitudeValue: '', width: ''});
    const setLongitudeHandler = (event) => {
        console.log(event.target.value);
        setLongitude({...longitude, longitudeValue: event.target.value});
    }
    const setWidthHandler = (event) => {
        console.log(event.target.value);
        setLongitude({...longitude, width: event.target.value});
    }

    const [start, setStart] = useState({startHour: 0, startMin: 0});
    const setStartHourHandler = (event) => {
        const input = event.target.value;
        if (/^\d{0,2}$/.test(input) && input <= 24) {
            setStart({...start, startHour: input});
        }
    }
    const setStartMinHandler = (event) => {
        const input = event.target.value;
        if (/^\d{0,2}$/.test(input) && input <= 59) {
            setStart({...start, startMin: input});
        }
    }

    const [end, setEnd] = useState({endHour: 0, endMin: 0});
    const setEndHourHandler = (event) => {
        const input = event.target.value;
        if (/^\d{0,2}$/.test(input) && input <= 24) {
            setEnd({...end, endHour: input});
        }
    }
    const setEndMinHandler = (event) => {
        const input = event.target.value;
        if (/^\d{0,2}$/.test(input) && input <= 59) {
            setEnd({...end, endMin: input});
        }
    }

    const [timeInterval, setTimeInterval] = useState(0);
    const setTimeIntervalHandler = (event) => {
        console.log(event.target.value);
        setTimeInterval(event.target.value);
    }

    const submitHandler = async() => {
        console.log("-----******-----");
        console.log("-----******-----", date);
        // date['$M'] = date['$M']
        const month = Number(date['$M']) + 1;
        const monthP = month < 10 ? '0' + month : month;
        const dateP = date['$D'] < 10 ? '0' + date['$D'] : date['$D'];
        const data = {
            'datasetName': nameOfEvent,
            'fileName': "dt=" + date['$y'] + "-" + monthP + "-" + dateP,
            'latitude':  Number(latitude.latitudeValue.trim()), 
            'latitudeDown': Number(latitude.top.trim()),
            'longitude': Number(longitude.width.trim()),
            'longitudeLeft': Number(longitude.longitudeValue.trim()),
            'startHour': Number(start.startHour),
            'startMin': Number(start.startMin),
            'endHour': Number(end.endHour),
            'endMin': Number(end.endMin),
            'interval': Number(timeInterval)
        }
        // const response = await axios.post(props.api + '', data: {data});
        // axios.get(props.api + '/process_data')
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        
        console.log(data)
        axios({
            method: 'post',
            url: props.api + '/process-data',
            data: data
          })
          .then(response => {
            console.log("check = ", response.data)
            props.getMap(response.data);
          })
    }
    return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}>
                
                <FormControl fullWidth>
                    <FormControl fullWidth style={{marginTop: '25px'}}>
                    <InputLabel id="name-of-event-label">Data</InputLabel>
                    <Select
                        labelId="name-of-event-select-label"
                        id="name-of-event-select"
                        value={nameOfEvent}
                        label="Event"
                        onChange={selectNameOfEventHandler}
                        >
                        <MenuItem value={'Vehicle_Movements'}>Vehicle Movements</MenuItem>
                        <MenuItem value={'Driving_Events'}>Driving events</MenuItem>
                    </Select>
                    </FormControl>

                    <div style={{margin:'20px'}}>
                        <Divider />
                    </div>

                    <FormControl fullWidth>
                    <InputLabel id="incident-label">Incident (optional)</InputLabel>
                    <Select
                        labelId="incident-select-label"
                        id="incident-simple-select"
                        value={incident}
                        label="INCIDENT (optional)"
                        onChange={setIncidentHandler}
                        >
                        <MenuItem value={'ONE'}>INCIDENT #ONE</MenuItem>
                        <MenuItem value={'TWO'}>INCIDENT #TWO</MenuItem>
                        <MenuItem value={'THREE'}>INCIDENT #THREE</MenuItem>
                    </Select>
                    
                
                    <div style={{margin:'10px'}}>
                        <Divider />
                    </div>
                    {/* LATITUDE */}
                    <FormControl fullWidth>
                    <div style={{display: 'inline-flex'}}>
                        <span>
                            <TextField id="outlined-basic" label="Latitude-Up" variant="outlined" autoComplete='off'
                            // value={latitude.latitudeValue}
                            value={latitude.latitudeValue ?? ''}
                            onChange={setLatitudeHandler} />  
                        </span>
                        <span>
                            <TextField id="outlined-basic" label="Latitude-Down" variant="outlined" autoComplete='off'
                            value={latitude.top ?? ''}
                            // value={latitude.top}
                            onChange={setTopHandler} />  
                        </span>
                    </div>
                    </FormControl>


                    {/* LONGITUDE */}
                    <FormControl fullWidth>
                    <div style={{display: 'inline-flex', marginTop: '10px'}}>
                        <span>
                            <TextField id="outlined-basic" label="Longitude-Left" variant="outlined" autoComplete='off'
                            value={longitude.longitudeValue}
                            onChange={setLongitudeHandler} />  
                        </span>
                        <span>
                            <TextField id="outlined-basic" label="Longitude-Right" variant="outlined" autoComplete='off'
                            value={longitude.width}
                            onChange={setWidthHandler} />  
                        </span>
                    </div>
                    </FormControl>

                    <div style={{margin:'10px'}}>
                        <Divider />
                    </div>

                    {/* <div> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                        <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
                        </DemoContainer>
                    </LocalizationProvider>
                    {/* </div> */}
                    <div style={{margin:'10px'}}>
                        <Divider />
                    </div>
                    {/* START */}
                    <FormControl fullWidth>
                    <div style={{display: 'inline-flex'}}>
                        <span>
                            <TextField id="outlined-basic" label="Start Hour" variant="outlined" autoComplete='off'
                            value={start.startHour}
                            onChange={setStartHourHandler}
                            placeholder={"HH"} />  
                        </span>
                        <span>
                            <TextField id="outlined-basic" label="Start Min" variant="outlined" autoComplete='off'
                            value={start.startMin}
                            placeholder={"MM"}
                            onChange={setStartMinHandler} />  
                        </span>
                    </div>
                    </FormControl>

                    {/* END */}
                    <FormControl fullWidth>
                    <div style={{display: 'inline-flex', marginTop: '10px'}}>
                        <span>
                            <TextField id="outlined-basic" label="End Hour" variant="outlined" autoComplete='off'
                            value={end.endHour}
                            placeholder={"HH"}
                            onChange={setEndHourHandler} />  
                        </span>
                        <span>
                            <TextField id="outlined-basic" label="End Min" variant="outlined" autoComplete='off'
                            value={end.endMin}
                            placeholder={"MM"}
                            onChange={setEndMinHandler} />  
                        </span>
                    </div>
                    </FormControl>

                    <div style={{margin:'10px'}}>
                        <Divider />
                    </div>
                    <FormControl fullWidth>
                    <div style={{display: 'inline-flex', marginTop: '10px'}}>
                        <span>
                            <TextField id="outlined-basic" label="Time Interval" variant="outlined" autoComplete='off'
                            value={timeInterval}
                            onChange={setTimeIntervalHandler} />  
                        </span>
                    </div>
                    </FormControl>

                    </FormControl>
                

                    <Button variant="contained" size="medium" onClick = {submitHandler} style={{margin: '20px'}}
                    >
                        Submit
                    </Button>

                </FormControl>

    </Box>
    
    )
}

export default Forms;
/**
 * Latitude 
 * Longitude
 * up
 * right
 * //calculate the 4 coordinates
 * start hour & min
 * end hour & min
 * time interval
 * 
 * 
 */