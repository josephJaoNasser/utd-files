<?php

use App\Http\Controllers\PinnedFoldersController;
use App\Http\Middleware\VerifyUTDToken;
use App\Support\VueFinderClient;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
use Ozdemir\VueFinder\VueFinder;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the UP-TO-DATE File manager API!',
        'Laravel' => app()->version()
    ]);
});

Route::middleware([VerifyUTDToken::class])->prefix('/files')->group(function () {
    Route::get('/pinned-folders', [PinnedFoldersController::class, "index"]);
    Route::post('/pinned-folders', [PinnedFoldersController::class, "store"]);
    Route::delete('/pinned-folders', [PinnedFoldersController::class, "destroy"]);

    Route::any('/', function (Request $request) {
        $accountId = $request["account_id"];

        if (!$accountId) {
            return response()->json(['message' => 'Invalid account_id'], 400);
        }
        
        $vuefinder = VueFinderClient::get($accountId);

        $config = [
            'publicLinks' => [
                // 'local://public' => url('/storage/public'),
            ],
        ];
        
        // Perform the class
        $vuefinder->init($config);
    });
});
