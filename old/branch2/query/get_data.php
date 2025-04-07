<?php
// Inclui o arquivo de configuração
include_once( 'config.php' );

// Traz o nome dos arquivos do diretório de dados em @$data_dir, e
// remove o '.' e '..'
$files = scandir( $data_dir );
$files = array_diff( $files, array( '.', '..' ) );

foreach ( $files as $file) {
	// Pega apenas o nome do arquivo sem a extensão, que 
	// será usado como chave no array @$data
	$key = str_replace( '.json', '', $file );

	// Pega o conteúdo do arquivo, e
	// transforma em array
	$contents = file_get_contents( $data_dir . DIRECTORY_SEPARATOR . $file);
	$contents = json_decode( $contents, true );

	// Array de dados
	$data[ $key ] = $contents;
}

// Retorna os dados
echo json_encode( $data );
