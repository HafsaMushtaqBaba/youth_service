<?php 
	session_start();
	include 'includes/connection.php';

	if (isset($_POST['action'])){
        
        #Delete
        if($_POST['action'] == "delete"){

            $id = $_POST['student_id'];
            $sql = "DELETE FROM youth_students WHERE student_id = ".$id; // delete from database aswell

            $result = mysqli_query($connect,$sql);

            if ($result === TRUE) {
                echo "success";
            }
            else
            {
                echo "Failed to Delete.";
            }
        } // end of if($_POST['action'] == "delete")
        
        
    } else if (isset($_POST['employee_name']) && isset($_POST['school_name']) && isset($_POST['zone_name']) && isset($_POST['district_name'])) { 
        
        $school_id = $_POST['school_name'];
        $employee_name = $_POST['employee_name'];
        $sql = "INSERT INTO `employees`(`employee_name`,`school_id`) VALUES ('$employee_name','$school_id')";

        $result = $connect -> query($sql);
        if ($result) {
            $_SESSION['added'] = 'success';
        } else {
            $_SESSION['added'] = 'error';
        }
    }
    else {

		$sql_query = "SELECT * FROM youth_students";

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