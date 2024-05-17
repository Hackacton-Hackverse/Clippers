<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Conversation::with('messages')->get();
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            "user_id1" => 'required|exists:users,id',
            "user_id2" => 'required|exists:users,id'
        ]);

        return response()->json(Conversation::create($fields));

    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $conversations = (new \App\Models\Conversation)->getUserConversations($user_id);
        return response()->json($conversations);
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
