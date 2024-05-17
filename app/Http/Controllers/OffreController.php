<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class OffreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offres =  Offre::with('user')->get();

        foreach ($offres as $offre) {
            $offre->lienphoto = asset('photo_offre/'.$offre->lienphoto);
        }

        return $offres;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'lienphoto' => 'required|image|max:4096',
            'user_id' => 'required|integer|exists:users,id'
        ]);

        $photoName = date('d-m-Y-H-i-s') . "-" . $fields['name'] . $fields['user_id'].'.'.$fields['lienphoto']->getClientOriginalExtension();
        $fields['lienphoto']->move('photo_offre/',$photoName);
        $fields['lienphoto'] = $photoName;

        $offre = Offre::create($fields);
        $offre->lienphoto = asset('photo_offre/'.$offre->lienphoto);

        return response()->json($offre,201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $offre = Offre::with('user')->findOrFail($id);

        $offre->lienphoto = asset('photo_offre/'.$offre->lienphoto);

        return $offre;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $offre = Offre::FindOrFail($id);
        $fields = $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'lienphoto' => 'sometimes|image|max:4096',
            'user_id' => 'sometimes|integer|exists:users,id'
        ]);

        if($request->hasFile('lienphoto')) {
            File::delete(public_path('/photo_offre/'.$offre->lienphoto));
            $photoName = date('d-m-Y-H-i-s') . "-" . $fields['name'] . $fields['user_id'] . '.' . $fields['lienphoto']->getClientOriginalExtension();
            $fields['lienphoto']->move('photo_offre/' , $photoName);
            $fields['lienphoto'] = $photoName;
        }
        $offre->update($fields);

        $offre->lienphoto = asset('photo_offre/'.$offre->lienphoto);
        return $offre;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $offre = Offre::FindOrFail($id);
        File::delete(public_path('photo_offre/'.$offre->lienphoto));
        $offre->delete();

        return response()->json('', 204);
    }
}
