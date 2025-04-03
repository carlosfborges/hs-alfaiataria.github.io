<?php

include_once('config.php');

// Variáveis
$extensions = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG'];
$maxsize = 500000;
$file	= $_FILES['file'];

try {

	$ext = substr($file['type'], strpos($file['type'], '/') + 1);

	// Verificar se a extensão do arquivo é válida.
	if (!in_array($ext, $extensions)) throw new Exception('Extensão do arquivo inválida.');

	// Verificar o tamanho do arquivo. Arbitrar um valor máximo (500KB).
	if ($file['size'] > $maxsize)	throw new Exception('Tamnho do arquivo inválido. Usar imagens até 500KB.');		

	if (!is_dir($upload_dir)) mkdir($upload_dir);

	if (!is_dir($upload_session_dir)) mkdir($upload_session_dir);

	$pos = strrpos($file['tmp_name'], DIRECTORY_SEPARATOR) + 1;

	$name = substr($file['tmp_name'], $pos, strlen($file['tmp_name']) - $pos - 3);

	// Transformar em png.
	$destination = $upload_session_dir . $name . $extensions[0];
	
	if (!move_uploaded_file($file['tmp_name'], $destination)) throw new Exception('Erro ao enviar o arquivo.');

	// echo json_encode(['success', str_replace($_SERVER['DOCUMENT_ROOT'], '', $destination)]);
	echo 'success';

} catch (Exception $e) { echo $e->getMessage(); }
