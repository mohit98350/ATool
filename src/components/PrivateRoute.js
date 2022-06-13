import React from 'react'
import {Route ,Redirect} from "react-router-dom";

const PrivateRoute = (props) => {
    const user = localStorage.getItem('username');
    return user? <Route path={props.path} exact={props.exact}
     component={props.component}/>:<Redirect to ="/" />
  }

export default PrivateRoute