import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SidebarBoard from './SidebarBoard';
import ProductForm from './ProductForm';

function Dashboard() {
  return (
    <div className="flex">
      <SidebarBoard />

      <div className="flex-grow ml-4 p-8">
        <ProductForm/>
      </div>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default Dashboard;
