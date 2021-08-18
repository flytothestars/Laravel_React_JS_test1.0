<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MainController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/main', [MainController::class, 'startTrueFalse']);
Route::post('/data', [MainController::class, 'process'])->middleware('throttle:6000,1');
Route::get('/fetch', [MainController::class, 'fetch'])->middleware('throttle:6000,1');
Route::post('/action', [MainController::class, 'actionUser'])->middleware('throttle:6000,1');
