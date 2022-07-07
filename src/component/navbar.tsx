import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Beer
          </Typography>
            <Button>
                <Link to='/' style={{ textDecoration:'none' }}>List Beers</Link>
            </Button>
            <Button>
                <Link to='/favorite' style={{ textDecoration:'none' }}>Favorite</Link>
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
