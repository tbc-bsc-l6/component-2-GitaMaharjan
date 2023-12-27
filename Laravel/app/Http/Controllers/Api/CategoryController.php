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
        // Extract data from the request
        $categoryData = [
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ];

        try {
            // Create a new category in the database
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



}