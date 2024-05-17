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
                $query->select('messages.*', \DB::raw(
                    'CASE
                WHEN sender_id = '.$userId.' THEN "" || message
                ELSE "" || message
            END AS content'
                ), \DB::raw(
                    'CASE
                WHEN sender_id = '.$userId.' THEN 0
                ELSE 1
            END AS isSent'
                ));
                $query->with(['sender:id,name,avatar', 'receiver:id,name,avatar']);
            }])
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($conversation) use ($userId) {
                $destinataire = null;
                $destinataireId = null;
                $profilePicture = null;
                $messages = [];

                $conversation->messages->map(function ($message) use (&$destinataire, &$destinataireId, &$profilePicture, &$messages, $userId) {
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
                        'id' => $message->id, // Ajout de l'ID du message
                        'content' => $message->content,
                        'isSent' => $message->isSent,
                    ];
                });

                return [
                    'destinataire' => $destinataire,
                    'destinataireId' => $destinataireId,
                    'profilePicture' => $profilePicture,
                    'messages' => $messages,
                ];
            });
    }


}
