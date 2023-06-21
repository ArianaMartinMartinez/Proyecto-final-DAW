<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\AnimalUser;
use App\Models\User;
use Illuminate\Http\Request;

class AnimalUserController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index($userId) {
        try {
            $animalUser = AnimalUser::with('animal.shelter.city')->where('user_id', $userId)->get();
            return response()->json($animalUser);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener los favoritos",
            ], 500);
        }
    }

    public function getByUser($userId) {
        try {
            $animalUser = AnimalUser::where('user_id', $userId)->get();
            return response()->json(["data" => $animalUser]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener favoritos por usuario",
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            $user = User::find($request->user_id);
            $animal = Animal::find($request->animal_id);

            $user->animals()->attach($animal);

            return response()->json([
                "msg" => "Animal añadido a favoritos",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al añadir animal favorito",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        try {
            $animalUser = AnimalUser::find($id);
            return response()->json($animalUser);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al mostrar un favorito",
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($animalId, $userId) {
        try {
            AnimalUser::where('animal_id', $animalId)->where('user_id', $userId)->delete();

            return response()->json([
                "msg" => "Favorito eliminado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al eliminar favorito",
            ], 500);
        }
    }
}
