import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { usePosition } from "../services/useposition";
// const Child = ({ setValue2 }: { setValue2: React.Dispatch<React.SetStateAction<string>> }) => {

export default function GetCurrentLocation() {
  const [isHookActive, setIsHookActive] = useState<boolean>(false);
  function EnableLocation() {
    usePosition();
    return null;
  }
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={() => setIsHookActive(!isHookActive)} variant="contained" startIcon={<MyLocationIcon />}>
        Near me
      </Button>
      {isHookActive && <EnableLocation/>}
    </Stack>
  );
}



