<?php 
    session_start();
	include 'includes/connection.php';

	if (isset($_POST['district'])) { 
        
        $district_id = $_POST['district'];
        $sql = "SELECT * FROM zones where district_id = '$district_id'";

        $result = $connect -> query($sql);
         
         $html = ' <option>Choose Zone</option> ';
        if(($result -> num_rows) > 0){
            while ($row = $result -> fetch_assoc()) {
                    # code...
                    $html = $html.' <option value="'.$row['zone_id'].'">'.$row['zone_name'].'</option> ';
            }
            echo $html;
        } else {
            echo '<option value="">No Zones found</option>';
        } 
    }elseif (isset($_POST['action'])){
        
        #Delete
        if($_POST['action'] == "delete"){

            $id = $_POST['zone_id'];
            $sql = "DELETE FROM zones WHERE zone_id = ".$id; // delete from database aswell

            $result = mysqli_query($connect,$sql);

            if ($result === TRUE) {
                echo "success";
            }
            else
            {
                echo "Failed to Delete.";
            }
        } // end of if($_POST['action'] == "delete")
        if ($_POST['action'] == "edit") {
                
            $id = $_POST['zone_id'];
            $zone_name = $_POST['zone_name'];
            $sql = "UPDATE `zones` SET `zone_name`='$zone_name' WHERE zone_id = ".$id; // delete from database aswell

            $result = mysqli_query($connect,$sql);

            if ($result === TRUE) {
                echo "success";
            }
            else
            {
                echo "Failed to Delete.";
            }    
        } 
        
    }else if (isset($_POST['zone_name']) && isset($_POST['district_name'])) { 
        
        $zone_name = $_POST['zone_name'];
        $district_id = $_POST['district_name'];
        $sql = "INSERT INTO `zones`(`zone_name`,`district_id`) VALUES ('$zone_name','$district_id')";

        $result = $connect -> query($sql);
        if ($result) {
            $_SESSION['added'] = 'success';
        } else {
            $_SESSION['added'] = 'error';
        }
    } // end of if(isset($_POST['action']))
     else {

		$sql_query = "SELECT * FROM zones INNER JOIN districts ON zones.district_id = districts.district_id";

	    $res = $connect -> query($sql_query);
	    $result = array();

	    if ($res) {
	    	while ($row = $res -> fetch_assoc()) {
		        # code...
		        $result[] = $row;
		    }

		    print('{"data":'.json_encode($result).'}');
	    }

    }


 ?>