<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Token;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index()
    {
        //
    }
    
    public function signup(Request $request)
    {
        $validatedData = $request->validate([
            'fullname' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]);

        // Check if email already exists
        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            return response([
                'message' => 'Email already exists',
                'status' => 'failed'
            ]);
        }

        // Create user
        $newUser = User::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'image' => 'static.jpg',
            'usertype' => 'customer'
        ]);

        // Generate and store API token
        $emailToken = User::where('email', $request->email)->first();
        $token = $emailToken->createToken($request->email)->plainTextToken;

        Token::create(['user_id' => $newUser->id, 'token_id' => $token]);

        if ($newUser) {
            return response([
                'message' => 'User created successfully',
                'fullname' => $request->fullname,
                'email' => $request->email,
                'image' => 'static.jpg',
                'api_token' => $token
            ], 200);
        }
    }


    public function signin(Request $request)
{
    // Validate incoming request data
    $validatedData = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Find the user with the given email and usertype 'customer'
    $user = User::where('email', $request->email)->where('usertype', 'customer')->first();

    // Check if the user exists and the provided password is correct
    if ($user && password_verify($request->password, $user->password)) {
        // Generate a new API token for the user
        $token = $user->createToken($request->email)->plainTextToken;

        // Store the token in the 'Token' table
        Token::create(['user_id' => $user->id, 'token_id' => $token]);

        // Return a successful response with user information and token
        return response([
            'message' => 'User successfully logged in',
            'status' => 'true',
            'api_token' => $token,
            'fullname' => $user->fullname,
            'image' => 'static.jpg'
        ], 201);
    } else {
        // Return a failed response if login credentials are invalid
        return response([
            'message' => 'Login failed',
            'status' => 'false',
        ], 200);
    }
}


    public function authentication(Request $request)
    {
        // Retrieve the token entry from the 'Token' table based on the provided token
        $tokenEntry = Token::where('token_id', $request->token)->first();

        // Check if a valid token entry was found
        if ($tokenEntry) {
            // Retrieve user information from the associated user of the token entry
            $user = $tokenEntry->user->toArray();

            // Return a successful response with user details
            return response([
                'fullname' => $user['fullname'],
                'email' => $user['email'],
                'status' => 'true',
                'image' => 'static.jpg',
                'type' => $user['usertype']
            ]);
        } else {
            // Return a failed response indicating authentication failure
            return response([
                'status' => 'false'
            ]);
        }
    }

    public function adminLogin(Request $request){
        $val = $request->validate([
            'email' => 'required|email|',
            'password' => 'required',
        ]);
        $emailToken = User::where('email', $request->email)->where('usertype', "admin")->first();
        if($emailToken && User::where('password', $request->password)){
            $Usertable = User::where('email', $request->email)->first();
            $id = $Usertable->id;
        $token = $emailToken->createToken($request->email)->plainTextToken;
        Token::create(['user_id'=>$id, 'token_id'=>$token]);
            return response([
                'message'=> 'User Successfully login',
                'status'=> 'true',
                'api_token' => $token,
                'fullname'=>$Usertable->fullname,
                'image' => 'static.jpg'
            ],201);
        }
        else{
            return response([
                'email'=>$request->email,
                'password'=>$request->password,

            ]);
        }
    }
       

    // public function adminLogin(Request $request) {
    //     $validation = $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);
    
    //     $tokenEntry = User::where('email', $request->email)->where('usertype', 'admin')->first();
    
    //     if ($tokenEntry && User::where('password', $request->password)) {
    //         $userTable = User::where('email', $request->email)->first();
    //         $userId = $userTable->id;
    
    //         $token = $tokenEntry->createToken($request->email)->plainTextToken;
    //         Token::create(['user_id' => $userId, 'token_id' => $token]);
    
    //         return response([
    //             'message' => 'User successfully logged in',
    //             'status' => true,
    //             'api_token' => $token,
    //             'fullname' => $userTable->fullname,
    //             'image' => 'static.jpg'
    //         ], 201);
    //     } else {
    //         return response([
    //             'message' => 'Login failed. Invalid credentials or user not authorized.',
    //             'status' => false,
    //         ], 200);
    //     }
    // }
    

}