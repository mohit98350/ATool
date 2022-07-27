import React,{useState,useEffect} from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { fetch_project } from '../../store/actions';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
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
const pathMap = ['/show_task']

const Task_header = () => {

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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [show_image, setshow_image] = useState(true);
    const [validation, setvalidation] = useState('')
    const [imagePreview, setImagePreview] = useState('');
    const [showcreate_task, setshowcreate_task] = useState(false);
    const [nav_value, setNav_val] = useState(0)

    const history = useHistory();
    const dispatch = useDispatch()
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


  const setActiveLink = e => {
    // const links = document.getElementsByTagName("a");
    const links = document.getElementsByClassName("active");


    Array.from(links).forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
   
  
  };
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
    },[])
    


    return (
        <div className='cont'>
            <div className='task_header' >
                <div className='task_header_title'>
                    <div>
                        {data.attributes.title}
                        <IconButton
                            onClick={() => handleClickOpen()}>
                            <EditIcon style={{ fontSize: 37, color: 'grey', paddingLeft: '7px' }} />
                        </IconButton>
                    </div>
                {/* </div> */}

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
                {/* </div> */}

                {/* <div className="">
                    <div className="task_header_bottom"> 
                   


                           <BottomNavigation
                            value={nav_value}
                            onChange={handle_nav_Change}
                            showLabels
                            className="nav primary"
                        >
                            <BottomNavigationAction label="Overview" />
                            <BottomNavigationAction label="Tasks" />

                        </BottomNavigation> 


                    </div>
                </div> */}
         </div>
         </div> 


    )
}

export default Task_header