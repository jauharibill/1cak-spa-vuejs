<?php 

header("Access-Control-Allow-Origin : * ");

if (isset($_GET['section'])) {
	$section = $_GET['section'];
	$data = file_get_contents('http://api-1cak.herokuapp.com/'.$section);
	echo $data;
}

if (isset($_GET['param']) && isset($_GET['next'])) {
	$section = $_GET['param'];
	$next = $_GET['next'];
	$data = file_get_contents('http://api-1cak.herokuapp.com/'.$section.'/'.$next);
	echo $data;	
}

if(isset($_GET['search'])){
	$keyword = $_GET['search'];
	$data = file_get_contents('http://api-1cak.herokuapp.com/search?q='.$keyword);
	echo $data;
}

if (isset($_GET['url'])) {
	$url = $_GET['url'];
	if(urlExists($url)){
		echo "success";
	}else{
		echo "Failed";
	}
}

function urlExists($url=NULL)  
{ 
    if($url == NULL) return false;  
    $ch = curl_init($url);  
    curl_setopt($ch, CURLOPT_URL, $url);
    $data = curl_exec($ch);  
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);  
    curl_close($ch);  
    if($httpcode>=200 && $httpcode<300){  
        return true;  
    } else {  
        return false;  
    }  
} 

 ?>