<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): \Illuminate\Http\Response
    {
        return response(Product::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): \Illuminate\Http\Response
    {
        $validate = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'code' => 'required|unique:products',
            'brand' => 'required',
            'sale_code' => 'required',
            'barcode' => 'required',
            'group' => 'required'
        ]);
        return response(Product::query()->create($validate));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product): \Illuminate\Http\Response
    {
        return response($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validate = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'code' => 'required|unique:products,code,'.$product->id,
            'brand' => 'required',
            'sale_code' => 'required',
            'barcode' => 'required',
            'group' => 'required'
        ]);
        $product->update($validate);
        return response($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product): \Illuminate\Http\Response
    {
        $product->delete();
        return response(null);
    }
}
