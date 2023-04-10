import React, {useState} from 'react'
import './App.css';
import {MdDashboard} from "react-icons/md"
import {IoIosSettings} from "react-icons/io"
import {AiOutlineTeam} from "react-icons/ai"
import {AiOutlineFileText} from "react-icons/ai"
import {FcAbout} from "react-icons/fc"
import {FaBars} from "react-icons/fa"
import {GiCoffeeBeans} from "react-icons/gi"
import { BsTable } from 'react-icons/bs';
import { NavLink } from 'react-router-dom'
const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<MdDashboard/>
        },
        {
            path:"/control",
            name:"Control",
            icon:<IoIosSettings/>
        },
        {
            path:"/table",
            name:"History Logs",
            icon:<BsTable/>
        },
        {
            path:"/tutorial",
            name:"Tutorial",
            icon:<AiOutlineFileText/>
        },
        {
            path:"/about",
            name:"About",
            icon:<FcAbout/>
        },
    ]
    return (
        
        <div className='container'>
            <div style={{width: isOpen ? "300px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo"> <font color="FFAE42">CACAO</font>TECH</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar