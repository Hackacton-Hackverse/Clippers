<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class offer_user extends Model
{
    use HasFactory, HasUuids;
    protected $primaryKey = 'uuid';

    protected $fillable = [
        'id_offer',
        'uuid_user'
    ];

}
