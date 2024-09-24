<?php

use Illuminate\Support\Facades\Route;
use League\Flysystem\Local\LocalFilesystemAdapter;
use Ozdemir\VueFinder\VueFinder;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the UP-TO-DATE File manager API!',
        'Laravel' => app()->version()
    ]);
});

Route::any('/files', function () {
    // Set VueFinder class
    $vuefinder = new VueFinder([
        'local' => new LocalFilesystemAdapter(dirname(__DIR__) . '/storage'),
        'main' =>  new LocalFilesystemAdapter(dirname(__DIR__) . '/main'),
    ]);

    $config = [
        'publicLinks' => [
            'local://public' => url('/storages/public'),
        ],
    ];

    // Perform the class
    $vuefinder->init($config);
});
