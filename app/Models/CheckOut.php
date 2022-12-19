<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckOut extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'sale_document_number',
        'sale_at'
    ];

    protected $casts = [
        'client_id' => 'integer',
        'sale_document_number' => 'string',
        'sale_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public static function generateSaleDocumentNumber()
    {
        return 'S' . Carbon::now()->format('YmdHis').rand(1000, 9999);
    }

    public function getSaleAtAttribute($value): string
    {
        return Carbon::parse($value)->diffForHumans(['parts' => 1]);
    }

    public function client(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'products_check_outs')
            ->withPivot('price_per_unit', 'count');
    }


}
