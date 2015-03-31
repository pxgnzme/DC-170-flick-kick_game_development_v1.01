<?php 
// output headers so that the file is downloaded rather than displayed
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=warriors_flickkick_db.csv');

// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// output the column headings
fputcsv($output, array('Date','Name', 'Email'));

// fetch the data
require_once '../db_con/connection.php';

$user_table = "user";

$rows = mysql_query("SELECT date_format,name,email FROM $user_table ORDER BY date_signup ASC");

// loop over the rows, outputting them
while ($row = mysql_fetch_assoc($rows)) fputcsv($output, $row);

?>
