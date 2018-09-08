

<?php 

	  $server ="localhost";

	  $user = "root";

	  $password = "";

	  $dbname ="youth_service_dept";

	  

	  $connect = new mysqli($server,$user,$password,$dbname);



	  if (!$connect) 

	  {

	    die("Connection failed: " . mysqli_connect_error());

	  }

 ?>