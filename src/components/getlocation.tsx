import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MyLocationIcon from '@mui/icons-material/MyLocation';


export default function GetCurrentLocation() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" startIcon={<MyLocationIcon />}>
        Near me
      </Button>
    </Stack>
  );
}
