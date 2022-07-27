import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_project } from '../../store/actions';

const Task_body = () => {

    const { id } = useParams()
    const [showcreate_task, setshowcreate_task] = useState(false);
    const dispatch = useDispatch();
    const user = localStorage.getItem('username')
    const { project: { data } } = useSelector(state => state.project)
    const fetch_pro = async () => {
        const token = localStorage.getItem('jwt')
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${id}/?populate=*`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
    
          }
        })
        const { data } = await res.json()
        console.log({ data})
        // setp_data({data})
        dispatch(fetch_project({ data }))
    
    
    
    
      }
      const handleCreate_task = () => {
        setshowcreate_task(true);
      }

      
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
    return (

       <>
      
{/* 
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

          </div> */}
      
        

            <div className='task_items' >

                <div>

                    <Card key={data.id} className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}

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
       
        </>
    )
}

export default Task_body