<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('user_token')->plainTextToken;
            return response()->json(['token' => $token, 'user' => $user]);
        } else {
            return response()->json(['msg' => 'Credenciales inválidas'], 500);
        }
    }

    public function logout() {
        Auth::logout();

        return response()->json(['msg' => 'Cerrando sesión']);
    }
}
