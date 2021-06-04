import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const Logout = () => {
    //promises
    const history = useHistory();
    useEffect(()=>{
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res)=>{
            history.push('/login', {replace: true})
            if(!res.status === 200){
                throw new Error(res.error);
            }
        }).catch((err)=>{
            console.log(err);
        })
       
    })
    return (
        <>
            <h1>Logout</h1>  
        </>
    )
}

export default Logout
