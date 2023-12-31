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
   
}