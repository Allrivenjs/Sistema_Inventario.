<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'brand',
        'sale_code',
        'barcode',
        'group'
    ];

    protected $casts = [
        'code' => 'string',
        'name' => 'string',
        'description' => 'string',
        'brand' => 'string',
        'sale_code' => 'string',
        'barcode' => 'string',
        'group' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
