<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
     public function index()
     {
         $User = User::all();
         if($User->count() >0) {
             return response()->json([
                 'status' => 200,
                 'users' => $User
             ], 200);
         }else{
             return response()->json([
                 'status' => 404,
                 'message' => 'no records found'
             ], 404);
         }
     }

     public function store(Request $request)
     {
         $validator = Validator::make($request->all(),[
             'name' => 'required|string',
             'email' => 'required|string',
             'password' => 'required|string'
         ]);

         if($validator->fails()){
             return response() -> json([
                 'status'=>422,
                 'errors' => $validator->messages()
             ],422);
         }else{
             $user = User::firstOrCreate(
                 ['email' => $request->email],
                 ['name' => $request->name, 'password' => Hash::make($request->password)]
             );

             if (!$user->wasRecentlyCreated){
                 return response()->json([
                     'status'=>409,
                     'message'=>"User already exists"
                 ],409);
             } else {
                 return response()->json([
                     'status'=>200,
                     'message'=>"User has been successfully created"
                 ],200);
             }

         }
     }
    public function update(Request $request)
    {
        // Trouver l'utilisateur par son ancienne adresse e-mail
        $user = User::where('email', $request->old_email)->first();

        // Vérifier si l'utilisateur existe
        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }

        // Valider les données de la requête
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string',
            'new_email' => 'required|string|unique:users,email',
            'password' => 'sometimes|required|string|min:8',
        ]);

        // Si la validation échoue, retourner les erreurs
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        // Si la validation réussit, mettre à jour l'utilisateur
        if ($request->has('name')) {
            $user->name = $request->name;
        }

        // Mettre à jour l'adresse e-mail de l'utilisateur
        $user->email = $request->new_email;

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'User has been successfully updated'
        ], 200);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $user = Auth::user();
            return response()->json([
                'message' => 'Login successful',
                'name' => $user->name
            ]);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function delete(Request $request)
    {
        // Trouver l'utilisateur par son adresse e-mail
        $user = User::where('email', $request->email)->first();

        // Vérifier si l'utilisateur existe
        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }

        // Supprimer l'utilisateur
        $user->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User has been successfully deleted'
        ], 200);
    }





}
