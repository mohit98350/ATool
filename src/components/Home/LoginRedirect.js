import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// const backendUrl = 'http://localhost:1337';

const LoginRedirect = (props) => {
  const [text, setText] = useState('');
  const[load , setLoad]=useState(false);
  const location = useLocation();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    console.log(location.search)

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/${params.providerName}/callback${location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        console.log(res)
        console.log(location.search)
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        console.log(res)
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        setLoad(true)
        setText('You have been successfully logged in. You will be redirected in a few seconds...');
    
        setTimeout(() => history.push('/home'), 3000); 
      
      })
      .catch(err => {
        console.log(err);
        setText('An error occurred, please see the developer console.')
      });
  }, [history, location.search, params.providerName]);

  return (
    <div className=''>
      {/* <p>{text}</p> */}
  {load ?  <Box sx={{ display: 'flex'}}>
  <CircularProgress  
        size={70}
        style={{marginLeft: '50%',marginTop:'20%'}}/>
</Box>:''}
    </div>
  
  )
};

export default LoginRedirect;
