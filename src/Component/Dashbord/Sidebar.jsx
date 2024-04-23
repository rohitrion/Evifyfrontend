import React from 'react'
import { Link } from "react-router-dom";
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
const Sidebar = ({ openSidebarToggle, OpenSidebar, onSidebarItemClick, onClick }) => {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    {/* <i><b>EVIFY</b></i> */}
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item   text-black s-col' onClick={() => onSidebarItemClick('Dashboard')}>

                    <BsGrid1X2Fill className='icon' /> Dashboard

                </li>
                <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('File-upload')}>

                    <BsFillArchiveFill className='icon' style={{ color: "#9E9EA4" }} />
                    File Upload

                </li>

                <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('File-Import')}>


                    <BsFillGrid3X3GapFill className='icon' /> File Import


                </li>
                <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-in')}>

                    <BsPeopleFill className='icon' />Inventory-In

                </li>

                <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-out')}>

                    <BsPeopleFill className='icon' />Inventory-Out

                </li>

                <li className='sidebar-list-item s-col text-black' >

                    <BsListCheck className='icon' /> Invoice Data

                </li>
                {/* <li className='sidebar-list-item s-col'>

                    <BsMenuButtonWideFill className='icon' /> Client Data

                </li>
                <li className='sidebar-list-item s-col'>

                    <BsMenuButtonWideFill className='icon' /> Vendor Data

                </li>
                <li className='sidebar-list-item s-col'>

                    <BsMenuButtonWideFill className='icon' /> City Data

                </li>
                <li className='sidebar-list-item s-col' >

                    <BsMenuButtonWideFill className='icon' /> Employee Data

                </li> */}

                <li className='sidebar-list-item s-col text-black'>

                    <BsFillGearFill className='icon' /> Setting

                </li>
                <li className='sidebar-list-item s-col text-black'>

                    <BsPeopleFill className='icon' />Admin

                </li>








            </ul>

        </aside>
    )
}

export default Sidebar