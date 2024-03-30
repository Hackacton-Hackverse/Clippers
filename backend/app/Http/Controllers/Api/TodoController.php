<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class TodoController extends Controller
{
    public function alltodo(Request $request)
    {
        // Valider les données de la requête
        $validator = Validator::make($request->all(),[
            'email' => 'required|string|exists:users,email'
        ]);

        if($validator->fails()){
            return response() -> json([
                'status'=>422,
                'errors' => $validator->messages()
            ],422);
        }

        // Trouver l'utilisateur par son adresse e-mail;

        // Récupérer tous les Todo de cet utilisateur
        $todos = DB::table('todo')->where('user_email' , $request->email)->get();

        if( $todos && $todos->count()>0){
            return response()->json([
                'status' => 200,
                'todos' => $todos
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'no records found'
            ], 404);
        }
    }


    public function addtodo(Request $request)
    {
        // Valider les données de la requête
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'state' => 'required|string',
            'user_email' => 'required|string|exists:users,email'
        ]);

        // Si la validation échoue, retourner les erreurs
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        // Créer un nouveau Todo
        $todo = new Todo;
        $todo->name = $request->name;
        $todo->state = $request->state;
        $todo->user_email = $request->user_email;
        $todo->save();

        return response()->json([
            'status' => 200,
            'message' => 'Todo has been successfully added'
        ], 200);
    }
    public function updatetodo(Request $request)
    {
        // Trouver le Todo par son id
        $todo = Todo::find($request->id);

        // Vérifier si le Todo existe
        if (!$todo) {
            return response()->json([
                'status' => 404,
                'message' => 'Todo not found'
            ], 404);
        }

        // Valider les données de la requête
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string',
            'state' => 'sometimes|required|string',
            'user_email' => 'sometimes|required|string|exists:users,email'
        ]);

        // Si la validation échoue, retourner les erreurs
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        // Si la validation réussit, mettre à jour le Todo
        if ($request->has('name')) {
            $todo->name = $request->name;
        }

        if ($request->has('state')) {
            $todo->state = $request->state;
        }


        $todo->save();

        return response()->json([
            'status' => 200,
            'message' => 'Todo has been successfully updated'
        ], 200);
    }

    public function deletetodo(Request $request)
    {
        // Trouver le Todo par son id
        $todo = Todo::find($request->id);

        // Vérifier si le Todo existe
        if (!$todo) {
            return response()->json([
                'status' => 404,
                'message' => 'Todo not found'
            ], 404);
        }

        // Supprimer le Todo
        $todo->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Todo has been successfully deleted'
        ], 200);
    }



}
