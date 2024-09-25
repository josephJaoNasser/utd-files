<?php

namespace App\Http\Middleware;

use Closure;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyUTDToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request["account_id"]) return $next($request);

        $accessToken = $request->bearerToken() ?? $request["access_token"];
        $client = new Client();
        $utdResponse = $client->post("https://www.uptodateconnect.com/api/v1/me/token", [
            "headers" => [
                "Authorization" => "Bearer {$accessToken}",
                "ContentType" => "application/json"
            ],
        ]);

        $responseData = json_decode($utdResponse->getBody()->getContents(), true);

        if (!$responseData['success']) {
            return response()->json(["success" => false, "message" => "Invalid UTD token"]);
        }

        $request["account_id"] = $responseData["payload"]["id"];

        return $next($request);
    }
}
