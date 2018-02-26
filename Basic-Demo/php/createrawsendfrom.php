<?php
$config = include('config.php');
$chain = $config['chain'];
$nodeaddr = $config['nodeaddr'];
$curl = curl_init();
$addr = $_POST['from'];
$key = $_POST['key'];
$val = $_POST['val'];
curl_setopt_array($curl, array(
   CURLOPT_PORT => $config['rk_port'],
  CURLOPT_URL => $config['rk_host'],
  CURLOPT_USERPWD => $config['rk_user'].":".$config['rk_pass'],
  CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"method\":\"createrawsendfrom\",\"params\":[\"$addr\",{\"$nodeaddr\":0},[{\"for\":\"root\",\"key\":\"$key\",\"data\":\"$val\"}]],\"id\":\"curltext\",\"chain_name\":\"$chain\"}",
  CURLOPT_HTTPHEADER => array(
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    "Postman-Token: a04df090-2ea9-9b78-e373-c71b54d8b41b"
  ),
));
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}