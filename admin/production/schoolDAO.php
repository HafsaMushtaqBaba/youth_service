<?php 
    session_start();
	include 'includes/connection.php';
	if (isset($_POST['zone'])) { 
        
        $zone_id = $_POST['zone'];
        $sql = "SELECT * FROM schools WHERE zone_id = '$zone_id'";

        $result = $connect -> query($sql);
         
         $html = ' <option>Choose School</option> ';
        if(($result -> num_rows) > 0){
            while ($row = $result -> fetch_assoc()) {
                    # code...
                    $html = $html.' <option value="'.$row['school_id'].'">'.$row['school_name'].'</option> ';
            }
            echo $html;
        } else {
            echo '<option value="">No School found</option>';
        } 
    } elseif (isset($_POST['action'])){
        
        #Delete
        if($_POST['action'] == "delete"){

            $id = $_POST['school_id'];
            $sql = "DELETE FROM schools WHERE school_id = ".$id; // delete from database aswell

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
                
            $id = $_POST['school_id'];
            $school_name = $_POST['school_name'];
            $sql = "UPDATE `schools` SET `school_name`='$school_name' WHERE school_id = ".$id; // delete from database aswell

            $result = mysqli_query($connect,$sql);

            if ($result === TRUE) {
                echo "success";
            }
            else
            {
                echo "Failed to Delete.";
            }    
        } 
        
    }else if (isset($_POST['school_name']) && isset($_POST['zone_name']) && isset($_POST['district_name'])) { 
        
        $school_name = $_POST['school_name'];
        $zone_id = $_POST['zone_name'];
        $sql = "INSERT INTO `schools`(`school_name`,`zone_id`) VALUES ('$school_name','$zone_id')";

        $result = $connect -> query($sql);
        if ($result) {
            $_SESSION['added'] = 'success';
        } else {
            $_SESSION['added'] = 'error';
        }
    }
    else {

		$sql_query = "SELECT * FROM schools INNER JOIN zones ON schools.zone_id = zones.zone_id INNER JOIN districts ON zones.district_id = districts.district_id";

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