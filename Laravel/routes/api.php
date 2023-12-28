<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;

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


Route::post("/signup", [AuthController::class, 'signup']);
Route::post("/signin", [AuthController::class, 'signin']);
Route::post("/authentication", [AuthController::class, 'authentication']);
Route::post("/adminlogin", [AuthController::class, 'adminLogin']);

// PRODUCTS
Route::post("/add-products", [ProductController::class, "addProduct"]);
Route::post("/add-product-images", [ProductController::class, "addProductImage"]);
Route::post("update-products", [ProductController::class, "updateProduct"]);
Route::delete("/delete-products/{id}", [ProductController::class, "deleteProduct"]);
Route::get("/get-products", [ProductController::class, "getProducts"]);

// categories
Route::get("/get-categories", [CategoryController::class, 'getCategories']);
Route::post("/add-categories", [CategoryController::class, 'addCategory']);
Route::delete("/delete-categories/{id}", [CategoryController::class, "deleteCategory"]);
// Route::post("/get_single_product", [ProductController::class, "get_single_product"]);

// Route::get("product/{id}", [ProductController::class, "get_single_product"]);