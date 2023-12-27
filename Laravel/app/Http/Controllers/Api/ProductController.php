<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    
    // public function addProduct(Request $request)
    // {
    //     try {
    //         $request->validate([
    //             'name' => 'required',
    //             'description' => 'required',
    //             'price' => 'required|numeric',
    //             'quantity' => 'required|numeric',
    //             'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Example validation for file upload
    //         ]);
    
    //         $product = new Product;
    //         $product->name = $request->input('name');
    //         $product->description = $request->input('description');
    //         $product->price = $request->input('price');
    //         $product->quantity = $request->input('quantity');
    
    //         // Handle file upload
    //         if ($request->hasFile('file')) {
    //             $file = $request->file('file');
    //             $path = $file->store('products');
    //             $product->file = $path;
    //         }
    
    //         $product->save();
    
    //         return response([
    //             'status' => true,
    //             'message' => 'Product added successfully',
    //             'data' => $product,
    //         ]);
    //     } catch (\Exception $e) {
    //         return response([
    //             'status' => false,
    //             'message' => 'Error adding product',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    public function addProduct(Request $request){
        // Extracting data from the request
        $data = [
            'name' => $request->product_name,
            'image' => "",  // Placeholder for image (you may need to handle image upload separately)
            'description' => $request->product_description,
            'quantity' => $request->product_quantity,
            'price' => $request->product_price,
            'category_id' => $request->product_category,
            'discount_id' => $request->product_discount
        ];
    
        // Creating a new Product using the data
        $result = Product::create($data);
    
        // Checking if the product was successfully created
        if ($result) {
            // If successful, return a positive response with the product ID
            return response([
                'status' => true,
                'id' => $result->id
            ]);
        }
    
        // If creation was not successful, return a negative response
        return response([
            'status' => false
        ]);
    }
    

    public function addProductImage(Request $request)
    {
        // Check if the request contains an 'image' file
        if ($request->hasFile('image')) {
            // Retrieve the 'image' file from the request
            $image = $request->file('image');
    
            // Generate a unique name for the image based on the current timestamp
            $name = time() . '.' . $image->getClientOriginalExtension();
    
            // Move the uploaded image to the 'images/' directory with the generated name
            $image->move('images/', $name);
    
            // Get the product ID from the request
            $id = $request->id;
    
            // Update the product record in the database with the new image name
            Product::where("id", $id)->update(['image' => $name]);
    
            // Return a positive response indicating successful image upload
            return response([
                'status' => true
            ]);
        }
    
        // Return a negative response if no 'image' file is present in the request
        return response([
            'status' => false
        ]);
    }
    


    public function updateProduct(Request $request)
    {
        // Extracting product data from the request
        $updatedProductData = [
            'name'        => $request->input('product_name'),
            'description' => $request->input('product_description'),
            'quantity'    => $request->input('product_quantity'),
            'price'       => $request->input('product_price'),
            'category_id' => $request->input('product_category'),
            'discount_id' => $request->input('product_discount'),
        ];

        // Get the product ID from the request
        $productId = $request->input('product_id');

        // Update the product record in the database with the new data
        $result = Product::where('id', $productId)->update($updatedProductData);

        // Check if an image file is provided in the request
        if ($request->hasFile('product_image')) {
            // Retrieve the 'product_image' file from the request
            $image = $request->file('product_image');

            // Generate a unique name for the image based on the current timestamp
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Move the uploaded image to the 'images/' directory with the generated name
            $image->move('images/', $imageName);

            // Update the product record in the database with the new image name
            Product::where('id', $productId)->update(['image' => $imageName]);

            // Return a positive response indicating successful image upload
            return response([
                'status' => true,
            ]);
        }

        // If no new image is provided, return a positive response without image update
        return response([
            'status' => true,
        ]);
    }

    // public function getProducts(){
    //     $arr = Product::orderBy("id", "desc")->get()->toArray();
    //     $result = [];
    //     foreach($arr as $key => $ar){
    //         $result[$key] = $ar;
    //         $all_pro = Product::find($ar['id'])->get_category->toArray();
    //         $result[$key]['cat_name'] = $all_pro['name'];
    //     }
    //     return response(['arr'=> $result]);
    // }

    public function getProducts()
{
    // Retrieve all products from the database, ordered by ID in descending order
    $products = Product::orderBy("id", "desc")->get()->toArray();

    // Initialize an empty result array
    $result = [];

    // Iterate through each product in the retrieved array
    foreach ($products as $key => $product) {
        // Copy the product details to the result array
        $result[$key] = $product;

        // Retrieve the category details for the current product using the defined relationship
        $categoryDetails = Product::find($product['id'])->get_category->toArray();

        // Add the category name to the result array
        $result[$key]['category_name'] = $categoryDetails['name'];
    }

    // Return the final response containing the result array
    return response(['products' => $result]);
}


    public function deleteProduct(Request $request)
    {
        // Attempt to delete the product based on the provided ID
        $deleted = Product::where("id", $request->id)->delete();
    
        // Check if the deletion was successful
        if ($deleted) {
            // Return a positive response if the product was successfully deleted
            return response(['status' => true]);
        }
    
        // Return a negative response if the product deletion failed
        return response(['status' => false]);
    }
    
    

}