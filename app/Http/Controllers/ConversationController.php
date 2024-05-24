<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::id();
        $conversations = (new \App\Models\Conversation)->getUserConversations($user_id);
        return response()->json($conversations);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user_id1 = Auth::id();

        // Validation des champs
        $fields = $request->validate([
            'email' => 'required|exists:users,email'
        ]);

        // Récupération de l'utilisateur correspondant à l'email
        $user2 = User::where('email', $fields['email'])->firstOrFail();

        // Ajout des IDs utilisateurs dans les champs
        $fields['user_id1'] = $user_id1;
        $fields['user_id2'] = $user2->id;
        if ($fields['user_id1'] === $fields['user_id2']) {
            return response()->json(['error' => 'Cannot create a conversation with yourself'], 400); // 400 pour Bad Request
        }

        // Vérification de l'existence du couple d'utilisateurs dans les conversations
        $existingConversation = Conversation::where(function ($query) use ($user_id1, $user2) {
            $query->where('user_id1', $user_id1)
                ->where('user_id2', $user2->id);
        })->orWhere(function ($query) use ($user_id1, $user2) {
            $query->where('user_id1', $user2->id)
                ->where('user_id2', $user_id1);
        })->first();

        if ($existingConversation) {
            return response()->json(['error' => 'Conversation already exists'], 409); // 409 pour Conflict
        }

        // Création de la conversation
        try {
            $conversation = Conversation::create($fields);
            return response()->json($conversation, 201); // 201 pour Created
        } catch (\Exception $e) {
            // Gestion des erreurs
            return response()->json(['error' => 'Failed to create conversation'], 500); // 500 pour Internal Server Error
        }
    }



    /**
     * Display the specified resource.
     */
    public function show()
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resomessage urce from storage.
     */
    public function destroy($id)
    {
        //
    }
}
