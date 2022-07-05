import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import toast, { Toaster } from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { add_project } from '../../store/actions';




const Category = ['image', 'text']
const Status = ['pending', 'draft', 'published', 'deleted']

const HomeView = () => {
  const { data } = useSelector(state => state.project)
  const dispatch = useDispatch();
  const history = useHistory()
  const user = localStorage.getItem('username')


  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("");
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




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // FETCHING PROJECTS....................................................................................

  const Fetchlist = async () => {
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects?populate=*`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`

      }
    })
    const { data } = await res.json()
    console.log({ data })
    // setp_data(data)
    console.log({ data }.data)
    dispatch(add_project({ data }.data))
    console.log("clicked")



  }
  useEffect(() => {
    Fetchlist()
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

  const classes = useStyles();


  // POSTING PROJECT..................................................................................................

  const { title, desc, project_type, status, img, createdby } = formdata


  const handleSubmit = async (e) => {
    console.log("clicked")
    console.log(formdata)
    if (title && desc && project_type && status && !img && createdby) {
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

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects`, {
        method: 'POST',
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
        toast.success("Successfully added Campaign")
      }

      handleClose()
      history.go('/home')
    }
  }


  return (
    <div>
      <Toaster position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            fontSize: "18px",
          },
        }} />
      <Navbar />
      <div className="small_Nav" style={{ backgroundColor: 'whitesmoke', padding: '10px' }}>
        <div className="inside">
          <input type="text" placeholder='Filter by name' className='home_input' id="fname" name="fname" />

          <select className='home_select' name="cars" id="cars" >
            <option selected disabled hidden >Sort by : <span className='dark'>newest first</span></option>
            <option value="saab">newest first</option>
            <option value="opel">oldest first</option>

          </select>
          <select className='home_select' name="cars" id="cars" >
            <option selected disabled hidden >View all : <span className='dark'>campaigns</span></option>
            <option value="saab">all campaigns</option>
            <option value="opel">my campaigns</option>
            <option value="audi">shared with me</option>
          </select>

          < Button style={{
            borderRadius: 20,
            backgroundColor: "#808080",
            width: '210px',
            fontSize: "15px",
            marginLeft: '15rem',
            textTransform: 'lowercase'

          }}

            variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen} >
            new project
          </Button>

        </div>

      </div>

        <div className='project_cont'>

          <div className='project_items'>

          {/* // p_data && p_data.map((data,key)=> */}

            {
              data && data.map((data, key) =>

                <Link to={`/Task_home/${data.id}`}>
                  <Card key={key} className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        // image={`http://localhost:1337${data.attributes.Image.data.attributes.formats.medium.url}`}
                        image={`${process.env.REACT_APP_BACKEND_URL}${data.attributes.Image.data.attributes.formats.medium.url}`}
                        // image='../test.jpg'
                        title={data.attributes.title}

                      />

                      <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {data.attributes.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className="cardaction">
                      <h4>{data.attributes.status}</h4>

                      <h4>{data.attributes.createdby}</h4>



                    </CardActions>
                  </Card>
                </Link>

              )

            }
          </div>
        </div>

    
      <div className='image'>
        <img src="https://groundwork.azavea.com/app/groundwork_geospatial_context_illo.svg" />
        <p style={{ marginLeft: '30px' }}>Start a labeling campaign</p>
      {!data?
        < Button style={{
          borderRadius: 20,
          width: '210px',
          fontSize: "15px",
          marginLeft: '1rem',
          marginTop: '1rem'

        }}

          variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          new project
        </Button>
        :''}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Project</DialogTitle>
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

                {imagePreview ? <img src={imagePreview} /> : ''}
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={setImageUpload}
                id="contained-button-file"
              />
              {!image ?
                <label htmlFor="contained-button-file">

                  <Button variant="contained" color="primary" component="span" style={{
                    marginLeft: '180px'
                  }}>
                    Upload Project Image
                  </Button>

                </label> : ''
              }

              <InputLabel style={{ padding: '8px' }} id="demo-simple-select-standard-label">Status</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="status"
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
              onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>

      </div>

    </div>
  )


}

export default HomeView