<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'admin_id'
    ];

    public function users()
    {
        return $this->hasMany(GroupUser::class,'group_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class,'admin_id');
    }

    public function messages()
    {
        return $this->hasMany(message::class,'group_id');
    }
}
