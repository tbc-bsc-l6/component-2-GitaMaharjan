<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Sanctum\Sanctum;
use App\Models\Product;
use App\Models\Cart;


class CartController extends Controller
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



   
}