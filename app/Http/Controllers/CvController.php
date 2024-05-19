<?php

namespace App\Http\Controllers;

use App\Models\Cv;
use App\Models\Occupation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\File;
use function Laravel\Prompts\error;
use Illuminate\Support\Facades\Auth;

class CvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cvs = Cv::with(['occupations','user','offrecvs'])->get();
        foreach ($cvs as $cv) {
            if($cv->photo_path !== null) {
                $cv->photo_path = asset('photos_user/'.$cv->photo_path);
            }
        }
        return $cvs;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'surname' => 'string',
            'email'=> 'required|string|unique:cvs,email',
            'tel' => 'nullable|numeric',
            'dob'=> 'required|date',
            'git' => 'nullable|string',
            'wakatime' => 'nullable|string',
            'facebook' => 'nullable|string',
            'linkedin' => 'nullable|string',
            'instagram' => 'nullable|string',
            'twitter' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096', // Validation pour le fichier photo
            'occupations' => 'array',
            'occupations.*.datedebut' => 'required|date',
            'occupations.*.datefin' => 'nullable|date',
            'occupations.*.occupation' => 'required|string',
        ]);

        $user_id = $userId = Auth::id();

        $photoName = null;
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = date('d-m-Y-H-i-s') . "_" .$fields['email'] . '.' . $photo->getClientOriginalExtension();
            $photo->move('photos_user/', $photoName);
        }

        $cvData = [
            'name' => $fields['name'],
            'surname' => $fields['surname'] ?? null,
            'user_id' => $user_id,
            'email' => $fields['email'],
            'dob' => $fields['dob'],
            'tel' => $fields['tel'] ?? null,
            'git' => $fields['git'] ?? null,
            'wakatime' => $fields['wakatime'] ?? null,
            'facebook' => $fields['facebook'] ?? null,
            'linkedin' => $fields['linkedin'] ?? null,
            'instagram' => $fields['instagram'] ?? null,
            'twitter' => $fields['twitter'] ?? null,
            'photo_path' => $photoName,
        ];

        $cvData = array_filter($cvData, function ($value) {
            return $value !== null;
        });

        $cv = Cv::create($cvData);


        if(isset($fields['occupations'])) {
            foreach ($fields['occupations'] as $occupation) {
                Occupation::create([
                    'cv_id' => $cv->id,
                    'datedebut' => $occupation['datedebut'],
                    'datefin' => $occupation['datefin'],
                    'occupation' => $occupation['occupation'],
                ]);
            }
        }

        $cv1 = Cv::with(['occupations','user'])->find($cv->id);
        if(isset($cv['photo_path'])){
            $cv1['photo_path'] = asset('photos_user/'.$cv1['photo_path']);
        }

        return response()->json($cv1,201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $id = Auth::id();
        $cv = Cv::with(['occupations','user','offrecvs'])->findOrFail($id);
        if(isset($cv['photo_path']) && $cv['photo_path'] !== null){
            $cv['photo_path'] = asset('photos_user/'.$cv->photo_path);
        }
        return response()->json();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $cv = Cv::where();
        $validatedData = $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'email' => 'required|email',
            'tel' => 'nullable|numeric',
            'dob' => 'required|date',
            'git' => 'nullable|url',
            'facebook' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'occupations' => 'required|array',
            'occupations.*.datedebut' => 'required|date',
            'occupations.*.datefin' => 'nullable|date',
            'occupations.*.occupation' => 'required|string',
        ]);
        if (isset($cv['photo_path'])) {
            File::delete(public_path('photos_user/' . $cv['photo_path']));
        }
        $photoName = null;
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = date('d-m-Y-H-i-s') . "_" .$validatedData['email'] . '.' . $photo->getClientOriginalExtension();
            $photo->move('photos_user/', $photoName);
        }


        $cv->update([
            'name' => $validatedData['name'],
            'surname' => $validatedData['surname'],
            'email' => $validatedData['email'],
            'tel' => $fields['tel'] ?? null,
            'git' => $fields['git'] ?? null,
            'wakatime' => $fields['wakatime'] ?? null,
            'facebook' => $fields['facebook'] ?? null,
            'linkedin' => $fields['linkedin'] ?? null,
            'instagram' => $fields['instagram'] ?? null,
            'twitter' => $fields['twitter'] ?? null,
            'photo_path' => $photoName,
        ]);

        // Supprimer les occupations existantes
        $cv->occupations()->delete();

        // Créer les nouvelles occupations
        foreach ($validatedData['occupations'] as $occupationData) {
            $cv->occupations()->create($occupationData);
        }

        $cv1 = Cv::with(['occupations','user','offrecvs'])->find($cv->id);
        if(isset($cv['photo_path'])){
            $cv1['photo_path'] = asset('photos_user/'.$cv1['photo_path']);
        }

        return response()->json($cv1);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cv = Cv::findOrFail($id);

        try {
            if (isset($cv['photo_path'])) {
                File::delete(public_path('photos_user/' . $cv['photo_path']));
            }
            $cv->delete();
            return response()->json(['message' => 'CV deleted successfully']);
        }catch (\Exception) {
            return response()->json(['message' => 'CV was not deleted']);
        }
    }
}
