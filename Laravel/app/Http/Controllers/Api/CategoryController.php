<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function getCategories(Request $request){
        // Retrieve all categories from the database
        $allCategories = Category::all();

        // Return a JSON response with the list of all categories
        return response([
            'allCategories' => $allCategories,
        ]);
    }

    public function addCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        // Extract data from the request
        $categoryData = [
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image'=>$request->file('image')->store('category_images', 'public')
            
        ];

        try {

            $category = Category::create($categoryData);

            // Check if the category was successfully created
            if ($category) {
                return response(['status' => 'true']);
            } else {
                return response(['status' => 'false']);
            }
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during category creation
            return response(['status' => 'false', 'error' => $e->getMessage()]);
        }
    }

    // public function getImage($filename)
    // {
    //     $path = storage_path('app/public/category_images/' . $filename);

    //     if (!file_exists($path)) {
    //         abort(404);
    //     }

    //     $file = file_get_contents($path);

    //     return response($file, 200)->header('Content-Type', 'image/jpeg'); // Adjust the content type based on your image format
    // }

    public function getImage($filename)
    {
        $path = storage_path('app/public/category_images/' . $filename);
    
        if (!file_exists($path)) {
            // If the file does not exist, return a 404 response
            return response(['error' => 'Image not found'], 404);
        }
    
        // Get the file extension from the filename
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
    
        // Map file extensions to corresponding content types
        $contentTypes = [
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            // Add more formats as needed
        ];
    
        // Check if the file extension is in the content types array
        if (array_key_exists($extension, $contentTypes)) {
            // Set the Content-Type header based on the file extension
            $contentType = $contentTypes[$extension];
        } else {
            // If the extension is not recognized, return an error response
            return response(['error' => 'Invalid image format'], 400);
        }
    
        // Read the file content
        $file = file_get_contents($path);
    
        // Return the response with the appropriate Content-Type header
        return response($file, 200)->header('Content-Type', $contentType);
    }
    


}