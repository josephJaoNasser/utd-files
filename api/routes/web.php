<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => "Welcome to the UP-TO-DATE File manager API. Please use the routes under /api to access the API",
        'LaravelVersion' => app()->version()
    ]);
});
