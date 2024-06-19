import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import { MdOutlineInventory2, MdOutlineInventory } from "react-icons/md";
import { GoFile } from "react-icons/go";
import { SiReacthookform } from "react-icons/si";
import { FaWpforms, FaCcAmazonPay } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { TbReport } from "react-icons/tb";

const Sidebar = ({ openSidebarToggle, OpenSidebar, onSidebarItemClick, onClick }) => {

    const [showAboutSubmenu, setShowAboutSubmenu] = useState(false);

    const [fatakpay, setfatakpay] = useState(false);

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

                    <GoFile className='icon' style={{ fontSize: "22px" }} />
                    File Upload

                </li>

                <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('File-Import')}>


                    <BsFillGrid3X3GapFill className='icon' /> File Import


                </li>
                {/* <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-in')}>

                    <BsPeopleFill className='icon' />Inventory-In

                </li>

                <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-out')}>

                    <BsPeopleFill className='icon' />Inventory-Out

                </li> */}





                <div className="flex justify-between items-center">
                    <li className='sidebar-list-item s-col text-black' onClick={() => setShowAboutSubmenu(!showAboutSubmenu)} >

                        <BsListCheck className='icon ' /> Inventory
                        <span className='pl-3'>{showAboutSubmenu ? '▲' : '▼'}</span>

                    </li>
                </div>
                {showAboutSubmenu && (
                    <div className="ml-4">

                        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-in')} >

                            <MdOutlineInventory2 className='icon' /> Inventory-In

                        </li>
                        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-out')} >

                            <MdOutlineInventory className='icon' /> Inventory-Out

                        </li>

                        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('form')} >

                            <FaWpforms className='icon  text-black' /> Form

                        </li>



                        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-Data')} >

                            <FaDatabase className='icon  text-black' /> Inventory-Data

                        </li>



                    </div>
                )}

 



                <div className="flex justify-between items-center">
                    <li className='sidebar-list-item s-col text-black' onClick={() => setfatakpay(!fatakpay)} >

                        <FaCcAmazonPay className='icon ' /> Fatak-Pay
                        <span className='pl-3'>{fatakpay ? '▲' : '▼'}</span>

                    </li>
                </div>
                {fatakpay && (
                    <div className="ml-4">

                        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Fatak-File_UPLOAD')} >

                            <MdOutlineInventory2 className='icon' /> File Upload

                        </li>
                        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('FATAK_FILE_DATA')} >

                            <MdOutlineInventory className='icon' />File Data

                        </li>

                        {/* <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('form')} >

                            <FaWpforms className='icon  text-black' /> Form

                        </li>



                        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Inventory-Data')} >

                            <FaDatabase className='icon  text-black' /> Inventory-Data

                        </li> */}



                    </div>
                )}












                <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('Report')}>


                    <TbReport className='icon' /> Report


                </li>

                <li className='sidebar-list-item s-col text-black'>

                    <BsFillGearFill className='icon' /> Setting

                </li>
                <li className='sidebar-list-item s-col text-black'>

                    <BsPeopleFill className='icon' />Admin

                </li>


            </ul>

        </aside >
    )
}

export default Sidebar




















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






















{/* <div className="flex justify-between items-center">
    <li className='sidebar-list-item s-col text-black relative' onClick={() => setShowAboutSubmenu(!showAboutSubmenu)}>
        <BsListCheck className='icon' /> Inventory
        <span className='pl-3'>{showAboutSubmenu ? '▲' : '▼'}</span>
    </li>
</div>
{showAboutSubmenu && (
    <div className="ml-4 transition-smooth duration-300 ease-in-out">
        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('team')}>
            <BsListCheck className='icon' /> Team
        </li>
        <li className='sidebar-list-item s-col text-black' onClick={() => onSidebarItemClick('History')}>
            <BsListCheck className='icon' /> History
        </li>
    </div>
)} */}