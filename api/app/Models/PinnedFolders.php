<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsEncryptedArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PinnedFolders extends Model
{
    use HasFactory;

    public $table = "pinned_folders";

    protected $fillable = [
        "account_id",
        "folder_data",
        "path",
    ];

    protected $casts = [
        'configuration' => AsEncryptedArrayObject::class
    ];
}
