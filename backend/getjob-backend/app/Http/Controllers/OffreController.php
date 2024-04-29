<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offres = Offre::all();

        return $offres;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'description'=>'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'uuid_admin' => 'required|string'
        ]);

        $photo = $request -> file('photo');
        $photoName = date('d-m-Y-H-i-s'). "-" .$fields['name']."-".$fields['uuid_admin'].'.'.$photo->getClientOriginalExtension();
        $photo->move('photos_job/',$photoName);


        $offerData = array(
            'name' => $fields['name'],
            'description' => $fields['description'],
            'lienphoto' => $photoName,
            'uuid_admin' => $fields['uuid_admin']
        );

        $offer = Offre::create($offerData);

        return $offer;

    }

    /**
     * Display the specified resource.
     */

    public function show($id)
    {
        $offre = Offre::find($id);

        return response()->json($offre);
    }

    /**
     * show all job for one admin
     */


    public function showjobAdmin(string $uuid)
    {
        //
        $offre = Offre::where('uuid_admin',$uuid)->get();

        return response()->json($offre);
    }

    /**
     * search the specified resource from storage.
     */
    public function search(string $name)
    {
        return Offre::where('name', 'like', '%'.$name.'%')->get();
    }


    /**
     * Update the specified resource in storage.
     */
    public function update($id ,Request $request)
    {
        //
        $validateData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'uuid_admin' => 'required|string'
        ]);

        $offre = Offre::find($id);
        File::delete(public_path('photos_job/'.$offre['lienphoto']));

        $photo = $request -> file('photo');
        $photoName = date('d-m-Y-H-i-s'). "-" .$offre['id']."-".$validateData['uuid_admin'].'.'.$photo->getClientOriginalExtension();
        $photo->move('photos_job/',$photoName);
        $offre->update([
            'name' => $validateData['name'],
            'description' => $validateData['description'],
            'lienphoto' => $photoName,
        ]);


        return response()->json($offre);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $offre = Offre::find($id);
        File::delete(public_path('photos_job/'.$offre['lienphoto']));
        $offre->delete();
    }

    public function destroyAll()
    {
        Offre::truncate();

        return response()->json(['message' => 'All offers was delete succefully']);
    }
}
