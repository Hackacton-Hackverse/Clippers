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
            'offer_id'=>'required|integer|exists:offres,id',
        ]);
        $fields['user_id'] = $user_id;

        $id_creator = Offre::find($fields['offer_id']);

        $cv = Cv::where('user_id', $fields['user_id'])->first();
        if ($cv === null){
            return response()->json("you don't have any cv",422);
        }else{
            if ($id_creator !== $user_id) {
                $fields['cv_id'] = $cv->id;
                $user_id1 = $fields['user_id'];
                $offrecv = OffreCv::with('offre')->find((OffreCv::create($fields))->id);
                $user_id2 = $offrecv->offre->user_id;
                    $conversation = [
                        'user_id1' => $user_id1,
                        'user_id2' => $user_id2
                    ];
                    Conversation::create($conversation);
                return response()->json($offrecv, 201);
            } else {
                return response()->json("vous ne pouvez pas postuler a votre propre offre",422);
            }
        }

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

