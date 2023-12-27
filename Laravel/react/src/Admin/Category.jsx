
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_category} from '../authentication/categorySlice'
import { Link, useNavigate } from 'react-router-dom';


const Category = () => {
    const dispatch = useDispatch();
    
      const itemCat  = useSelector((state => ( state.categoryReducer.category)));

      useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/get-categories")
            .then((response) => {
                console.log(response);
                dispatch(add_category(response.data.allCategories));
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [dispatch]);


  return (
    <div>
        <div className='flex md:flex-row flex-col items-baseline justify-between w-full mb-6'>

      <div className='flex md:flex-row flex-col md:mt-0 mt-4 items-baseline justify-between gap-5'>

      <Link to='/dashboard/add_category'>
      <button type='submit' className=" relative overflow-x-auto shadow-md sm:rounded-lg  w-full bg-pink text-black py-2 px-4 rounded hover:bg-pink-200"
>Add Category from here</button>
        </Link>

      </div>

        </div>
        
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>

                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {/* <tr className={itemCat.length === 0 ? 'block': 'hidden'}><td>No data</td></tr> */}
    {itemCat ? (
        itemCat.map((cat, id)=>{
            
            return (
                <tr key={cat.nanoid} >
                    <td className="px-6 py-4">
                        {id+1}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {cat.name}
                    </th>
                    <td className="px-6 py-4">
                        {cat.description}
                    </td>
                    <td className="px-6 py-4">
                    {cat.date ? cat.date.substring(0, 10) : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                        {/* <Link data-id={cat.id} onClick={(e)=>{deleteCategory(e)}} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</Link> */}
                    </td>
                </tr>
                )})): (
                    <tr><td colSpan="5">No data</td></tr>
            )}
        </tbody>
    </table>
</div>

    </div>
  )
}

export default Category

