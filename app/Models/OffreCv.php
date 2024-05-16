<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreCv extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id',
        'cv_id',
    ];

    public function offre()
    {
        return $this->belongsTo(Offre::class,'offer_id');
    }

    public function cv()
    {
        return $this->belongsTo(Cv::class,'cv_id');
    }
}
