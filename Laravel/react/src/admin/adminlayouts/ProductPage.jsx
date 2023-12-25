import React from 'react'

function ProductPage() {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Product Discount
                </th>
                <th scope="col" className="px-6 py-3">
                    Added Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           

        </tbody>
    </table>
</div>
<button >Add Product</button>
    </div>
  )
}

export default ProductPage
