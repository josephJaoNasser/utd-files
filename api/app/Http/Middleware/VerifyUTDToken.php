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
        if ($request["account_id"] && $request->method() === "GET") return $next($request);

        $accessToken = $request->bearerToken() ?? $request["access_token"];

        if (!$accessToken) {
            $failMsg = $request->method() !== "GET" ?
                "UTD token required for POST, PATCH, or DELETE requests." :
                "Pass the account id for GET requests. Alternatively, you may also pass the access token";

            return response([
                "success" => false,
                "message" =>  $failMsg
            ], 401);
        }

        $client = new Client();
        $utdResponse = $client->post("https://www.uptodateconnect.com/api/v1/me/token", [
            "headers" => [
                "Authorization" => "Bearer {$accessToken}",
                "ContentType" => "application/json"
            ],
        ]);

        $responseData = json_decode($utdResponse->getBody()->getContents(), true);

        if (!$responseData['success']) {
            return response(["success" => false, "message" => "Invalid UTD token"], 401);
        }

        if (!isset($request["account_id"]) && $responseData["payload"]["id"]) {
            $request["account_id"] = $responseData["payload"]["id"];
        }

        return $next($request);
    }
}
