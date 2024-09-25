<?php

use App\Http\Controllers\PinnedFoldersController;
use App\Http\Middleware\VerifyUTDToken;
use App\Models\UserFolders;
use Aws\S3\S3Client;
use Illuminate\Support\Facades\Route;
use Ozdemir\VueFinder\VueFinder;
use Illuminate\Http\Request;
use League\Flysystem\AwsS3V3\AwsS3V3Adapter as AwsS3V3AwsS3V3Adapter;
use Illuminate\Support\Str;

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

        $userFolder = UserFolders::firstWhere("account_id", $accountId);

        if (!$userFolder) {
            $userFolder = UserFolders::create([
                "account_id" => $accountId,
                "uuid" => Str::uuid()
            ]);
        }

        $folderUuid = $userFolder["uuid"];

        $s3configString = "filesystems.disks.s3.";
        $options = [
            "credentials" => [
                "key" => config($s3configString . "key"),
                "secret" => config($s3configString . "secret"),
            ],
            "region" => config($s3configString . "region"),
            'version' => 'latest',
        ];

        $userFolder = $folderUuid ?? '';

        $s3client = new S3Client($options);
        $s3Adapter = new AwsS3V3AwsS3V3Adapter($s3client, config($s3configString . "bucket"), $userFolder);

        // Set VueFinder class
        $vuefinder = new VueFinder([
            'public' => $s3Adapter,
        ]);

        $config = [
            'publicLinks' => [
                // 'local://public' => url('/storage/public'),
            ],
        ];

        // Perform the class
        $vuefinder->init($config);
    });
});
