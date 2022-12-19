<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('check_outs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Client::class)->constrained();
            $table->string('sale_document_number')->unique();
            $table->timestamp('sale_at');
            $table->timestamps();
        });

        Schema::create('products_check_outs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\CheckOut::class)->constrained();
            $table->foreignIdFor(\App\Models\Product::class)->constrained();
            $table->unsignedBigInteger('price_per_unit');
            $table->unsignedBigInteger('count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('check_outs');
    }
};
