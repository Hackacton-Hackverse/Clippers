<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'surname',
        'email',
        'tel',
        'dob',
        'wakatime',
        'git',
        'facebook',
        'linkedin',
        'instagram',
        'twitter',
        'photo_path',
    ];


    public function occupations()
    {
        return $this->hasMany(Occupation::class,'cv_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function offrecvs()
    {
        return $this->hasMany(OffreCv::class,'cv_id');
    }
}
