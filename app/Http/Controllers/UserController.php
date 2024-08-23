<?php
namespace App\Http\Controllers;

use App\Http\Requests\MassUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use \App\Jobs\SendConfirmationEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Display a listing of the users.
    public function index()
    {
        return UserResource::collection(User::all());
    }

    // Store a newly created user in storage.
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = bcrypt($validated['password']);
        $user = User::create($validated);

        // Dispatch job untuk mengirim email konfirmasi
        SendConfirmationEmail::dispatch($user);

        return new UserResource($user);
    }

    // Display the specified user.
    public function show(User $user)
    {
        return new UserResource($user);
    }

    // Update the specified user in storage.
    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();
        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }
        $user->update($validated);
        return new UserResource($user);
    }

    // Remove the specified user from storage.
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

    public function massCreate(MassUserRequest $request)
    {
        $data = $request->validated();

        foreach ($data['users'] as $userData) {
            $userData['password'] = Hash::make($userData['password']);
            $user = User::create($userData);

            // Dispatch job to send confirmation email
            SendConfirmationEmail::dispatch($user);
        }

        return response()->json(['message' => 'Users created and emails sent successfully'], 201);
    }
}
