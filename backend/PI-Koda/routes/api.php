<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\AnimalUserController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ShelterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);
Route::get('/logout', [LoginController::class, 'logout']);
Route::get('/animalUser/{userId}', [AnimalUserController::class, 'getByUser']);
Route::get('/animalUser/all/{userId}', [AnimalUserController::class, 'index']);
Route::delete('/animalUser/{animalId}/{userId}', [AnimalUserController::class, 'destroy']);
Route::get('/shelters/byUser/{userId}', [ShelterController::class, 'getByUser']);


Route::resource('animals', AnimalController::class);
Route::resource('animalUser', AnimalUserController::class);
Route::resource('articles', ArticleController::class);
Route::resource('cities', CityController::class);
Route::resource('shelters', ShelterController::class);
Route::resource('users', UserController::class);

Route::get('/filterAnimals', [AnimalController::class, 'filterAnimals']);
Route::get('/filterShelters', [ShelterController::class, 'filterShelters']);
