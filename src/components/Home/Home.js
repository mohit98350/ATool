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
        padding: "17px 36px",
        fontSize: "17px",
        textDecoration:'none',
        border:'none',
        cursor:'pointer'
    }}
    >Connect to {props.providerName}</button>
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
    <div  data-aos="flip-left" className=''>
  
  
   {/* <img src='https://www.juit.ac.in/front/images/banner2.jpg'/> */}
    <Grid>
    <img className='banner' src=""/>
      <Paper className='paper' elevation={5} style={paperStyle}>
        <Grid>
        { <img className='logo' src="../logo.jpg" alt=""></img> }
        </Grid>
       
        <Box sx={{ marginLeft:'45px',marginTop:'-20px' }}> 
        {buttons}
    
        </Box>
        
       

      
      </Paper>
      
    </Grid>
    
    
    </div>
 

  )
  //  <p>{text}</p>
  //   {buttons} 
  
}

export default Home;
