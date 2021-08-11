import React from 'react'
import { Navbar, Footer, UserSettings } from '../components'
const User=()=>{
    return(
        <div className="MenuDiv">
            <Navbar/>
            <UserSettings/>
            <Footer/>
        </div>
    )
}

export default User