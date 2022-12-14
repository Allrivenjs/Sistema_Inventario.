<?php

namespace App\Http\Controllers\Auth\V1;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return Response|Application|ResponseFactory
     */
    public function login(Request $request): Response|Application|ResponseFactory
    {return response($this->handleLoginMethod($request));}

    /**
     * @param Request $request
     * @return Response|Application|ResponseFactory
     */
    public function register(Request $request): Response|Application|ResponseFactory
    {return response($this->handleRegisterMethod($request));}

    /**
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function logout(Request $request): Application|ResponseFactory|Response{return response($this->handleLogoutMethod($request));}

    public function isLogged(Request $request): Application|ResponseFactory|Response{return response($this->handleIsLoggedMethod($request));}
}
