<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalUser extends Model {
    use HasFactory;

    protected $table = 'animal_user';

    protected $fillable = [
        'id_animal',
        'id_user',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function animal() {
        return $this->belongsTo(Animal::class);
    }
}
