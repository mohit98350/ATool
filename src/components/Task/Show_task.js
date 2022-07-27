import React from 'react'
import { useEffect, useState } from 'react'
import { StyledEngineProvider, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Navbar from '../Navbar/Navbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from '@material-ui/core';


const Show_task = () => {

  const [loadtask, setloadtask] = useState();
  const [open, setOpen] = useState(false);
  const [formdata, setformdata] = useState()
  const [value, setValue] = useState();
  const [task_id,setTask_id] = useState()
  const user = localStorage.getItem('username')
  // const[bool_value,setbool_value]=useState()

  const history = useHistory()
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



  const editstatus = async (e) => {
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${task_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify({

            "data": {
                "status": "completed",
                

            }
        })



    })
    const { data } = await res.json()
    // console.log(data.attributes)
    // dispatch(add_project(data.attributes))
    if (res.status == 200) {
        toast.success("Successfully added Project")
    }

    handleClose()
    history.go(0)
    // }

}

  const handleform = async (id) => {
    console.log("clicked from.....", id)
    setTask_id(id)
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}/?populate=*`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`

      }
    })
    const { data } = await res.json()
    console.log({ data }.data)
    setformdata({ data }.data)
    // dispatch(add_project({ data }.data))
    console.log("clicked")
  }

const handlesave = async()=>{
  const token = localStorage.getItem('jwt')
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/task-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`

    },

    body: JSON.stringify({

      "data": {
        "answer":value,
        "answered_at":new Date(),
        "task":[task_id],
       
        

      }
    })
   


  })
  const { data } = await res.json()
  console.log({ data }.data)
  handleClose()
  editstatus()
}


  const handleChange = (event) => {
  
    setValue(event.target.value);
    console.log(event.target)
    const date=new Date()
    console.log(date)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    Fetchtask()
  }, [])

  const theme = useTheme();
  if (loadtask) {


    return (




      <div className='show_tasks'>
        {/* <Navbar /> */}
        {/* <Task_header/> */}
        <div className='card'>


          {loadtask && loadtask.map((task) =>


            <Card onClick={() => {
              handleform(task.id);
              setOpen(true)
            }}
              key={task.id} sx={{
                display: 'flex',
                width: "100%",
                height:'120px',
                textAlign: 'center',
                // margin: 'auto',
                padding: '10px',
                marginBottom: '25px',
                justifyContent: 'space-between',
                cursor: 'pointer'

              }}>
              <CardMedia
                component="img"
                sx={{ width: 180}}
                image={`${process.env.REACT_APP_BACKEND_URL}${task.attributes.task_image.data[0].attributes.formats.medium.url}`}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                <CardContent sx={{ flex: '1.0 auto' }}>

                  <Typography style={{marginTop:'-15px'}}component="div" variant="h6">
                    {task.attributes.task_form.data.attributes.form_title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    <span style={{color:'black'}}>Status :</span> <span>{task.attributes.status}</span>
                  </Typography>
                  <Typography  variant="subtitle1" color="text.secondary" component="div">
                  <span style={{color:'black'}}>Task-type :</span> {task.attributes.task_form.data.attributes.task_type}
                  </Typography>
                  <Typography  variant="subtitle1" color="text.secondary" component="div">
                  <span style={{color:'black'}}>Created by:</span> {task.attributes.createdby}
                  </Typography>
                  {/* <Button onClick={handleform(task.id)}>click me</Button> */}
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                </Box>
              </Box>

            </Card>




          )}

          {formdata ?
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{textAlign:'center'}}>{formdata.attributes.task_form.data.attributes.form_title}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
                 
                </DialogContentText>
                <FormGroup className="form" noValidate autoComplete="off">
                 

                  <div className="imagePreview">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}${formdata.attributes.task_image.data[0].attributes.formats.medium.url}`} />
                  </div>






                </FormGroup>
                <DialogContentText style={{textAlign:'center'}}>

                  {formdata.attributes.task_statement_text}
                </DialogContentText>
                <DialogContentText >
                  {formdata.attributes.task_form.data.attributes.task_type === 'mcq' ?
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                    onChange={handleChange}
                    >
                      <FormControlLabel style={{justifyContent:'center'}} value={formdata.attributes.task_form.data.attributes.option1}
                      control={<Radio />} label={formdata.attributes.task_form.data.attributes.option1} />
                      <FormControlLabel style={{justifyContent:'center'}} value={formdata.attributes.task_form.data.attributes.option2}
                     control={<Radio />} label={formdata.attributes.task_form.data.attributes.option2} />
                      <FormControlLabel style={{justifyContent:'center'}} value={formdata.attributes.task_form.data.attributes.option3}
                       control={<Radio />} label={formdata.attributes.task_form.data.attributes.option3}  />
                      <FormControlLabel style={{justifyContent:'center'}} value={formdata.attributes.task_form.data.attributes.option4}
                       control={<Radio />} label={formdata.attributes.task_form.data.attributes.option4} />
                    </RadioGroup>
                    : null}

                  {formdata.attributes.task_form.data.attributes.task_type === 'text' ?
                    <>
                      {formdata.attributes.task_form.data.attributes.task_statement_text}
                    </>
                    : null}

                  {formdata.attributes.task_form.data.attributes.task_type === 'boolean' ?
                    <>
                     <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                    onChange={handleChange}
                    >
                      <FormControlLabel style={{justifyContent:'center'}}value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel style={{justifyContent:'center'}}value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    </>
                    : null}

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handlesave}>Save</Button>
              </DialogActions>
            </Dialog>
            : ''}
        </div>

      </div>




    )
    
  }
  

}

export default Show_task
