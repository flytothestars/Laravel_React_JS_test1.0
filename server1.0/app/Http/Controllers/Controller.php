<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /*function 
    {
        komek = true;

        while (komek) {
            int n1 = rand(1,7);
            int n2 = rand(1,7);
            int n3 = rand(1,7);
            int n4 = rand(1,7);
            if ((n1+n2+n3+n4) == 10) {
                komek = false;
            }
        }
        
        return json 
    }*/
}
