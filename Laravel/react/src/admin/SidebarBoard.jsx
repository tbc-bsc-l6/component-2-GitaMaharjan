
'use client';
import logo from "../assets/logo/goasis-black.png"
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { FaTags, FaComment,FaClipboardList ,FaUserCircle} from 'react-icons/fa';

function SidebarBoard() {
  return (
    <Sidebar aria-label="Sidebar with logo branding example">
     <div style={{width:"150px", height:"auto"}}>
        <img src={logo}></img>
     </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Overview
          </Sidebar.Item>

          <Sidebar.Item href="#" icon={HiShoppingBag} to="/products">
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaTags}>
            Category
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaClipboardList}>
          Orders          
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaComment}>
          Reviews          
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>

          <Sidebar.Item href="#" icon={FaUserCircle}>
            Profile
          </Sidebar.Item>
      
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarBoard;