import * as React from 'react';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Alerts({ message, type }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide the alert after 2 seconds
    }, 1000);

    // Cleanup the timer when the component unmounts or when `type` or `message` changes
    return () => clearTimeout(timer);
  }, [type, message]);

  return (
    <div>
      {visible && (
        <div className='absolute top-24 end-5 w-1/3 transition-all duration-300 ease-in-out delay-300'>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {type === 'success' && (
              <Alert variant="filled" severity="success">
                {message}
              </Alert>
            )}

            {type === 'error' && (
              <Alert variant="filled" severity="error">
                {message}
              </Alert>
            )}
          </Stack>
        </div>
      )}
    </div>
  );
}
