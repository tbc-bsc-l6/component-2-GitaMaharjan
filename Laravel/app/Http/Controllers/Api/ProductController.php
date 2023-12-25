<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    
    public function addProduct(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'description' => 'required',
                'price' => 'required|numeric',
                'quantity' => 'required|numeric',
                'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Example validation for file upload
            ]);
    
            $product = new Product;
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->price = $request->input('price');
            $product->quantity = $request->input('quantity');
    
            // Handle file upload
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $path = $file->store('products');
                $product->file = $path;
            }
    
            $product->save();
    
            return response([
                'status' => true,
                'message' => 'Product added successfully',
                'data' => $product,
            ]);
        } catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => 'Error adding product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
}