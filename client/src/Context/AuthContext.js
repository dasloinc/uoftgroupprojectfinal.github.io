//our global state

import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../AuthService/AuthService';

export const AuthContext = createContext();

export default ({ children }) => {
    //if the user is logged in
    const [user,setUser] = useState(null);
    //if the user is authenticated
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    //Boolean value to see if it is loaded
    // const [isLoaded,setIsLoaded] = useState(true);



    useEffect(() => {
        // console.log("hello");
        AuthService.isAuthenticated()
        .then(data => {
            console.log(data);
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            // setIsLoaded(false);
        });
    },[]);



    return(
        <div>
            {/* {!isLoaded ? <h1>Loading</h1> :  */}
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>
        </div>   
        )          
}
