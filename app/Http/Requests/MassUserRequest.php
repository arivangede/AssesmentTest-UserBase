<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MassUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'users' => 'required|array|max:1000',
            'users.*.name' => 'required|string|max:255',
            'users.*.email' => 'required|string|email|max:255|unique:users,email',
            'users.*.phone' => 'required|string|min:10|max:13|unique:users,phone',
            'users.*.password' => 'required|string|min:8',
        ];
    }
}
