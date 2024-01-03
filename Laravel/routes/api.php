<?php

use App\Http\Controllers\Api\AuthsController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\CartsController;
use App\Http\Controllers\Api\FrontendsController;
use App\Http\Controllers\Api\OrdersController;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::group(['middleware' => 'CorsMiddleware'], function () {

Route::post("/signup", [AuthsController::class, 'signup']);
Route::post("/signin", [AuthsController::class, 'signin']);
Route::post("/authentication", [AuthsController::class, 'authentication']);
Route::post("/adminlogin", [AuthsController::class, 'adminLogin']);

Route::get('storage/category_images/{filename}', 'CategoryController@getImage')->name('category.image');


    // Route::resource('users',UsersController::class);
// });


// user
Route::resource('users',UsersController::class);
// Route::get('/users',[UserController::class,'getUser']);


// AdminPRODUCTS
Route::post("/add-products", [ProductsController::class, "addProduct"]);
Route::post("/add-product-images", [ProductsController::class, "addProductImage"]);
Route::post("update-products", [ProductsController::class, "updateProduct"]);
Route::delete("/delete-products/{id}", [ProductsController::class, "deleteProduct"]);
Route::get("/get-products", [ProductsController::class, "getProducts"]);

// customerProducts
Route::get("/fetch-category-products/{slug}",[FrontendsController::class,"product"]);


Route::post("/get_single_product", [FrontendsController::class, "getSingleProduct"]);


// categories
Route::get("/get-categories", [CategoryController::class, 'getCategories']);
Route::post("/add-categories", [CategoryController::class, 'addCategory']);
Route::delete("/delete-categories/{id}", [CategoryController::class, "deleteCategory"]);
// Route::post("/get_single_product", [ProductsController::class, "get_single_product"]);

// Route::get("product/{id}", [ProductsController::class, "get_single_product"]);






// cart

// Route::post("/add-to-cart", [CartsController::class, 'addToCart']);
Route::post("/get_single_product", [CartsController::class, "getSingleProduct"]);

Route::post("/add-to-cart", [CartsController::class, "addProductToCart"]);
Route::post("/cart-by-id", [CartsController::class, "getProductsFromCartById"]); 

Route::post("/productcounts-cart-id", [CartsController::class, "getProductsCountInCartById"]);

Route::delete("/delete-product-cart/{id}", [CartsController::class, "deleteCartProductByUser"]);
Route::put("/updatecart", [CartsController::class, "updateCartById"]);

Route::post("/add-to-order", [OrdersController::class, "addProductsToOrder"]);


// orders

Route::get("/get-orders/{id}", [OrdersController::class, "getOrders"]);

Route::get("/get-total-orders/{id}", [OrdersController::class, "getTotalOrders"]);

Route::get("/get-order-admin", [OrdersController::class, "getOrdersForAdmin"]);