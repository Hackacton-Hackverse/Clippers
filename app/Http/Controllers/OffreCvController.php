<?php

namespace App\Http\Controllers;

use App\Models\OffreCv;
use Illuminate\Http\Request;

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
        $fields = $request->validate([
            'offer_id'=>'required|integer|exists:offres,id',
            'cv_id' => 'required|integer|exists:cvs,id'
        ]);

        return response()->json(OffreCv::create($fields),201) ;
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

