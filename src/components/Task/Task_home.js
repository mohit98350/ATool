import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_project } from '../../store/actions';
import Navbar from '../Navbar/Navbar';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import moment from 'moment';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import toast, { Toaster } from 'react-hot-toast';
import Create_task from './Create_task';
import Task_header from './Task_header';
import Task_body from './Task_body';
import Show_task from './Show_task';



const Category = ['image', 'text']
const Status = ['pending', 'draft', 'published', 'deleted']
const pathMap = ['/show_task']

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
  const [validation, setvalidation] = useState('')
  const [imagePreview, setImagePreview] = useState('');
  const [showcreate_task, setshowcreate_task] = useState(false);
  const [nav_value, setNav_val] = useState(0)
  const [show_task, setshow_task] = useState(false)

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
  const [tasks, setTasks] = useState(0);

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

  const handleCreate_task = () => {
    setshowcreate_task(true);
  }


  const handle_nav_Change = (event, value) => {
    setNav_val(value);
  };

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


  const handlevalidation = (event) => {
    const { myValue } = event.currentTarget.dataset
    console.log(myValue)
    setvalidation(myValue)
    handleCloseUserMenu()
  }

  const count_task = async () => {
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`

      }
    })
    const { data } = await res.json()
    console.log(data.length)
    setTasks(data.length)
    // setp_data({data})





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

  const handleshowtask = (event, newvalue) => {
    console.log(nav_value)
    if (newvalue != nav_value) {
      setNav_val(newvalue)
      setshow_task(!show_task)
    }

  }

  // useEffect(() => {
  //   handleshowtask()
  // }, [nav_value])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch_pro();

  }, [])



  // const useStyles = makeStyles({
  //   root: {
  //     Width: 350,
  //     margin: 20
  //   },
  //   media: {
  //     height: 180,

  //   },
  //   content: {
  //     height: 35,
  //     textAlign: 'center',
  //     color: 'grey'
  //   }
  // });

  // const useStyles = makeStyles(() => ({
  //   root: {
  //     color: "green",
  //     "&$selected": {
  //       color: "red"
  //     }
  //   },
  //   selected: {}
  // }));




  // const classes = useStyles();

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
    count_task();

  }, [data])
  if (data) {

    return (
      <div className='task_cont'>
        <Navbar />
        <Task_header />

        {showcreate_task && <Create_task />}

        {/* <div className=""> */}

        <div className="task_header_bottom">

          <Box
         

          >
            <BottomNavigation
              sx={{

                '& .Mui-selected': {

                  '& .MuiBottomNavigationAction-label': {
                    fontSize: theme => theme.typography.caption,
                    transition: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    lineHeight: '20px',

                  },
                  '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                    // color: theme => theme.palette.secondary.main
                    color: 'blue'
                  }
                }
              }}

              value={nav_value}

              onChange={handleshowtask}
              showLabels
              className="nav primary"
            >
              <BottomNavigationAction style={{ color: 'black', fontWeight: 'bolder' }} label="Overview" />
              <BottomNavigationAction style={{ color: 'black', fontWeight: 'bolder' }} label="Tasks" />

            </BottomNavigation>
          </Box>
        </div>


{!show_task ?

        <div className="small_Nav" style={{ backgroundColor: 'white', paddingTop: '20px',marginLeft:'-45px' }}>
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
                marginLeft: '14rem',
                marginTop: '20px',
                textTransform: 'lowercase'


              }}
              onClick={handleCreate_task}

                variant="contained" >
                Create Task
              </Button>

            </div>

          </div>
      :null}

       
        <div className='task_body'>
          {/* {!show_task ?
            <Task_body />
            : <Show_task />} */}

          {!show_task ?
            <Task_body />
            : <Show_task />}

          <div className='task_item2' >
            <p style={{ color: 'black', fontSize: '20px', fontWeight: '700',marginTop:'40px'}}>Progress</p>
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
                  <div className='task_attributes'>Project Type </div>
                  <div style={{ paddingLeft: '20px' }}>{data.attributes.title}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className='task_attributes'>Number of tasks </div>
                  <div style={{ marginRight: '50px' }}>{tasks}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



    );
  }

}


export default Task_home


