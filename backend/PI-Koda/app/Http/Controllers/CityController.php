<?php

namespace App\Http\Controllers;

use App\Models\City;

class CityController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        try {
            $cities = City::all();
            return response()->json($cities);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener las ciudades",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        try {
            $city = City::find($id);
            return response()->json($city);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener la ciudad",
            ], 500);
        }
    }
}
