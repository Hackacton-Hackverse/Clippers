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
        $fields = $request->validate([
            "user_id2" => 'required|exists:users,id'
        ]);
        $fields['user_id1'] = $user_id1;

        return response()->json(Conversation::create($fields));

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
