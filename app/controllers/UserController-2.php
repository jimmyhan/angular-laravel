<?php

class UserController extends BaseController {
	
	public function index()
	{
		$users = User::all();
		return $users->toJson();
	}

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{
		$users = User::all();
		return View::make('index', array('users' => $users));
	}

}