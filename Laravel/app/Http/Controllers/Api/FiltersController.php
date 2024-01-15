<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;

class FiltersController extends Controller
{
    public function get_filter_products(Request $request){
        $price = $request->price;
        $catID=$request->catID;
       
        if(Category::where(['name'=> $catID])->first() == null){
             return json_encode([
                'result' => [],
                
            ]);
        }
        $catid = Category::where(['name'=> $catID])->first()->id;
        

        $query = Product::query();
        if (isset($catID)) {    
            $query->where('category_id', $catid);
        }
        if ($price) {
            $query->where(function ($query) use ($price) {
                foreach ($price as $p) {
                    if($p[0] != "0" && $p[1] != "0")
                        $query->orwhereBetween('price', [$p[0], $p[1]]);
                }
            });
        }

        // Get the filtered results
        $results = $query->get();
        $arr = [];
        foreach($results as $key => $result){
            $arr[$key] = $result;
            $arr[$key]['cat_name'] = $result->get_category->toArray()['name'];
        }
        return response([
            'results'=> $arr
        ]);
        
    }

    public function get_searched_products(Request $request){
        $searchterm = $request->search;
        $idsArray1 = Product::select('id')->where('name', 'like', '%' . $searchterm . '%')->orWhere('description', 'like', '%' . $searchterm . '%')->get()->toArray();
        // $idsArray2 =  Product::select('id')->whereHas('get_category', function ($query) use ($searchterm) {
        //     $query->where('name', 'like', '%' . $searchterm . '%');
        // })->get()->toArray();
        // $totalId = array_merge($idsArray1, $idsArray2);
        // $totalId = array_unique(array_merge($idsArray1, $idsArray2));
        $totalArr = array();
        foreach($idsArray1 as $key=> $ids){
            $totalArr[$key] = Product::where('id', $ids['id'])->get()[0];
            $totalArr[$key]['cat_name'] = Product::where('id', $ids['id'])->get()[0]->get_category->toArray()['name'];
        }
        return response([
            'products'=> array_unique($totalArr)
        ]);
    }
}