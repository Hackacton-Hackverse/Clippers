<?php

namespace App\Http\Controllers;

use App\Models\Offer_user;
use Illuminate\Http\Request;

class offer_userController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'id_offer' => 'required|numeric',
            'uuid_user' => 'required|string'
        ]);

        $offrechoose = array(
            'id_offer' => $fields['id_offer'],
            'uuid_user' => $fields['uuid_user']
        );

        return Offer_user::create($offrechoose);
    }

    /**
     * Display the specified resource.
     */
    public function show(offer_user $offer_user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, offer_user $offer_user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($uuid)
    {
        $offre_user = Offer_user::find($uuid);

        return $offre_user->delete();
    }
}
