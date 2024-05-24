<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;


class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id1',
        'user_id2'
    ];

    public function messages()
    {
        return $this->hasMany(message::class,'conversation_id');
    }

    public function getUserConversations($userId)
{
    return $this->where(function ($query) use ($userId) {
        $query->where('user_id1', $userId)
              ->orWhere('user_id2', $userId);
    })
    ->with(['messages' => function ($query) use ($userId) {
        $query->with(['sender:id,name,avatar', 'receiver:id,name,avatar']);
    }])
    ->orderBy('updated_at', 'desc')
    ->get()
    ->map(function ($conversation) use ($userId) {
        $idconversation = $conversation->id;
        $destinataire = 'Unknown';
        $destinataireId = null;
        $profilePicture = 'default_avatar.png';
        $messages = [];

        // Si la conversation a des messages, on traite ceux-ci
        if ($conversation->messages->isNotEmpty()) {
            $conversation->messages->each(function ($message) use (&$idconversation, &$destinataire, &$destinataireId, &$profilePicture, &$messages, $userId) {
                $idconversation = $message->conversation_id;
                if ($message->sender_id == $userId) {
                    $destinataire = $message->receiver->name;
                    $destinataireId = $message->receiver->id;
                    $profilePicture = $message->receiver->avatar;
                } else {
                    $destinataire = $message->sender->name;
                    $destinataireId = $message->sender->id;
                    $profilePicture = $message->sender->avatar;
                }

                $messages[] = [
                    'id' => $message->id,
                    'content' => $message->message, // Assurez-vous que le champ est correct
                    'isSent' => $message->sender_id == $userId ? 0 : 1,
                ];
            });
        } else {
            // Définir des valeurs par défaut pour une conversation sans messages
            if ($conversation->user_id1 == $userId) {
                $destinataireId = $conversation->user_id2;
            } else {
                $destinataireId = $conversation->user_id1;
            }
            // Vous pouvez ajouter une requête ici pour récupérer les informations du destinataire
            $destinataireUser = \App\Models\User::find($destinataireId);
            if ($destinataireUser) {
                $destinataire = $destinataireUser->name;
                $profilePicture = $destinataireUser->avatar;
            }
        }

        return [
            'conversation_id' => $idconversation,
            'destinataire' => $destinataire,
            'destinataireId' => $destinataireId,
            'profilePicture' => $profilePicture,
            'messages' => $messages,
        ];
    });
}




}
