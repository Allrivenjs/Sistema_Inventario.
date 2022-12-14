<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): \Illuminate\Http\Response
    {
        return response(Supplier::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'cc' => 'required|unique:suppliers',
            'name' => 'required',
            'phone' => 'required|unique:suppliers',
            'address' => 'required'
        ]);
        return response(Supplier::query()->create($validate));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function show(Supplier $supplier): \Illuminate\Http\Response
    {
        return response($supplier);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Supplier $supplier): \Illuminate\Http\Response
    {
        $validate = $request->validate([
            'cc' => 'required|unique:suppliers',
            'name' => 'required',
            'phone' => 'required|unique:suppliers',
            'address' => 'required'
        ]);
        $supplier->update($validate);
        return response($supplier);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier): \Illuminate\Http\Response
    {
        $supplier->delete();
        return response(null);
    }
}
