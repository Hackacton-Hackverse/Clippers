<?php

namespace App\Http\Controllers;

use App\Models\Cv;
use App\Models\Occupation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CvController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        // Récupérer tous les CV avec les occupations
        $cvs = Cv::with('occupations')->get();

        // Ajouter le contenu de la photo à chaque CV
        $cvs->transform(function ($cv) {
            $cv->photo_content = $cv->photo_path ? Response::file(public_path('photos/'.$cv->photo_path)) : null;
            return $cv;
        });

        return $cvs;
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name'=> 'required|string',
            'uuid_user' => 'required|string',
            'surname' => 'string',
            'email'=> 'required|string|unique:cvs,email',
            'tel' => 'nullable|numeric',
            'dob'=> 'required|date',
            'git' => 'nullable|url',
            'facebook' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validation pour le fichier photo
            'occupations' => 'array',
            'occupations.*.datedebut' => 'required|date',
            'occupations.*.datefin' => 'nullable|date',
            'occupations.*.occupation' => 'required|string',
        ]);

        // Gérer l'upload de la photo s'il y en a une
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = date('d-m-Y-H-i-s') . "_" .$fields['email'] . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('photos_user'), $photoName);
        }

//        if($photoprofile = $request->file('photo')) {
//            $destinationpath = 'public/';
//            $profilimage = date('d-m-Y-H-i-s').".".$photoprofile->getClientOriginalExtension();
//            $photoprofile->move($destinationpath,$profilimage);
//        }

        $cvData = array(
            'name' => $fields['name'],
            'surname' => isset($fields['surname']) ? $fields['surname'] : null,
            'uuid_user' => $fields['uuid_user'],
            'email' => $fields['email'],
            'dob' => $fields['dob'],
            'tel' => isset($fields['tel']) ? $fields['tel'] : null,
            'git' => isset($fields['git']) ? $fields['git'] : null,
            'wakatime' => isset($fields['wakatime']) ? $fields['wakatime'] : null,
            'facebook' => isset($fields['facebook']) ? $fields['facebook'] : null,
            'linkedin' => isset($fields['linkedin']) ? $fields['linkedin'] : null,
            'instagram' => isset($fields['instagram']) ? $fields['instagram'] : null,
            'twitter' => isset($fields['twitter']) ? $fields['twitter'] : null,
            'photo_path' => isset($photoName) ? $photoName : null, // Chemin de la photo si téléchargée
        );


        $cvData = array_filter($cvData, function ($value) {
            return $value !== null;
        });

        $cv = Cv::create($cvData);


        if(isset($fields['occupations'])) {
            foreach ($fields['occupations'] as $occupation) {
                Occupation::create([
                    'cv_uuid' => $cv->uuid,
                    'datedebut' => $occupation['datedebut'],
                    'datefin' => $occupation['datefin'],
                    'occupation' => $occupation['occupation'],
                ]);
            }
        }





        return $cv->uuid;
        // Retournez une réponse appropriée, par exemple une redirection ou un message de réussite
    }


    /**
     * Display the specified resource.
     */

    public function show(string $uuid)
    {
        // Rechercher le CV avec l'UUID spécifié et charger les occupations associées
        $cv = Cv::where('uuid_user', $uuid)->with('occupations')->firstOrFail();

        // Retourner le CV trouvé sous forme de réponse JSON
        return response()->json($cv);
    }



    public function showall()
    {
        // Récupérer tous les CV avec leurs occupations
        $cvs = Cv::with('occupations')->get();

        // Formater les données pour correspondre au format spécifié
        $formattedCvs = $cvs->map(function ($cv) {
            return [
                'name' => $cv->name,
                'surname' => $cv->surname,
                'email' => $cv->email,
                'tel' => $cv->tel,
                'dob' => $cv->dob,
                'git' => $cv->git,
                'facebook' => $cv->facebook,
                'linkedin' => $cv->linkedin,
                'instagram' => $cv->instagram,
                'twitter' => $cv->twitter,
                'occupations' => $cv->occupations->map(function ($occupation) {
                    return [
                        'datedebut' => $occupation->datedebut,
                        'datefin' => $occupation->datefin,
                        'occupation' => $occupation->occupation
                    ];
                })
            ];
        });

        // Retourner les CVs formatés
        return response()->json($formattedCvs);
    }


    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, Cv $cv)
    {
        // Valider les données de la requête
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
            'occupations' => 'required|array',
            'occupations.*.datedebut' => 'required|date',
            'occupations.*.datefin' => 'nullable|date',
            'occupations.*.occupation' => 'required|string',
        ]);

        // Mettre à jour les données du CV
        $cv->update([
            'name' => $validatedData['name'],
            'surname' => $validatedData['surname'],
            'email' => $validatedData['email'],
            'tel' => $validatedData['tel'],
            'dob' => $validatedData['dob'],
            'git' => $validatedData['git'],
            'facebook' => $validatedData['facebook'],
            'linkedin' => $validatedData['linkedin'],
            'instagram' => $validatedData['instagram'],
            'twitter' => $validatedData['twitter'],
        ]);

        // Supprimer les occupations existantes
        $cv->occupations()->delete();

        // Créer les nouvelles occupations
        foreach ($validatedData['occupations'] as $occupationData) {
            $cv->occupations()->create($occupationData);
        }

        // Retourner le CV mis à jour avec ses occupations
        return response()->json($cv->fresh()->load('occupations'));
    }


    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Cv $cv)
    {
        // Supprimer le CV de la base de données
        $cv->delete();

        // Retourner une réponse JSON indiquant que le CV a été supprimé avec succès
        return response()->json(['message' => 'CV deleted successfully']);
    }


    public function destroyAll()
    {
        // Supprimer tous les CV de la base de données
        Cv::truncate();

        // Retourner une réponse JSON indiquant que tous les CV ont été supprimés avec succès
        return response()->json(['message' => 'All CVs deleted successfully']);
    }

}

