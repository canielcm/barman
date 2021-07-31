import React from 'react'
import { Navbar, Footer, MenuBox } from '../components'
const Menu=()=>{
    return(
        <div className="MenuDiv">
            <Navbar/>
            <MenuBox/>
            <Footer/>
        </div>
    )
}

export default Menu