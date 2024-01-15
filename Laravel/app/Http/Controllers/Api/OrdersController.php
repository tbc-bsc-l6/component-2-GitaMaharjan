<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Support\Str;
use App\Models\Orderitem;
use App\Models\Product;
use Illuminate\Http\Request;

class OrdersController extends Controller
{

    public function addProductsToOrder(Request $request)
    {
        $name=$request->name;
        $deliveryAddress = $request->address;
        $deliveryDate = $request->date;
        $userLogin = $request->login;
        $remarks = $request->remarks;
        $number=$request->number;
    
        $cartItems = Cart::where('user_id', $userLogin)->get()->toArray();
        $orderToken = Str::random(5);
    
        $createdOrder = Order::create([
            'user_id' => $userLogin,
            'name' => $name,
            'address' => $deliveryAddress,
            'delivery_date' => $deliveryDate,
            'status' => 'New',
            'remarks' => $remarks,
            'number' => $number,
            'order_no' => $orderToken
        ]);
    
        foreach ($cartItems as $cartItem) {
            OrderItem::create([
                'product_id' => $cartItem['product_id'],
                'order_id' => $createdOrder->id,
                'quantity' => $cartItem['quantity']
            ]);
        }
    
        Cart::where("user_id", $userLogin)->delete();
    
        return response([
            'status' => true,
            'order_id' => $createdOrder->id
        ]);
    }
    
    
    public function getOrders(Request $request, $id){
        // $id = $request->id;
        $data = Order::where('id', $id)->get();
        $itemsData = Orderitem::where('order_id', $id)->get();
        $items = array();
        $cat = array();
        foreach($itemsData as $key=> $item){
            $pid = $item['product_id'];
            $items[$key] = Product::where("id", $pid)->first();
            $cat[$key] = Product::where("id", $pid)->first()->get_category->name;
        }
        return response([
            'status'=> true,
            'orders'=> $data,
            'items'=> $items,
            'order_item'=>$itemsData,
            'cat' => $cat
        ]);


     // Validate the incoming request data
     /*
            $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'date' => 'required|date',
                'login' => 'required|numeric',
                'remarks' => 'nullable|string|max:255',
                'number' => 'required|numeric|min:1000000000|max:9999999999',
            ]);

            $name = $request->name;
            $deliveryAddress = $request->address;
            $deliveryDate = $request->date;
            $userLogin = $request->login;
            $remarks = $request->remarks;
            $number = $request->number;

            $cartItems = Cart::where('user_id', $userLogin)->get()->toArray();
            $orderToken = Str::random(5);

            // Create the order after validating the input
            $createdOrder = Order::create([
                'user_id' => $userLogin,
                'name' => $name,
                'address' => $deliveryAddress,
                'delivery_date' => $deliveryDate,
                'status' => 'New',
                'remarks' => $remarks,
                'number' => $number,
                'order_no' => $orderToken
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'product_id' => $cartItem['product_id'],
                    'order_id' => $createdOrder->id,
                    'quantity' => $cartItem['quantity']
                ]);
            }

            // Clear the user's cart after creating the order
            Cart::where("user_id", $userLogin)->delete();

            return response([
                'status' => true,
                'order_id' => $createdOrder->id
            ]);*/
    }


    public function getOrdersForAdmin()
    {
        $orderItems = Orderitem::all();
        $ordersData = array();
    
        foreach ($orderItems as $key => $orderItem) {
            $orderId = $orderItem->order_id;
            $productId = $orderItem->product_id;
    
            $ordersData[$key]['products'] = Product::where("id", $productId)->first();
            $ordersData[$key]['order_Main'] = Order::where("id", $orderId)->first();
        }
        return response([
            // 'ordersitem'=> $orderitems,
            'orders'=>$ordersData ,
            'orderItem'=> $orderItems
        ]);
    }

    
    public function getTotalOrders($userId)
    {
        $orders = Order::where("user_id", $userId)->get()->toArray();
        $orderItems = array();

        foreach ($orders as $key => $order) {
            $orderId = $order['id'];
            $orderItems[$key] = OrderItem::where("order_id", $orderId)->get()->toArray();
        }
            return response([
                'orders'=> $orders,
                'items'=> $orderItems
            ]);
    }

}