<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'cc',
        'name',
        'phone',
        'address'
    ];

    protected $casts = [
        'cc' => 'string',
        'name' => 'string',
        'phone' => 'string',
        'address' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];


    public function checkIns(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CheckIn::class);
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'products_check_ins')
            ->withPivot('price_per_unit', 'count');
    }

}
