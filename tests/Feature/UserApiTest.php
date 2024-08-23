<?php
namespace Tests\Feature;

use App\Jobs\SendConfirmationEmail;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        // Buat user dan token sekali untuk digunakan di semua test
        $user = User::factory()->create();
        $this->token = $user->createToken('TestToken')->plainTextToken;
    }

    protected function headers()
    {
        return ['Authorization' => "Bearer " . $this->token];
    }

    public function test_can_create_user()
    {
        $response = $this->withHeaders($this->headers())->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '012345678910',
            'password' => 'password123'
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    public function test_can_update_user()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders($this->headers())->putJson('/api/users/' . $user->id, [
            'name' => 'Jane Doe',
            'email' => $user->email,
            'phone' => '08123456789',
            'password' => 'newpassword123'
        ]);

        $response->assertStatus(200)
            ->assertJson(['data' => ['name' => 'Jane Doe']]);
    }

    public function test_can_show_user()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders($this->headers())->getJson('/api/users/' . $user->id);

        $response->assertStatus(200)
            ->assertJsonStructure(['data' => ['id', 'name', 'email']]);
    }

    public function test_can_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->withHeaders($this->headers())->deleteJson('/api/users/' . $user->id);

        $response->assertStatus(204);
    }

    public function test_can_list_users()
    {
        User::factory()->count(5)->create();

        $response = $this->withHeaders($this->headers())->getJson('/api/users');

        $response->assertStatus(200)
            ->assertJsonStructure(['data' => [['id', 'name', 'email']]]);
    }

    public function test_can_create_multiple_users_with_valid_data()
    {
        Queue::fake();

        $data = [
            'users' => [
                [
                    'name' => 'User One',
                    'email' => 'user1@example.com',
                    'phone' => '081234567890',
                    'password' => 'password123',
                ],
                [
                    'name' => 'User Two',
                    'email' => 'user2@example.com',
                    'phone' => '081234567891',
                    'password' => 'password123',
                ],
            ],
        ];

        $response = $this->withHeaders($this->headers())->postJson('/api/users/mass-create', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'user1@example.com']);
        $this->assertDatabaseHas('users', ['email' => 'user2@example.com']);

        Queue::assertPushed(SendConfirmationEmail::class, 2);
    }

    /** @test */
    public function test_fails_if_any_user_data_is_invalid()
    {
        $data = [
            'users' => [
                [
                    'name' => 'User One',
                    'email' => 'invalid-email',
                    'phone' => '081234567890',
                    'password' => 'password123',
                ],
                [
                    'name' => 'User Two',
                    'email' => 'user2@example.com',
                    'phone' => '081234567891',
                    'password' => 'pass', // Invalid password (too short)
                ],
            ],
        ];

        $response = $this->withHeaders($this->headers())->postJson('/api/users/mass-create', $data);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['users.0.email', 'users.1.password']);
    }

    /** @test */
    public function test_fails_if_phone_is_not_unique()
    {
        User::factory()->create(['phone' => '081234567890']);

        $data = [
            'users' => [
                [
                    'name' => 'User One',
                    'email' => 'user1@example.com',
                    'phone' => '081234567890', // Duplicate phone number
                    'password' => 'password123',
                ],
                [
                    'name' => 'User Two',
                    'email' => 'user2@example.com',
                    'phone' => '081234567891',
                    'password' => 'password123',
                ],
            ],
        ];

        $response = $this->withHeaders($this->headers())->postJson('/api/users/mass-create', $data);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['users.0.phone']);
    }

    public function test_can_create_1000_users_with_valid_data()
    {
        Queue::fake();

        // Generate 1000 users dynamically
        $users = [];
        for ($i = 1; $i <= 1000; $i++) {
            $users[] = [
                'name' => "User {$i}",
                'email' => "user{$i}@example.com",
                'phone' => '081234567' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'password' => 'password123',
            ];
        }

        $data = ['users' => $users];

        $response = $this->withHeaders($this->headers())->postJson('/api/users/mass-create', $data);

        $response->assertStatus(201);

        foreach ($users as $user) {
            $this->assertDatabaseHas('users', ['email' => $user['email']]);
        }

        Queue::assertPushed(SendConfirmationEmail::class, 1000);
    }
}
