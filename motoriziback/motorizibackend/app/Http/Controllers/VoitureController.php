<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;   
use App\Models\PostVoiture;

class VoitureController extends Controller
{
    //
    function add(Request $req)
    {
        $PostVoiture= new PostVoiture;
        $PostVoiture->iduser=$req->input('iduser');
        $PostVoiture->marque=$req->input('marque');
        $PostVoiture->modele=$req->input('modele');
        $PostVoiture->ville=$req->input('ville');
        $PostVoiture->carburant=$req->input('carburant');
        $PostVoiture->prix=$req->input('prix');
        $PostVoiture->annee=$req->input('annee');
        $PostVoiture->km=$req->input('km');
        $PostVoiture->description=$req->input('description');
        $PostVoiture->tel=$req->input('tel');
        $PostVoiture->vendeur=$req->input('vendeur');
        $PostVoiture->file=$req->file('file')->store('PostVoitures');
        $PostVoiture->save();
        return $PostVoiture;
    }
    function list(){
        return PostVoiture::all();
    }
    
}
