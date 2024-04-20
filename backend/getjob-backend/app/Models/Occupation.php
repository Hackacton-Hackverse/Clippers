<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Occupation extends Model
{
    use HasFactory;

    protected $fillable = [
        'cv_uuid',
        'datedebut',
        'datefin',
        'occupation',
    ];

    public function cv()
    {
        return $this->belongsTo(Cv::class, 'cv_uuid', 'uuid');
    }
}
