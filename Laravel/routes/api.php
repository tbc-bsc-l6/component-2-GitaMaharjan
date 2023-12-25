<?php

use App\Http\Controllers\Api\UserController;
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


Route::post("/signup", [UserController::class, 'signup']);
Route::post("/signin", [UserController::class, 'signin']);
Route::post("/authentication", [UserController::class, 'authentication']);
Route::post("/adminlogin", [UserController::class, 'loginAdmin']);
Route::post("/loginAdmin", [UserController::class, 'loginAdmin']);