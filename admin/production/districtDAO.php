<?php 
    session_start();
	include 'includes/connection.php';

	if (isset($_POST['districts'])) { 
        
        
        $sql = "SELECT * FROM districts";

        $result = $connect -> query($sql);
        
        $html = ' <option>Choose Districts</option> ';
        if(($result -> num_rows) > 0){
            while ($row = $result -> fetch_assoc()) {
                    # code...
                    $html = $html.' <option value="'.$row['district_id'].'">'.$row['district_name'].'</option> ';
            }
            echo $html;
        } else {
            echo '<option value="">No districts found</option>';
        } 
    } elseif (isset($_POST['action'])){
        
        #Delete
        if($_POST['action'] == "delete"){

            $id = $_POST['district_id'];
            $sql = "DELETE FROM districts WHERE district_id = ".$id; // delete from database aswell

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
                
            $id = $_POST['district_id'];
            $district_name = $_POST['district_name'];
            $sql = "UPDATE `districts` SET `district_name`='$district_name' WHERE district_id = ".$id; // delete from database aswell

            $result = mysqli_query($connect,$sql);

            if ($result === TRUE) {
                echo "success";
            }
            else
            {
                echo "Failed to Delete.";
            }    
        } 
        
    }else if (isset($_POST['district_name'])) { 
        
        $district_name = $_POST['district_name'];
        $sql = "INSERT INTO `districts`(`district_name`) VALUES ('$district_name')";

        $result = $connect -> query($sql);
        if ($result) {
            $_SESSION['added'] = 'success';
        } else {
            $_SESSION['added'] = 'error';
        }
    } // end of if(isset($_POST['action']))
     else {

			$sql_query = "SELECT * FROM districts";

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