<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendsController extends Controller
{
    // public function product($slug){
    //     $category=Category::where('name',$slug)->where('status','0')->first();
    //     if($category){
    //         $product=Product::where('category_id',$category->id)->where('status','0')->get();
            // if($product){
            //     return response()->json([
            //         'status'=>200,
            //         'product_data'=>[
            //             'product'=>$product,
            //             'category'=>$category,
            //         ]
            //     ]);
            // }else{
            //     return response()->json([
            //         'status'=>404,
            //         'message'=>"No Product Available"
            //     ]);
            // }

    //     }else{
    //         return response()->json([
    //             'status'=>404,
    //             'message'=>"No such Category Found"
    //         ]);
    //     }
    // }

    public function product($slug){
        // 1. Retrieve a category based on the provided slug.
        $category = Category::where('name', $slug)->first();
    
        // 2. Check if a category was found.
        if ($category) {
            // 3. Retrieve products related to the category.
            $product = Product::where('category_id', $category->id)->get();
    
            // 4. Return a JSON response with a 200 status code, including product and category data.
            
            if($product){

                    return response()->json([
                        'status' => 200,
                        'product_data' => [
                            'product' => $product,
                            'category' => $category,
                        ],
                    ]);
            }else{
                    return response()->json([
                                'status'=>404,
                                'message'=>"No Product Available"
                            ]);
                }
        } else {
            // 5. Return a JSON response with a 404 status code and a message if no category is found.
            return response()->json([
                'status' => 404,
                'message' => "No such Category Found",
            ]);
        }
    }

        public function getSingleProduct(Request $request){
            $id = $request->id;
            $arr = Product::find($id)->toArray();
            $category = Product::find($id)->get_category->toArray();
            return response(['product'=>$arr, 'category'=> $category, 'result'=> 'none']);
    }
    
}