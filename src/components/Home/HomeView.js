import React from 'react'
import Navbar from '../Navbar/Navbar'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import List from '../LIst/List';
const HomeView = () => {
  return (
    <div>
      <Navbar />
      <div className='image'>
        <img src="https://groundwork.azavea.com/app/groundwork_geospatial_context_illo.svg" />
        <p style={{ marginLeft: '30px' }}>Start a labeling campaign</p>
        < Button style={{
          borderRadius: 20,
          width: '210px',
          fontSize: "15px",
          marginLeft: '1rem',
          marginTop: '1rem'

        }}

          variant="contained" startIcon={<AddIcon />} >
          new campaigns
        </Button>
        <List />

      </div>

    </div>
  )
}

export default HomeView