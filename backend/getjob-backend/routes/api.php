<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\CvController;
use \App\Http\Controllers\OffreController;
use \App\Http\Controllers\offer_userController;

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

Route::post('/add', [CvController::class, 'store']);
Route::get('/get', [CvController::class, 'index'] );
Route::delete('delete/{uuid}',[CvController::class,'destroy']);
Route::put('update/{uuid}',[CvController::class, 'update']);


Route::get('/offers', [OffreController::class, 'index']);
Route::post('/offer/add',[OffreController::class, 'store']);
Route::post('/offer/{id}/edit',[OffreController::class,'update']);
Route::get('/offer/get/{id}', [OffreController::class, 'show']);
Route::get('/offer/search/{name}',[OffreController::class,'search']);
Route::get('/offer/{uuid_admin}',[OffreController::class,'showjobAdmin']);
Route::delete('/offer/{id}',[OffreController::class,'destroy']);


Route::post('/offeruser',[offer_userController::class, 'store'] );
Route::delete('/offeruser/{uuid}',[offer_userController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



require __DIR__.'/auth.php';
