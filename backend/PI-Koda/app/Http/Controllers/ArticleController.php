<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        try {
            $articles = Article::all();
            return response()->json($articles);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al obtener los artículos",
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            $request->validate([
                'title' => 'required',
                'photo' => 'required',
                'description' => 'required',
            ]);
            $article = Article::create($request->all());

            return response()->json([
                "data" => $article,
                "msg" => "Artículo creado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al crear el artículo",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        try {
            $article = Article::find($id);
            return response()->json($article);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al mostrar el artículo",
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article) {
        try {
            $request->validate([
                'title' => 'required',
                'photo' => 'required',
                'description' => 'required',
            ]);
            $article->update($request->all());

            return response()->json([
                "data" => $article,
                "msg" => "Artículo actualizado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al actualizar el artículo",
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article) {
        try {
            $article->delete();
            return response()->json([
                "data" => $article,
                "msg" => "Artículo eliminado",
            ]);
        } catch(\Exception $e) {
            return response()->json([
                "msg" => "Error al eliminar el artículo",
            ], 500);
        }
    }
}
