<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Cv;
use App\Models\Offre;
use App\Models\OffreCv;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OffreCvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return OffreCv::with('offre','cv')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
        public function store(Request $request)
        {
            $user_id = Auth::id();
            $fields = $request->validate([
                'offer_id' => 'required|integer|exists:offres,id',
            ]);
            $fields['user_id'] = $user_id;

            $offer = Offre::find($fields['offer_id']);
            
            // Vérifiez si l'utilisateur a un CV
            $cv = Cv::where('user_id', $user_id)->first();
            if ($cv === null) {
                return response()->json("Vous n'avez pas de CV", 422);
            }

            // Vérifiez si l'utilisateur a déjà postulé à cette offre
            $existingApplication = OffreCv::where('cv_id', $cv->id)
                                          ->where('offer_id', $fields['offer_id'])
                                          ->first();

            if ($existingApplication) {
                return response()->json("Vous avez déjà postulé à cette offre", 422);
            }

            

            // Vérifiez que l'utilisateur ne postule pas à sa propre offre
            if ($offer->user_id === $user_id) {
                return response()->json("Vous ne pouvez pas postuler à votre propre offre", 422);
            }

            // Créez l'entrée OffreCv
            $fields['cv_id'] = $cv->id;
            $offrecv = OffreCv::with('offre')->find(OffreCv::create($fields)->id);


            $existingConversation = Conversation::where(function ($query) use ($user_id, $offer) {
                $query->where('user_id1', $user_id)
                    ->where('user_id2', $offer->user_id);
            })->orWhere(function ($query) use ($user_id, $offer) {
                $query->where('user_id1', $offer->user_id)
                    ->where('user_id2', $user_id);
            })->first();

            // Créez la conversation
            if(!$existingConversation)
            {
                $conversation = [
                    'user_id1' => $user_id,
                    'user_id2' => $offer->user_id
                ];
                Conversation::create($conversation);
            }

            return response()->json($offrecv, 201);
        }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return OffreCv::with(['offre','cv'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id,Request $request)
    {
        $offrecv = OffreCv::findOrFail($id);
        $fields = $request->validate([
            'offer_id' => 'sometimes|integer|exists:offres,id',
            'cv_id' => 'sometimes|integer|exists:cvs,id'
        ]);
        $offrecv->update($fields);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        OffreCv::destroy($id);
    }
}

