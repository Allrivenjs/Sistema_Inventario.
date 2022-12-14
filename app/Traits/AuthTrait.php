<?php

namespace App\Traits;

use App\Models\SocialProfile;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rules;

trait AuthTrait
{
    private String $token;
    protected function authWeb(): \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
    {
        return auth()->guard('web');
    }

    protected function authApi(): \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
    {
        return auth()->guard('api');
    }

    public function handleLoginMethod(Request $request): array
    {
        $request->validate($this->rulesLogin());
        abort_unless(
            $this->authWeb()->attempt($request->only('email', 'password')),
            Response::HTTP_FORBIDDEN,
            'Invalid credentials'
        );
        $tokenResult = $this->authWeb()->user()->createToken('authToken');
        $token = $tokenResult->token;
        $this->remember_me($token, $request);
        return $this->returnDataUser($this->authWeb()->user(), $tokenResult);
    }

    public function handleRegisterMethod(Request $request): array
    {
        $validatedData = $request->validate($this->rulesRegister());
        $validatedData['password'] = Hash::make($request->input('password'));
        try {
            $user = User::query()->create($validatedData);
        } catch (QueryException $e) {
            abort($e->getCode(), $e->getMessage());
        }
        $this->loginMethod($user);
        $tokenResult = $user->createToken('authToken');
        return $this->returnDataUser($user, $tokenResult);
    }

    public function loginMethod(User | Model $user): array
    {
        $this->authWeb()->login($user);
        $token = $user->createToken('authToken');
        return $this->returnDataUser($user, $token);
    }

    private function returnDataUser($user, $token): array
    {
        return [
            'user' => $user,
            'roles' => $user->role,
            'access_token' => $token->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->token->expires_at)->toDateTimeString(),
        ];
    }

    public function handleLogoutMethod(Request $request): string
    {
        $request->user()->token()->revoke();
        return 'Logout successfully';
    }

    public function handleIsLoggedMethod(Request $request)
    {
        return $request->user();
    }

    protected function remember_me($token, Request $request): void
    {
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
            $token->save();
        }
    }

    protected function rulesLogin(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required',
        ];
    }

    protected function rulesRegister(): array
    {
        return [
            'email' => 'required|email|unique:users',
            'password' => ['required', Rules\Password::defaults()],
        ];
    }
}
