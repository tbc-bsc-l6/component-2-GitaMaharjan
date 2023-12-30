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

    public function getImage($filename)
{
    $path = storage_path('app/public/category_images/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);

    return response($file, 200)->header('Content-Type', 'image/jpeg'); // Adjust the content type based on your image format
}




}