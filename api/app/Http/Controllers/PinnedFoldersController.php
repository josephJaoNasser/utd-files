<?php

namespace App\Http\Controllers;

use App\Models\PinnedFolders;
use App\Support\VueFinderClient;
use Illuminate\Http\Request;

class PinnedFoldersController extends Controller
{
    public function index(Request $request)
    {
        $accountId = $request["account_id"];
        $vuefinder = VuefinderClient::get($accountId);

        $pinnedFolders = PinnedFolders::where('account_id',  $accountId)->get();
        $pinnedFolders = $pinnedFolders->filter(function ($folder) use ($vuefinder) {
            $folderData = json_decode($folder["folder_data"], true);
            return $vuefinder->directoryExists($folder['path'], $folderData["storage"]);
        });

        return response()->json($pinnedFolders);
    }

    public function store(Request $request)
    {
        $createdPins = [];
        foreach ($request["folders"] as $folder) {
            $existingPin = PinnedFolders::where("account_id", $request["account_id"])->where("path", $folder["path"])->first();

            if (!$existingPin) {
                $pinnedFolder = new PinnedFolders();
                $pinnedFolder->account_id = $request["account_id"];
                $pinnedFolder->path = $folder["path"];
                $pinnedFolder->folder_data = json_encode($folder);
                $pinnedFolder->save();

                array_push($createdPins, $pinnedFolder);
            }
        }

        return response()->json(["success" => true, "folders" => $createdPins]); //->json($pinnedFolder);
    }

    public function destroy(Request $request)
    {
        $pinnedFolder = PinnedFolders::where("account_id", $request["account_id"])->where("path", $request["path"]);
        $pinnedFolder->delete();

        return response()->json(["success" => true]);
    }
}
