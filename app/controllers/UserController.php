<?php

class UserController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $page = file_get_contents('http://www.zytrax.com/tech/web/mobile_ids.html');
        preg_match_all('/<(p) class="g-c-[ns]"[^>]*>(.*?)<\/p>/s', $page, $m);

        $agents = array();
        foreach($m[2] as $agent) {
            $split = explode("\n", trim($agent));
            foreach($split as $item) {
                $agents[] = trim($item);
            }
        }
// $agents now holds every user agent string, one per array index, trimmed
        foreach($agents as $agent) {
            echo($agent."\n");
        }

        $browser = array(
            'version'   => '0.0.0',
            'majorver'  => 0,
            'minorver'  => 0,
            'build'     => 0,
            'name'      => 'unknown',
            'useragent' => ''
        );

        $browsers = array(
            'firefox', 'msie', 'opera', 'chrome', 'safari', 'mozilla', 'seamonkey', 'konqueror', 'netscape',
            'gecko', 'navigator', 'mosaic', 'lynx', 'amaya', 'omniweb', 'avant', 'camino', 'flock', 'aol'
        );

        if (isset($_SERVER['HTTP_USER_AGENT'])) {
            $browser['useragent'] = $_SERVER['HTTP_USER_AGENT'];
            $user_agent = strtolower($browser['useragent']);
            foreach($browsers as $_browser) {
                if (preg_match("/($_browser)[\/ ]?([0-9.]*)/", $user_agent, $match)) {
                    $browser['name'] = $match[1];
                    $browser['version'] = $match[2];
                    @list($browser['majorver'], $browser['minorver'], $browser['build']) = explode('.', $browser['version']);
                    break;
                }
            }
        }

        $users = User::all();
		return $users->toJson();
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$users = User::findOrFail($id);
		return $users->toJson();
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}