<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckIn extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'purchase_document_number',
        'date_of_purchase_at'
    ];

    protected $casts = [
        'supplier_id' => 'integer',
        'purchase_document_number' => 'string',
        'date_of_purchase_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function getDateOfPurchaseAtAttribute($value): string
    {
        return Carbon::parse($value)->diffForHumans(['parts' => 1]);
    }

    public static function generatePurchaseDocumentNumber(): string
    {
        return 'P' . date('YmdHis') . rand(100,999);
    }

    public function supplier(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'products_check_ins')
            ->withPivot('price_per_unit', 'count');
    }


}
