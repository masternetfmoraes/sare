<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],[
            'name.required'=>'É necessário preencher o nome',
            'email.required'=>'É necessário preencher o campo email',
            'password.required'=>'É necessário a senha',
            'password.confirmed'=>'Os campos senha e confirmar senha não são iguais',
        ]);
        function generateCode($length) {
            $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            $code = '';
            $charactersLength = strlen($characters);
            
            for ($i = 0; $i < $length; $i++) {
                $code .= $characters[rand(0, $charactersLength - 1)];
            }
            
            return $code;
        }
        $cod_user = generateCode(18);
        $user = User::create([
            'cod_user'=>$cod_user,
            'name' => $request->name,
            'type_user'=>'admin',
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
