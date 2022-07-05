import React from 'react'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Navbar from '../Navbar/Navbar';


const Show_task = () => {

  const [loadtask, setloadtask] = useState();
  const Fetchtask = async () => {
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks?populate=*`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`

      }
    })
    const { data } = await res.json()
    console.log({ data }.data)
    setloadtask({ data }.data)
    console.log(loadtask)
    // dispatch(add_project({ data }.data))
    console.log("clicked")



  }
  useEffect(() => {
    Fetchtask()
  }, [])
  const theme = useTheme();
  if (loadtask) {


    return (




      <div className=''>
<Navbar/>
      <div className='card'>

    <Link>
        {loadtask && loadtask.map((task, key) =>

         
          <Card sx={{
            display: 'flex',
            width: "25%",
            textAlign: 'center',
           margin:'auto',
            padding: '10px',
            marginBottom:'25px',
            justifyContent:'space-between'
          }}>
              <CardMedia
              component="img"
              sx={{ width: 75 }}
              image="../test.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            
              <CardContent sx={{ flex: '1.0 auto' }}>
             
                <Typography component="div" variant="h6">
               helloooo
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

              </Box>
            </Box>
          
          </Card>




        )}
        </Link>
  </div>

      </div>


    )
  }

}

export default Show_task
