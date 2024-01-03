<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Sanctum\Sanctum;
use App\Models\Product;
use App\Models\Cart;




class CartsController extends Controller
{
    public function getSingleProduct(Request $request){
        $productId = $request->id;
        $loginId = $request->loginid;
        if($loginId != "" && $this->isProductInCart($loginId, $productId)){
            $cartProductEntry = Cart::where(['user_id' => $loginId, 'product_id' => $productId])->get();
            $productDetails = $cartProductEntry[0]->cartProducts->toArray();
            $categoryDetails = $cartProductEntry[0]->cartProducts->get_category->toArray();
    
            return response([
                'product' => $productDetails,
                'cart_pr' => $cartProductEntry[0],
                'category' => $categoryDetails,
                'result' => 'user_id'
            ]);
    
        }
        else {
            $productDetails = Product::find($productId)->toArray();
            $categoryDetails = Product::find($productId)->get_category->toArray();
    
            return response([
                'product' => $productDetails,
                'category' => $categoryDetails,
                'result' => 'none'
            ]);
        }
    }
    public function isProductInCart($userId, $productId){
        $cartEntry = Cart::where(['user_id' => $userId, 'product_id' => $productId])->get();
        return count($cartEntry) > 0;
    }
   


    public function addProductToCart(Request $request){
        $productId= $request->pro_id;
        $quantity = $request->quantity;
        $customerId = $request->cust_id;
        $add = $request->add;
        if(count(Cart::where(['product_id'=> $productId, 'user_id'=> $customerId])->get()->toArray()) > 0){
            Cart::where(['product_id'=> $productId, 'user_id' => $customerId])->update(['quantity'=> $quantity]);     
            $productResult = Product::where(['id'=> $productId])->get()->toArray();
            $cartProduct = Cart::where(['product_id'=> $productId, 'user_id' => $customerId])->get()->toArray();
            $category = Product::where('id', $productId)->get()[0]->get_category->get();
                return response(['repeat'=> false, 'status'=> true, 'userid'=> $customerId, 'result'=> $productResult, 'cart_pr'=> $cartProduct, 'category'=> $category]);
           
        }
        else if(count(Cart::where(['user_id'=> $customerId])->get()->toArray()) > 0){
            Cart::create(['product_id'=>$productId, 'user_id'=>$customerId, 'quantity'=>$quantity]);
            $productResult = Product::where(['id'=> $productId])->get()->toArray();
            $cartProduct = Cart::where(['product_id'=> $productId, 'user_id' => $customerId, 'quantity'=> $quantity])->get()->toArray();
            $category = Product::where('id', $productId)->get()[0]->get_category->get();

            return response(['repeat'=> false, 'status'=>true, 'userid'=> $customerId ,'result'=>$productResult, 'cart_pr'=> $cartProduct, 'category'=> $category]);
        }
        else{
            Cart::create(['product_id'=> $productId, 'user_id'=> $customerId, 'quantity'=> $quantity]);
            $productResult = Product::where(['id'=> $productId])->get()->toArray();
            $cartProduct = Cart::where(['product_id'=> $productId, 'user_id' => $customerId, 'quantity'=> $quantity])->get()->toArray();
            $category = Product::where('id', $productId)->get()[0]->get_category->get();
            return response(['repeat'=> false,'status'=>true, 'userid'=> $customerId, 'result'=> $productResult, 'cart_pr'=> $cartProduct, 'category'=> $category]);
        }
    }

    // Get the number of products in the cart for a specific user by user ID
    public function getProductsCountInCartById(Request $request){
        $userId = $request->id;
        $productsCount = count(Cart::where('user_id', $userId)->get());
        return response(['num' => $productsCount]);
    }

   

    public function getProductsFromCartById(Request $request){
        $userId = $request->id;
    
        // Retrieve all products in the cart for the given user ID
        $products = Cart::where('user_id', $userId)->get();
        $cartProducts = $products->toArray();  // Convert the collection to an array
        $productDetails = array();
        $categoryDetails = array();
    
        // Iterate through each product in the cart to gather detailed information
        foreach($products as $key => $product){
            $productDetails[$key] = $product->cartProducts->toArray();  // Product details
            $categoryDetails[$key] = $product->cartProducts->get_category->toArray();  // Category details
        }
        
        return response(['product'=> $productDetails, 'cart_pr'=> $cartProducts, 'category'=> $categoryDetails]);
    }

    // Delete a specific cart product by its ID and return the deletion status
    public function deleteCartProductByUser(Request $request, $id){
        $result = Cart::where('id', $id)->delete();
        return response(['status'=> $result]);
    }
   

    // Update the quantity of a cart product by its ID and return the update status

    public function updateCartById(Request $request){
        $cartId = $request->id;
        $quantity = $request->quant;
        
        // Update the quantity of the cart product by ID
        $result = Cart::where("id", $cartId)->update(['quantity' => $quantity]);
        
        // Return the response with the update status
        return response(['status' => true]);   
    }

    
}