<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function login_user(Request $request){
        $email=$request->email;
        $password=$request->password;

        if(User::where(["email"=>$email,"password"=>$password])->get()->toArray()>0){
           $users_data= User::where(["email"=>$email,"password"=>$password])->get()->toArray();
            return response([
                "status"=>true,
                "email"=>$email,
                "name"=>$users_data["name"]
            ]);
        }
       
    }

    public function register_user(Request $request){
        $name=$request->name;
        $email=$request->email;
        $password=$request->password;


        if(User::where(["email"=>$email])->first()){
            
            return response([
                "status"=>false,
                "message"=>"the account on this email already exists"
            ]);
        }else{
           $result= User::create(["name"=>$name,"email"=>$email,"password"=>$password]);
           if($result){
            return response([
                "status"=>true,
                "message"=>"User Created succesfully"
            ]);
           }else{
            return response([
                "status"=>false,
                "message"=>"Something went wrong"
            ]);
           }
        }
       
    }

    public function authentication(Request $request){
        $tokenTable = Tokenall::where('token_id', $request->token)->first();
        
        if($tokenTable != null){
            $user = Tokenall::find($tokenTable->id)->user->toArray();
            return response([
                'name' => $user['name'],
                'email'=> $user['email'],
                'status'=>"true",
                'image'=> 'p1.jpg',
                'type'=> $user['usertype']
            ]);
        }
        else{
            return response([
                'status'=>"false"
            ]);
        }
    }

    
}