<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Main;

class MainController extends Controller
{
    //start generate
    public function startTrueFalse()
    {
        $main = new Main;

        //random generate
        $komek = true;
        while ($komek) {
            $n1 = rand(1, 7);
            $n2 = rand(1, 7);
            $n3 = rand(1, 7);
            $n4 = rand(1, 7);
            if (($n1 + $n2 + $n3 + $n4) == 10) {
                $main->first = $n1;
                $main->second = $n2;
                $main->third = $n3;
                $main->fourth = $n4;
                $komek = false;
            }
        }

        $main->day = 1;
        $main->kill = 0;
        $main->add = 0;
        $main->changesheep = "";

        //save to database
        $main->save();

        //return data
        return response()->json([
            'success' => true,
            'main' => $main
        ]);
    }

    //Process alg.
    public function process(Request $request)
    {
        $main = Main::orderBy('id', 'desc')->first();
        $day = $main->day;
        $kill = $main->kill;
        $add = $main->add;
        $arr[1] = $request->first;
        $arr[2] = $request->second;
        $arr[3] = $request->third;
        $arr[4] = $request->fourth;

        //add 
        $komek1 = true;
        $i = 1;
        while ($komek1) {
            if ($i > 4) {
                $komek1 = false;
            } else if ($arr[$i] > 1) {
                $arr[$i]++;
                $add++;
            }
            $i++;
        }
        /*
        //kill
        $komek2 = true;
        while($komek2){
            if($day % 10 == 0){
                $p = rand(1,4);
                if($arr[$p] > 1){
                    $arr[$p]--;
                    $kill++;
                    $komek2 = false;    
                }
            }
        }
        */
        $day++;

        //change sheep
        $max = max($arr);
        $min = min($arr);
        $imax = array_search($max, $arr);
        $imin = array_search($min, $arr);

        if ($min == 1) {
            $min++;
            $max--;
            $arr[$imin] = $min;
            $arr[$imax] = $max;
        }

        $main1 = new Main;
        $main1->first = $arr[1];
        $main1->second = $arr[2];
        $main1->third = $arr[3];
        $main1->fourth = $arr[4];
        $main1->day = $day;
        $main1->add = $add;
        $main1->kill = $kill;
        $main1->changesheep = "";

        $main1->save();



        return response()->json([
            'success' => true,
            'main' => $main,
            'max' => $max,
            'indexMax' => $imax,
            'min' => $min,
            'indexMin' => $imin
        ]);
    }

    //fetch data
    public function fetch()
    {
        $main = Main::orderBy('id', 'desc')->first();
        if ($main != null) {
            $arr[1] = $main->first;
            $arr[2] = $main->second;
            $arr[3] = $main->third;
            $arr[4] = $main->fourth;

            $max = max($arr);
            $min = min($arr);
            $imax = array_search($max, $arr);
            $imin = array_search($min, $arr);

            return response()->json([
                'success' => true,
                'main' => $main,
                'max' => $max,
                'indexMax' => $imax,
                'min' => $min,
                'indexMin' => $imin
            ]);
        } else {
            return response()->json([
                'success' => true,
                'main' => $main,
                'max' => 0,
                'indexMax' => 0,
                'min' => 0,
                'indexMin' => 0
            ]);
        }
    }

    //Action User
    public function actionUser(Request $request)
    {
        $pos = $request->pos;
        if ($pos == "добавить") {
            $main = Main::orderBy('id', 'desc')->first();
            $r = rand(1, 4);
            $arr[1] = $main->first;
            $arr[2] = $main->second;
            $arr[3] = $main->third;
            $arr[4] = $main->fourth;
            $add = $main->add;

            $arr[$r]++;
            $add++;

            $main->first = $arr[1];
            $main->second = $arr[2];
            $main->third = $arr[3];
            $main->fourth = $arr[4];
            $main->add = $add;
            $main->save();
            return response()->json([
                'success' => true,
            ]);
        } else if ($pos == "удалить") {
            $main = Main::orderBy('id', 'desc')->first();
            $r = rand(1, 4);
            $arr[1] = $main->first;
            $arr[2] = $main->second;
            $arr[3] = $main->third;
            $arr[4] = $main->fourth;
            $kill = $main->kill;

            $arr[$r]--;
            $kill++;

            $main->first = $arr[1];
            $main->second = $arr[2];
            $main->third = $arr[3];
            $main->fourth = $arr[4];
            $main->kill = $kill;
            $main->save();
            return response()->json([
                'success' => true,
            ]);
        } else if ($pos == "переместить") {
            $main = Main::orderBy('id', 'desc')->first();
            $arr[1] = $main->first;
            $arr[2] = $main->second;
            $arr[3] = $main->third;
            $arr[4] = $main->fourth;

            $max = max($arr);
            $min = min($arr);
            $imax = array_search($max, $arr);
            $imin = array_search($min, $arr);

            if ($min == 1) {
                $min++;
                $max--;
                $arr[$imin] = $min;
                $arr[$imax] = $max;
            }

            $main->first = $arr[1];
            $main->second = $arr[2];
            $main->third = $arr[3];
            $main->fourth = $arr[4];
            $main->save();
            return response()->json([
                'success' => true,
            ]);
        }
        return response()->json([
            'success' => false,
        ]);
    }



    //Trash=====================================
    //kill
    public function kill()
    {
    }

    //add
    public function add($k)
    {
        if ($k > 1) {
            $k++;
        }
        return $k;
    }

    //change sheep
    public function changeSheep()
    {
    }

    //sum day and count sheep
    public function Report()
    {
        $main = Main::orderBy('id', 'desc')->first();

        return response()->json([
            'success' => true,
            'main' => $main
        ]);
    }
}
