# Laravel Project Assessment

This is a Laravel project developed as part of an assessment test. The project includes the following features:

## Frameworks & Libraries

-   Laravel 11
-   Inertia
-   React JS
-   Tailwindcss
-   axios

## UI component library

-   Daisyui

## Features

1. Basic Authentication:

-   Basic authentication is implemented to access the Dashboard.
-   Authentication is also applied to API routes using Laravel Sanctum.

2. User CRUD Interface via API:

-   A full CRUD interface for user data accessible via API.
-   Unit tests are provided to validate the CRUD operations.

3. HTTP Request Logging:

-   Every HTTP request sent to the application is logged using a custom middleware.

4. Email Confirmation on User Creation:

-   An email confirmation is sent after a new user is created.
-   The email is dispatched using Laravel's job queue.

5. Mass User Creation API Endpoint:

-   An API endpoint is provided for mass user creation in a single call.
-   The endpoint can handle up to 1000 email and password pairs in the request body.

## Installation

Follow the steps below to set up the project:

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

2. Install the dependencies:

```bash
composer install
npm i
```

3. Set up the environment file:

```bash
cp .env.example .env
```

Update the .env file with your database and mail configurations.

or simply copy my.env configurations

```bash
cp my.env .env
```

4. Generate the application key:

```bash
php artisan key:generate
```

5. Run the migrations to set up the database:

```bash
php artisan migrate
```

6. Set up the queue driver (e.g., database):

```bash
php artisan queue:table
php artisan migrate
```

7. Start the queue worker:

```bash
php artisan queue:work
```

8. Run the development server:

```bash
php artisan serve
```

## Usage

API Endpoints

-   User CRUD API:

    -   GET /api/users: Retrieve a list of users.
    -   POST /api/users: Create a new user.
    -   GET /api/users/{id}: Retrieve a specific user by ID.
    -   PUT /api/users/{id}: Update a specific user by ID.
    -   DELETE /api/users/{id}: Delete a specific user by ID.

-   Mass User Creation:

    -   POST /api/users/mass-create: Create multiple users at once (up to 1000 users).

## Unit Testing

Run the unit tests with the following command:

```bash
php artisan test
```

## HTTP Request Logging

All HTTP requests are logged, including the request method, URL, and body. This is handled by a custom middleware.

## Email Confirmation

After creating a new user, an email confirmation is sent. The email contains a link for the user to confirm their email address.
