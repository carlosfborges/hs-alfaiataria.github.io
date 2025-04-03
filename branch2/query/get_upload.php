<?php

include_once('config.php');

// Variavel
$return = null;

// Callback da função array_map em @$list_src
function insert_path($e) {

	$src = $GLOBALS['upload_session_dir'] . $e;
	$src = str_replace($_SERVER['DOCUMENT_ROOT'], '', $src);
	$src = str_replace('\\', '/', $src);
	
	return $src;

}

if ( is_dir($upload_session_dir) ) {

	$list = scandir($upload_session_dir);
	$list = array_diff($list, array('.', '..'));

	$list_src = array_map('insert_path', $list);
	$list_src = array_values($list_src);
	
	$return = json_encode($list_src);	

}

echo $return;
