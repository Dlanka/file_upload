<?php
$output = "";
echo $_FILES['file']['name'][0];
if (isset($_FILES['file']['name'][0])) {

    foreach ($_FILES['file']['name'] as $keys => $value) {
        if (move_uploaded_file($_FILES['file']['tmp_name'][$keys], 'upload/' . $value)) {
            $output .= $value;
        }
    }

    echo $output;

}