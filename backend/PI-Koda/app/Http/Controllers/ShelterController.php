<?php

namespace App\Http\Controllers;

use App\Models\Shelter;
use Illuminate\Http\Request;

class ShelterController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        try {
            $shelters = Shelter::with('city')->orderBy('created_at', 'desc')->paginate(20);
            return response()->json($shelters);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener las protectoras",
            ], 500);
        }
    }

    public function getByUser($userId) {
        try {
            $shelter = Shelter::where('user_id', $userId)->with(['city', 'animals'])->get();

            return response()->json($shelter);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener protectora por usuario",
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'description' => 'required',
                'user_id' => 'required',
                'city_id' => 'required',
            ]);
            $shelter = Shelter::create($request->all());

            return response()->json([
                "data" => $shelter,
                "msg" => "Protectora creada",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al crear la protectora",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        try {
            $shelter = Shelter::with(['city', 'animals'])->find($id);
            return response()->json($shelter);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al mostrar la protectora",
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shelter $shelter) {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'description' => 'required',
                'user_id' => 'required',
                'city_id' => 'required',
            ]);
            $shelter->update($request->all());

            return response()->json([
                "data" => $shelter,
                "msg" => "Protectora actualizada",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al actualizar la protectora",
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shelter $shelter) {
        try {
            $shelter->delete();
            return response()->json([
                "data" => $shelter,
                "msg" => "Protectora eliminada",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al eliminar la protectora",
            ], 500);
        }
    }

    /**
     * Filter shelters
     */
    public function filterShelters(Request $request) {
        try {
            $query = Shelter::query();

            if($request->has('shelter')) {
                $query->where('id', 'like', $request->input('shelter'));
            }

            if($request->has('city')) {
                $query->where('city_id', 'like', $request->input('city'));
            }

            $shelters = $query->with('city')->orderBy('created_at', 'desc')->paginate(20);

            return response()->json($shelters);
        }catch (\Exception $e) {
            return response()->json([
                "msg" => "Error obteniendo las protectoras filtradas",
            ], 500);
        }
    }
}
