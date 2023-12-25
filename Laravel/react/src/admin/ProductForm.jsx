import { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [file, setFile] = useState('');


  const handleSave = () => {
    // Add logic to handle the form submission (e.g., send data to the server)
    console.log('Form data submitted:', { productName, productDescription, productPrice, productQuantity });

    const formData=new FormData();
    formData.append("file",file);
    formData.append("name",productName);
    formData.append("description",productDescription);
    formData.append("price",productPrice);
    formData.append("quantity",productQuantity);

    axios.post("http://127.0.0.1:8000/api/addproduct", formData, { headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },}).then((response)=>{
        alert("Data has been saved")
       
    }) 


  };

  return (
    <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-md p-6">
      {/* Product Name */}
      <div className="mb-4">
        <label htmlFor="productName" className="block text-sm font-bold text-gray-700 mb-2">
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e)=>setProductName(e.target.value)}
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
          value={productDescription}
          onChange={(e)=>setProductDescription(e.target.value)}
          placeholder="Enter product description"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          required
        />
      </div>

      {/* Price and Quantity in the same row */}
      <div className="mb-4 flex space-x-4">
        {/* Product Price */}
        <div>
          <label htmlFor="productPrice" className="block text-sm font-bold text-gray-700 mb-2">
            Price
          </label>
          <input
            id="productPrice"
            type="number"
            value={productPrice}
            onChange={(e)=>setProductPrice(e.target.value)}
            placeholder="Enter product price"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          />
        </div>

        {/* Product Quantity */}
        <div>
          <label htmlFor="productQuantity" className="block text-sm font-bold text-gray-700 mb-2">
            Quantity
          </label>
          <input
            id="productQuantity"
            type="number"
            value={productQuantity}
            onChange={(e)=>setProductQuantity(e.target.value)}
            placeholder="Enter product quantity"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
          />
        </div>
      </div>

      {/* Product Image */}
      <div className="mb-4">
        <label htmlFor="productImage" className="block text-sm font-bold text-gray-700 mb-2">
          Product Image
        </label>
        <input
          id="productImage"
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
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

export default ProductForm;
