<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'password' => 'required',
                'user_role' => 'required',
            ]);
            $user = User::create($request->all());

            return response()->json([
                "data" => $user,
                "msg" => "Usuario creado con éxito",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al crear un usuario",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        $user = User::find($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user) {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
            ]);
            $user->update($request->all());

            return response()->json([
                "data" => $user,
                "msg" => "Usuario actualizado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al actualizar el usuario",
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) {
        try {
            $user->delete();

            return response()->json([
                "data" => $user,
                "msg" => "Usuario eliminado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al eliminar el usuario",
            ], 500);
        }
    }
}
