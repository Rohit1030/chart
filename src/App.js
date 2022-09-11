import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chart from './components/Chart/Chart';
import './App.css';

function App() {
  const [_select, set_select] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({});

  let strikeArray = [];
  let calloiArray = [];
  let putoiArray = [];
  let modifiedData = [];

  if(
    data.hasOwnProperty('strike') && 
    data.hasOwnProperty('calloi') && 
    data.hasOwnProperty('putoi')
  ){
    strikeArray = [...data.strike];
    calloiArray = [...data.calloi];
    putoiArray = [...data.putoi];

    for(let i=0; i<strikeArray.length; i++){
      let singledata = {
        strike: strikeArray[i],
        calloi: calloiArray[i],
        putoi: putoiArray[i]
      }
      modifiedData.push(singledata);
    }
  }

  const handleChange = (event) => {
    set_select(event.target.value);
  };

  function handleClick(){
    setIsLoading(true);
    fetch(" https://docker.api.srifintech.com/testassignment", {
    method: "POST",
    body: JSON.stringify({
      ticker : _select
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then(response => {
      setIsLoading(false);
      return response.json()
    })
    .then(json => setData(json));
  }
  
  return (
    <div className="App">
      <Box sx={{ width: '17%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={_select}
            label="Select"
            onChange={handleChange}
          >
            <MenuItem value="RELIANCE">RELIANCE</MenuItem>
            <MenuItem value="SBIN">SBIN</MenuItem>
            <MenuItem value="INFY">INFY</MenuItem>
          </Select>
        </FormControl>
        <button className='submit' onClick={handleClick} disabled={_select===""}>{isLoading ? 'Loading...': 'Submit'}</button>
      </Box>
      {data.hasOwnProperty('strike') && <Chart data={modifiedData} />}
    </div>
  );
}

export default App;
