<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'cc',
        'name',
        'lastname'
    ];

    protected $casts = [
        'cc' => 'string',
        'name' => 'string',
        'lastname' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];


}
