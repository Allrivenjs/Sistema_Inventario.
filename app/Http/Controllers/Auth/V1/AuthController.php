<?php

namespace App\Http\Controllers\Auth\V1;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\Response|Application|ResponseFactory
     */
    public function login(Request $request): \Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory{return response($this->handleLoginMethod($request));}

    /**
     * @param Request $request
     * @return \Illuminate\Http\Response|Application|ResponseFactory
     */
    public function register(Request $request): \Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory{return response($this->handleRegisterMethod($request));}

    /**
     * @param Request $request
     * @return Application|ResponseFactory|\Illuminate\Http\Response
     */
    public function logout(Request $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response{return response($this->handleLogoutMethod($request));}
}
