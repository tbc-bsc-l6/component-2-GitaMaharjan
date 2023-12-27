import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryForm() {
    const navigate = useNavigate();


    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

  
  
    const handleSave = () => {
      // Add logic to handle the form submission (e.g., send data to the server)
      console.log('Form data submitted:', { categoryName, categoryDescription});
  
      const formData=new FormData();
      formData.append("name",categoryName);
      formData.append("description",categoryDescription);

  
      axios.post("http://127.0.0.1:8000/api/add-categories", formData, { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },}).then((response)=>{
          alert("Data has been saved")
          navigate("/dashboard/category");

         
      }) 
  
  
    };
  
    return (
      <div className="max-w-xl bg-pink rounded-lg overflow-hidden shadow-md p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-bold text-gray-700 mb-2">
            Category Name
          </label>
          <input
            id="productName"
            type="text"
            value={categoryName}
            onChange={(e)=>setCategoryName(e.target.value)}
            placeholder="Enter product name"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          />
        </div>
  
        {/* Product Description */}
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-sm font-bold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="productDescription"
            rows={8}
            value={categoryDescription}
            onChange={(e)=>setCategoryDescription(e.target.value)}
            placeholder="Enter category description"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          />
        </div>

  
        {/* Save Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

export default CategoryForm
