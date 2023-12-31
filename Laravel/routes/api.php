<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\FrontendController;

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

Route::post("/signup", [AuthController::class, 'signup']);
Route::post("/signin", [AuthController::class, 'signin']);
Route::post("/authentication", [AuthController::class, 'authentication']);
Route::post("/adminlogin", [AuthController::class, 'adminLogin']);

Route::get('storage/category_images/{filename}', 'CategoryController@getImage')->name('category.image');


    // Route::resource('users',UserController::class);
// });


// user
Route::resource('users',UserController::class);
// Route::get('/users',[UserController::class,'getUser']);


// AdminPRODUCTS
Route::post("/add-products", [ProductController::class, "addProduct"]);
Route::post("/add-product-images", [ProductController::class, "addProductImage"]);
Route::post("update-products", [ProductController::class, "updateProduct"]);
Route::delete("/delete-products/{id}", [ProductController::class, "deleteProduct"]);
Route::get("/get-products", [ProductController::class, "getProducts"]);

// customerProducts
Route::get("/fetch-category-products/{slug}",[FrontendController::class,"product"]);


Route::post("/get_single_product", [FrontendController::class, "get_single_product"]);


// categories
Route::get("/get-categories", [CategoryController::class, 'getCategories']);
Route::post("/add-categories", [CategoryController::class, 'addCategory']);
Route::delete("/delete-categories/{id}", [CategoryController::class, "deleteCategory"]);
// Route::post("/get_single_product", [ProductController::class, "get_single_product"]);

// Route::get("product/{id}", [ProductController::class, "get_single_product"]);






// *************************************cart
// Route::post("/add-to-cart", [CartController::class, 'addToCart']);
Route::post("/get_single_product", [CartController::class, "getSingleProduct"]);

Route::post("/add-to-cart", [CartController::class, "addProductToCart"]);
Route::post("/cart-by-id", [CartController::class, "getProductsFromCartById"]); 

Route::post("/productcounts-cart-id", [CartController::class, "getProductsCountInCartById"]);

Route::delete("/delete-product-cart/{id}", [CartController::class, "deleteCartProductByUser"]);
Route::put("/updatecart", [CartController::class, "updateCartById"]);