<?php

namespace App\Support;

use App\Models\UserFolders;
use League\Flysystem\AwsS3V3\AwsS3V3Adapter as AwsS3V3AwsS3V3Adapter;
use Illuminate\Support\Str;
use Aws\S3\S3Client;
use Exception;
use GuzzleHttp\Client;

class VueFinderClient
{
  public static function get($accountId)
  {
    $userFolder = UserFolders::firstWhere("account_id", $accountId);

    if (!$userFolder) {
      $folderUuid = Str::uuid();
      $payload = [
        "account_id" => $accountId,
        "uuid" => $folderUuid
      ];
      
      $userFolder = UserFolders::create($payload);

      if (env("FOLDER_CREATED_WEBHOOK")) {
        try {
          $client = new Client();
          $client->post(env("FOLDER_CREATED_WEBHOOK"), [
            "json" =>  $payload
          ]);
        } catch (Exception $e) {
          // handle error here
        }
      }
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

    // Set VueFinder class
    $vuefinder = new VueFinder([
      'public' => new AwsS3V3AwsS3V3Adapter($s3client, config($s3configString . "bucket"), $userFolder . "/public"),
      'private' => new AwsS3V3AwsS3V3Adapter($s3client, config($s3configString . "bucket"), $userFolder . "/private")
    ]);

    return $vuefinder;
  }
}
