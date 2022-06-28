import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { fetch_project } from '../../store/actions';
import Navbar from '../Navbar/Navbar';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import toast, { Toaster } from 'react-hot-toast';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';



const Category = ['image', 'text']
const Status = ['pending', 'draft', 'published', 'deleted']

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Task_home = () => {
  const { id } = useParams()
  const [image, setImage] = useState(null)
  const [show_image, setshow_image] = useState(true);
  const[validation , setvalidation] = useState('')
  const [imagePreview, setImagePreview] = useState('');
  // const [p_data, setp_data] = useState('hello')

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const user = localStorage.getItem('username')
  const { project: { data } } = useSelector(state => state.project)
  console.log(data)
  const [open, setOpen] = useState(false);

  const [formdata, setFormData] = useState({
    title: '',
    desc: '',
    project_type: '',
    status: '',
    img: image,
    createdby: user,


  })
  const handleChange = name => e => {
    setFormData({ ...formdata, [name]: e.target.value })

  }




  const setImageUpload = (e) => {
    const reader = new FileReader();           // babel javascript class
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files)
    // setImage(e.target.files[0])
    setImage(e.target.files)

  }

  const { title, desc, project_type, status, img, createdby } = formdata


  const handlevalidation = (event)=>{
    const { myValue } = event.currentTarget.dataset
    console.log(myValue)
    setvalidation(myValue)
    handleCloseUserMenu()
  }

  const fetch_pro = async () => {
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${id}/?populate=*`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`

      }
    })
    const { data } = await res.json()
    console.log({ data })
    // setp_data({data})
    dispatch(fetch_project({ data }))




  }

  const deleteproject = async () => {
    console.log("clicked... deleted...")
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`

      }
    })

    const { data } = await res.json()
    console.log({ data })
    // setp_data({data})
    // dispatch(fetch_project({data}))
    history.push('/home')
    if (res.status == 200) {
      toast.success("Successfully deleted project..")
    }


  }
  const editproject = async (e) => {
    console.log("clicked editproject")
    console.log(formdata)
    // if (title && desc && project_type && status && !img && createdby) {
    const token = localStorage.getItem('jwt')

    e.preventDefault();

    const formData = new FormData()

    formData.append('files', image[0])

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`

      },
      body: formData
    })

    const img_data = await response.json()
    const imageId = img_data[0].id

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      },

      body: JSON.stringify({

        "data": {
          "title": title,
          "description": desc,
          "project_type": project_type,
          "status": status,
          "Image": imageId,
          "createdby": createdby

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

  const confirmdelete = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteproject()
        },
        {
          label: 'No',
          // onClick: () => history.go(0)
        }
      ]
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch_pro();
  }, [])


  const useStyles = makeStyles({
    root: {
      Width: 350,
      margin: 20
    },
    media: {
      height: 180,

    },
    content: {
      height: 35,
      textAlign: 'center',
      color: 'grey'
    }
  });


  const setActiveLink = e => {
    // const links = document.getElementsByTagName("a");
    const links = document.getElementsByClassName("active");


    Array.from(links).forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
  };


  const classes = useStyles();

  useEffect(() => {
    
    if (data) {
      setvalidation(data.attributes.status)
      setFormData({
        title: data.attributes.title,
        desc: data.attributes.description,
        project_type: data.attributes.project_type,
        status: data.attributes.status,
        img: image,
        createdby: user


      })
    }
    else {
      console.log("loading...")
    }

  }, [data])
  if (data) {
    
    return (
      <div className='task_cont'>
        <Navbar />
        <div className='task_header'>
          <div className='task_header_title'>
            <div>
              {data.attributes.title}
              <IconButton
                onClick={() => handleClickOpen()}>
                <EditIcon style={{ fontSize: 37, color: 'grey', paddingLeft: '7px' }} />
              </IconButton>
            </div>

            {/* dialog box */}


            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
                </DialogContentText>
                <FormGroup className="form" noValidate autoComplete="off">
                  <TextField
                    autoFocus
                    margin="dense"
                    name='title'
                    value={title}
                    label="Title"
                    type="text"
                    onChange={handleChange('title')}
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    name='desc'
                    value={desc}
                    type="text"
                    onChange={handleChange('desc')}
                    multiline
                    maxRows={4}
                    style={{ width: 550 }}

                  />
                  <InputLabel style={{ padding: '8px' }} id="demo-simple-select-standard-label">Project-Type</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="project_type"
                    value={project_type}
                    onChange={handleChange('project_type')}
                    style={{ padding: '10px' }}
                  >
                    {Category.map((cat) => (
                      <MenuItem
                        key={cat}
                        value={cat}

                      >
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>

                  <div className="imagePreview">
                    {show_image ?
                      <img src={`${process.env.REACT_APP_BACKEND_URL}${data.attributes.Image.data.attributes.formats.medium.url}`} />
                      : ''}

                    {imagePreview ? <img src={imagePreview} /> : ''}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={setImageUpload}
                    id="contained-button-file"
                  />

                  <label htmlFor="contained-button-file">

                    <Button onClick={() => setshow_image(false)} variant="contained" color="primary" component="span" style={{
                      marginLeft: '210px', textTransform: 'lowercase'
                    }}>
                      Edit Image
                    </Button>

                  </label>


                  <InputLabel style={{ padding: '8px' }} id="demo-simple-select-standard-label">Status</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="status"
                    value={status}
                    onChange={handleChange('status')}
                    style={{ padding: '10px' }}
                  >
                    {Status.map((s) => (
                      <MenuItem
                        key={s}
                        value={s}

                      >
                        {s}
                      </MenuItem>
                    ))}
                  </Select>


                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {/* <Button onClick={uploadImage}>Upload</Button> */}
                <Button
                  onClick={editproject}>Edit</Button>
              </DialogActions>
            </Dialog>


            {/* //////////////////////////////////////// dialog box */}
            <div>



              <div className='btn'>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Validate" onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black' }}>
                    <Button style={{
                      padding: '10px 25px',
                      borderRadius: '20px',
                      fontSize: "15px",
                      backgroundColor: 'white',
                      marginLeft: '15px',
                      color: 'black',
                      textTransform: 'lowercase'
                    }}
                      variant="contained"
                      startIcon={<CheckCircleOutlineIcon />}
                    >

                    {validation}
                     </Button>


                  </Tooltip>
                  <Menu
                    sx={{ mt: '45', color: 'black' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >

                    {Status.map((cat) => (
                      <MenuItem
                      data-my-value={cat}
                      onClick={handlevalidation}
                        key={cat}
                        value={cat}

                      >
                        {cat}
                      </MenuItem>
                    ))}






                  </Menu>

                  <IconButton
                    onClick={() => confirmdelete()}>
                    <DeleteForeverIcon style={{ fontSize: 47, color: 'red' }} />
                  </IconButton>
                </Box>




              </div>

            </div>
          </div>
          <div className="">
            <div className="task_header_bottom">
              <a href="#" ><span className="active" onClick={setActiveLink}>Overview</span></a>
              <a href="#" ><span onClick={setActiveLink}>Task</span></a>


            </div>
          </div>


          <div className="small_Nav" style={{ backgroundColor: 'white', paddingTop: '20px' }}>
            <div className="inside">

              <div className='project_type'>
                {data.attributes.project_type}


              </div>

              < Button style={{
                borderRadius: 20,
                backgroundColor: "whitesmoke",
                color: 'black',
                width: '130px',
                fontSize: "15x",
                height: '50px',
                marginLeft: '15rem',
                marginTop: '20px',
                textTransform: 'lowercase'


              }}

                variant="contained" >
                Create Task
              </Button>

            </div>

          </div>

          <div className='task'>

            <div className='task_items'>
              {/* {p_data!='hello'?
     */}
              <div>
                <Card key={data.id} className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      // image={`http://localhost:1337${data.attributes.Image.data.attributes.formats.medium.url}`}
                      image={`${process.env.REACT_APP_BACKEND_URL}${data.attributes.Image.data.attributes.formats.medium.url}`}

                      title={data.attributes.title}

                    />

                    <CardContent className={classes.content}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {data.attributes.title}
                        {/* {p_data.data.attributes.title} */}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="cardaction">
                    <h4>{data.attributes.status}</h4>
                    {/* <h4>{p_data.data.attributes.status}</h4> */}

                    <h4>{data.attributes.createdby}</h4>
                    {/* <h4>{p_data.data.attributes.createdby}</h4> */}



                  </CardActions>
                </Card>
              </div>
              <div className='desc'>
                <div style={{ padding: '20px', fontSize: '20px', fontWeight: '700' }}>
                  Description
                  <div style={{ paddingTop: '30px', opacity: '0.7', color: 'grey' }}>
                    {data.attributes.description}
                  </div>

                </div>

              </div>



            </div>
            <div className='task_item2'>
              <p style={{ color: 'black', fontSize: '20px', fontWeight: '700' }}>Progress</p>
              <div>
                <p>0 <span style={{ opacity: '0.5' }}>out of 1,179 tasks labeled</span></p>
                <Box sx={{ flexGrow: 1 }}>
                  <BorderLinearProgress variant="determinate" value={20} />
                </Box>

              </div>
              <div>
                <p style={{ paddingTop: '20px', fontSize: '20px', fontWeight: '700' }}>Classification</p>
                {data.attributes.project_type}
              </div>
              <div>
                <p style={{ paddingTop: '20px', fontSize: '20px', fontWeight: '700' }}>Details</p>
                <div >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='task_attributes'>Creation Date</div>
                    {moment(data.attributes.createdAt).format("MMM Do YYYY")}
                    <div>


                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='task_attributes'>Project Type</div>
                    <div style={{ paddingRight: '50px' }}>{data.attributes.title}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='task_attributes'>Number of tasks</div>
                    <div style={{ paddingRight: '90px' }}>1799</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div >


    );
  }
  // }
}


export default Task_home


