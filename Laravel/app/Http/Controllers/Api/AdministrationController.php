<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AdministrationController extends Controller
{
    
    public function get_users_customer(){
        return response([
            'users'=> User::where("usertype", 'customer')->get()->toArray()
        ]);
    }

    public function get_users_admin(){
        return response([
            'users'=> User::where("usertype", 'admin')->get()->toArray()
        ]);
    }

    public function get_user_admin($id){
        return response([
            'user'=> User::where("id", $id)->first()
        ]);
    }

    public function create_user_admin(Request $request){
        $fullname = $request->fullname;
        $email = $request->email;
        $usertype = $request->usertype;
        $password = bcrypt($request->password);
       
        if (!str_contains($request->email, '@') || !str_contains($request->email, '.')) {
            return response([
                'message'=> 'Email should  be a valid email',
                'status' => 'failed'
            ]);
        }
        if(strlen($request->password) < 6 || !preg_match('/[0-9]/', $request->password) || !preg_match('/[a-zA-Z]/', $request->password)){
            return response([
                'message'=> 'password should be at least of length 6 and contain a digit and an alphabet',
                'status' => 'failed'
            ]);
        }
        $existingUser = User::where('email', $request->email)->first();
 
        if ($existingUser) {
            return response([
                'message' => 'Email already exists',
                'status' => 'failed'
            ]);
        }
        $result = User::create(['fullname'=> $fullname, 'email'=> $email, 'usertype'=> 'admin', 'password'=> $password]);
        return response([
            'status'=> true,
        ]);

    }

    public function edit_user_admin(Request $request){
        $id = $request->id;
        $email = $request->email;
        $fullname = $request->fullname;
        $repeatEmail = User::where('id',"!=", $id)->where("email", $email)->first();
        if($repeatEmail){
            return response([
                "status"=> "failed",
                'message'=> "email exists already!!"
            ]);
        }
        else{
            User::where("id", $id)->update(['fullname'=> $fullname, 'email'=> $email, 'usertype'=>"admin"]);
            return response([
                'status'=> true,
                'message'=> "Users details successfully updated!!"
            ]);
        }
    }

    // public function reset_user_admin(Request $request){
    //     $id = $request->id;
    //     $newPass = $request->newpassword;
    //     $oldpass = $request->oldpassword;
        
    //     $user = User::where("id", $id)->first();
    //     $ifPasswordMatch = Hash::check( $oldpass, $user->password);
    //     if($ifPasswordMatch){
    //         User::where("id", $id)->update(["password"=> bcrypt($newPass)]);
    //         return response([
    //             'status'=> true
    //         ]);
    //     }
    //     else{
    //         return response([
    //             'status'=> false
    //         ]);
    //     }
    // }

    public function delete_user_admin(Request $request, $id){
        User::where("id", $id)->delete();
        return response([
            'status'=> true
        ]);
    }

}