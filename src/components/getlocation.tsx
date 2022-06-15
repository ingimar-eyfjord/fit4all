import { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { usePosition } from "../services/useposition";
import { GlobalState } from "../providers/store";

// const Child = ({ setValue2 }: { setValue2: React.Dispatch<React.SetStateAction<string>> }) => {

export default function GetCurrentLocation({ setPosition }: { setPosition: React.Dispatch<React.SetStateAction<object>> }) {
  const [isHookActive, setIsHookActive] = useState<boolean>(false);

  // function EnableLocation() {
  //   const pos = usePosition();
  //   // console.log(pos)
  //   setPosition(pos)
  //   return null;
  // }

  useEffect(() => {
    if (isHookActive) {
      const pos = usePosition();
      // console.log(pos)
      setPosition(pos)
    }
  }, [isHookActive]);

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={() => setIsHookActive(!isHookActive)} variant="contained" startIcon={<MyLocationIcon />}>
        Near me
      </Button>
      {/* {isHookActive && <EnableLocation/>} */}
    </Stack>
  );
}
