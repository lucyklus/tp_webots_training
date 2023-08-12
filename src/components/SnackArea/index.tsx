import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useBuild } from '../../hooks/useBuild';

export const SnackArea: React.FC = () => {
  const build = useBuild();

  return (
    <>
      <Snackbar
        open={build.error !== null}
        autoHideDuration={6000}
        onClose={() => build.updateContext({ error: null })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => build.updateContext({ error: null })} severity='error'>
          { build.error }
        </Alert>
      </Snackbar>

      <Snackbar
        open={build.success !== null}
        autoHideDuration={6000}
        onClose={() => build.updateContext({ success: null })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => build.updateContext({ success: null })} severity='success'>
          { build.success }
        </Alert>
      </Snackbar>
    </>
  )
}
