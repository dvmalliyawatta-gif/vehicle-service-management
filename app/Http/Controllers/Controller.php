<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller
{
    // This trait provides the $this->authorize() method
    // used in CustomerController (and every future controller)
    // to check permissions against our Policy classes (e.g. CustomerPolicy)
    use AuthorizesRequests;
}