<?php
session_start();

$data_dir = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'humbertosouza' . DIRECTORY_SEPARATOR . 'branch2' . DIRECTORY_SEPARATOR . 'config';

$upload_dir = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'humbertosouza' . DIRECTORY_SEPARATOR. 'branch2' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR;

$upload_session_dir = $upload_dir . session_id() . DIRECTORY_SEPARATOR;
