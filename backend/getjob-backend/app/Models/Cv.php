<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'uuid';

    protected $fillable = [
        'uuid_user',
        'name',
        'surname',
        'email',
        'tel',
        'dob',
        'git',
        'facebook',
        'linkedin',
        'instagram',
        'twitter',
        'wakatime',
        'photo_path'
    ];

    public function occupations()
    {
        return $this->hasMany(Occupation::class);
    }
}
