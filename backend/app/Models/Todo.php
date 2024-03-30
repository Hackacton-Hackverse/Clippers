<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use mysql_xdevapi\Table;

class Todo extends Model
{
    use HasFactory;
    protected $table = 'todo';
    protected $fillable = [
        'name',
        'state',
        'user_email'
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }



}
