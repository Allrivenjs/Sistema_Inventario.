<?php

namespace App\Http\Controllers;

use App\Models\CheckIn;
use Illuminate\Http\Request;

class CheckInController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(CheckIn::with('supplier', 'products')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_document_number' => 'required|unique:check_ins,purchase_document_number',
            'date_of_purchase_at' => 'required|date',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.price_per_unit' => 'required|numeric',
            'products.*.count' => 'required|integer',
        ]);
        $checkIn = CheckIn::query()->create($validated);
        $checkIn->products()->createMany($validated['products']);
        return response($checkIn->load('supplier', 'products'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CheckIn  $checkIn
     * @return \Illuminate\Http\Response
     */
    public function show(CheckIn $checkIn)
    {
        return response($checkIn->load('supplier', 'products'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CheckIn  $checkIn
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CheckIn $checkIn)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_document_number' => 'required|unique:check_ins,purchase_document_number,' . $checkIn->id,
            'date_of_purchase_at' => 'required|date',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.price_per_unit' => 'required|numeric',
            'products.*.count' => 'required|integer',
        ]);
        $checkIn->update($validated);
        $checkIn->products()->delete();
        $checkIn->products()->createMany($validated['products']);
        return response($checkIn->load('supplier', 'products'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CheckIn  $checkIn
     * @return \Illuminate\Http\Response
     */
    public function destroy(CheckIn $checkIn)
    {
        $checkIn->delete();
        return response(null, 204);
    }
}
