<?php

namespace App\Http\Controllers;

use App\Models\message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return message::with(['conversation','sender','receiver','group'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'message'=>'required|string',
            'sender_id' => 'required|integer|exists:users,id',
            'receiver_id' => 'sometimes|integer|exists:users,id',
            'group_id' => 'sometimes|integer|exists:users,id',
            'conversation_id' => 'sometimes|integer|exists:conversations,id',
        ]);

        return response()->json(message::create($fields),201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return message::with(['conversation','sender','receiver','group'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $message = message::findOrFail($id);

        $fields = $request->validate([
            'message'=>'required|string'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return response()->json(message::destroy($id),204);
    }
}
