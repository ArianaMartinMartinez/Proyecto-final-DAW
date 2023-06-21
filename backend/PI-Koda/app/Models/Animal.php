<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Animal extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'animal_type',
        'breed',
        'gender',
        'date_birth',
        'description',
        'photo',
        'shelter_id',
    ];

    public function shelter(): BelongsTo{
        return $this->belongsTo(Shelter::class);
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'animal_user', 'animal_id', 'user_id');
    }
}
