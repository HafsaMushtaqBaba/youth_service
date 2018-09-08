<?php 
	session_start();
	include 'includes/connection.php';

	if (isset($_POST['employees'])) { 
        
        $sql = "SELECT * FROM employees";

        $result = $connect -> query($sql);
         
         $html = ' <option>Choose Employee</option> ';
        if(($result -> num_rows) > 0){
            while ($row = $result -> fetch_assoc()) {
                    # code...
                    $html = $html.' <option value="'.$row['employee_id'].'">'.$row['employee_name'].'</option> ';
            }
            echo $html;
        } else {
            echo '<option value="">No Employee found</option>';
        } 
    }elseif (isset($_POST['action'])){
        
        #Delete
        if($_POST['action'] == "delete"){

            $id = $_POST['employee_id'];
            $sql = "DELETE FROM employees WHERE employee_id = ".$id; // delete from database aswell

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
                
            $id = $_POST['employee_id'];
            $employee_name = $_POST['employee_name'];
            $sql = "UPDATE `employees` SET `employee_name`='$employee_name' WHERE employee_id = ".$id; // delete from database aswell

            $result = mysqli_query($connect,$sql);

            if ($result === TRUE) {
                echo "success";
            }
            else
            {
                echo "Failed to Delete.";
            }    
        } 
        
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
    }else if (isset($_POST['employee1_name']) && isset($_POST['school1_name']) && isset($_POST['zone1_name']) && isset($_POST['district1_name'])) { 
        
        $school_id = $_POST['school1_name'];
        $employee_id = $_POST['employee1_name'];
        $sql = "UPDATE `employees` SET `school_id`='$school_id' WHERE employee_id = ".$employee_id;

        $result = $connect -> query($sql);
        if ($result) {
            $_SESSION['updated'] = 'success';
        } else {
            $_SESSION['updated'] = 'error';
        }
    }
    else {

		$sql_query = "SELECT employees.employee_id, employees.employee_name, schools.school_name AS employee_school, zones.zone_name AS employee_zone, districts.district_name AS employee_district FROM employees INNER JOIN schools ON employees.school_id = schools.school_id INNER JOIN zones ON schools.zone_id = zones.zone_id INNER JOIN districts ON zones.district_id = districts.district_id";

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