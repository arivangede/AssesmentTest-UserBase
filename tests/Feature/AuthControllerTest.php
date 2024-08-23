<?php

use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


test('register user successfully', function () {
    $data = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '1234567890',
        'password' => 'password123',
    ];

    $response = $this->postJson('/register', $data);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Registration successful! Please check your email to verify your account.',
        ]);

    $user = Admin::where('email', 'test@example.com')->first();
    $this->assertNotNull($user);
    $this->assertNull($user->email_verified_at);
    $this->assertNotNull($user->email_verification_token);
});

test('verify user email successfully', function () {
    $user = Admin::factory()->create([
        'email_verification_token' => 'test-token',
    ]);

    $response = $this->get("/verify-email/{$user->email_verification_token}");

    $response->assertStatus(200)
        ->assertInertia(function ($page) {
            $page->component('Auth/EmailVerificated');
        });

    $user->refresh();

    $this->assertNull($user->email_verification_token);
    $this->assertNotNull($user->email_verified_at);
});

test('login user successfully', function () {
    $hashed = Hash::make('password123');
    $user = Admin::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '1234567890',
        'password' => $hashed,
        'email_verified_at' => now(),
    ]);

    $data = [
        'email' => $user->email,
        'password' => 'password123',
    ];

    $response = $this->postJson('/login', $data);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'token',
            'user' => [
                'id',
                'name',
                'email',
                'phone',
                'email_verified_at',
            ],
        ]);
});

test('logout user successfully', function () {
    $user = Admin::factory()->create();
    Auth::login($user);

    $response = $this->postJson('/logout');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Logged out successfully',
        ]);

    $this->assertFalse(Auth::check());
});