<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
	{
		return View::make('index');
	});

//Route::get('/', function()
//{
//	return View::make('hello');
//});

//Route::get('/', 'HomeController@showWelcome');

Route::group(array('prefix' => 'api'), function() {
	Route::resource('authenticate', 'AuthenticationController');
	Route::resource('movies', 'MovieController');
	Route::resource('user', 'UserController');
//	Route::resource('user/{id}', 'UserController');
});