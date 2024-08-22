import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Calendar from './Calendar'; 
import './Calendar.css'


const formatDate = (date) => {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};



const CalendarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'calendar-menu' : undefined;


  return (
    <div>
      <TextField
        variant="outlined"
        label="Select Date"
        value={formatDate(selectedDate)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle calendar" onClick={handleClick}>
                <CalendarMonthOutlinedIcon sx={{ color: '#007bff' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }} 
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            '& .MuiPaper-root': {
             top: '0px !important',
             left:'0 px'
            },
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: -1,  
            bgcolor: '#fff',  
            padding: 0,
           
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: 0,  
              right: 10,
              width: 10,
              height: 10,
              bgcolor: '#fff',  
              transform: 'translateY(50%) rotate(45deg)',
              zIndex: 0,
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)', 
               
            }
          }
        }}
      >
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={(date) => {
            setSelectedDate(date);
            handleClose();
          }}
        />
      </Menu>
    </div>
  );
};

export default CalendarMenu;
