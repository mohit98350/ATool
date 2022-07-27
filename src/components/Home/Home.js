import React, { useState } from 'react';
import { Grid,Paper ,Box} from "@material-ui/core"


// const backendUrl = 'http://localhost:1337';

const providersNames = [
  'auth0',
];

const LoginButton = (props) => <a href={`${process.env.REACT_APP_BACKEND_URL}/api/connect/${props.providerName}`}>
    <button style={{
        borderRadius: 35,
        color:'white',
        backgroundColor: "grey",
        padding: "25px 36px",
        fontSize: "17px",
        marginLeft:'35px',
        textDecoration:'none',
        border:'none',
        cursor:'pointer'
    }}
    >LOG IN</button>
  </a>;



const LogoutButton = (props) => <button style={{
  borderRadius: 35,
  color:'white',
  backgroundColor: "grey",
  marginLeft:'80px',
  padding: "20px 36px",
  fontSize: "17px",
  textDecoration:'none',
  border:'none',
  cursor:'pointer'
}}

onClick={props.onClick}>Logout</button>;

const Home = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));
  const paperStyle = {
    padding: 5,
    height: '17rem',
    width: 370,
    margin: '300px auto',
   
  }
 

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };

  let buttons;
  if (isLogged) {
    buttons = <LogoutButton onClick={logout} />;
  } else {
    buttons = <ul style={{ listStyleType: 'none' }}>
      {providersNames.map((providerName, i) => <li key={providerName}>
        <LoginButton providerName={providerName}/>
        </li>)}
    </ul>;
  }

  

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
  }

  return (
    <div>
  

  <Grid  container spacing={1}  >
        <Grid  item  md={1}>

        
        </Grid>

        <Grid  className="style_grid" item  md={5}>
    -
        <img className='grid_img' src="../delivery1.jpg"/>
      </Grid>
      <Grid item md={5}>
      <Paper className='paper' elevation={2} style={paperStyle}>
      
        <img className='logo' src="../atool.png" alt=""></img> 
        
       
        <Box sx={{ marginLeft:'45px',marginTop:'-5px' }}> 
        {buttons}
    
        </Box>
        
       

      
      </Paper>
      </Grid>
      <Grid  item  md={1}>

        
        </Grid>
  
   {/* <img src='https://www.juit.ac.in/front/images/banner2.jpg'/> */}
    {/* <Grid>
    <img className='banner' src="https://www.juit.ac.in/front/images/banner.jpg"/>
      <Paper className='paper' elevation={5} style={paperStyle}>
        <Grid>
        { <img className='logo' src="../atool.png" alt=""></img> }
        </Grid>
       
        <Box sx={{ marginLeft:'45px',marginTop:'-20px' }}> 
        {buttons}
    
        </Box>
        
       

      
      </Paper>
      
    </Grid> */}


    
    /</Grid>
    </div>
 

  )
  
}

export default Home;
