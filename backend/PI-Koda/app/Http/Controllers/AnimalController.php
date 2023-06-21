<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        try {
            $animals = Animal::with('shelter.city')->orderBy('created_at', 'desc')->paginate(20);
            return response()->json($animals);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener los animales",
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
                'animal_type' => 'required',
                'breed' => 'required',
                'gender' => 'required',
                'date_birth' => 'required',
                'description' => 'required',
                'shelter_id' => 'required',
            ]);
            $animal = Animal::create($request->all());

            return response()->json([
                "data" => $animal,
                "msg" => "Animal creado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al crear el animal",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        try {
            $animal = Animal::with('shelter.city')->find($id);
            return response()->json($animal);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al mostrar el animal",
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Animal $animal) {
        try {
            $request->validate([
                'name' => 'required',
                'animal_type' => 'required',
                'breed' => 'required',
                'gender' => 'required',
                'date_birth' => 'required',
                'description' => 'required',
                'shelter_id' => 'required',
            ]);
            $animal->update($request->all());

            return response()->json([
                "data" => $animal,
                "msg" => "Animal actualizado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al actualizar el animal",
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Animal $animal) {
        try {
            $animal->delete();
            return response()->json([
                "data" => $animal,
                "msg" => "Animal eliminado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al eliminar el animal",
            ], 500);
        }
    }

    /**
     * Filter animals
    */
    public function filterAnimals(Request $request) {
        try {
            $query = Animal::query();

            if($request->has('animalType')) {
                $query->where('animal_type', 'like', $request->input('animalType'));
            }

            if($request->has('gender')) {
                $query->where('gender', 'like', $request->input('gender'));
            }

            if($request->has('city')) {
                $query->whereHas('shelter.city', function ($query) use ($request){
                    $query->where('id', 'like', $request->input('city'));
                });
            }

            if($request->has('breed')) {
                $query->where('breed', 'like', '%'.$request->input('breed').'%');
            }

            $animals = $query->with('shelter.city')->orderBy('created_at', 'desc')->paginate(20);

            return response()->json($animals);
        }catch (\Exception $e) {
            return response()->json([
                "msg" => "Error obteniendo los animales filtrados",
            ], 500);
        }
    }
}
