import React, { useState, useContext ,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TextField from '@mui/material/TextField';
import GetCurrentLocation from './components/getlocation'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { make_json } from './services/make_json'
import Place from './components/place'
import { GlobalState } from "./providers/store";


function App() {
  const [store, setStore] = useContext(GlobalState);
  const places = make_json()

 useEffect(() => {
  console.log(store)
 }, [store])
 

  return (
    <div className="App">
      <header className="App-header">
        <div>Hello</div>
      </header>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
        alignContent="center"
        // alignItems="center"
        justifyContent="center"
        // justifyItems="center"
        sx={{ width: "100%", height: "100%", marginTop: "3rem" }}
      >

        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={1}>
          <Box
            sx={{
              width: 600,
              height: 700,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Stack>

        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={1}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}>
            <TextField id="outlined-basic" label="Search by street" variant="outlined" />
            <GetCurrentLocation></GetCurrentLocation>
          </Stack>

          {places.map((e, index) => {
            return <Place key={index} place={e} />;
          })}

        </Stack>
      </Stack>

    </div>
  );
}

export default App;


