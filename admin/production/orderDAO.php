<?php

    session_start();

    include 'includes/connection.php';

    if(isset($_POST['title']) && isset($_FILES['file']['name']) ) { 
        
        
                         
        $title = str_replace("/", "_", $_POST['title']);

        $path = "orders"; // Name of Directory on Server

        date_default_timezone_set('Asia/Kolkata');
        $pdf_name = preg_replace('/\s+/', '_', $_FILES['file']['name']);
        $dateToday = date("Y.m.d");
        $pdf_name = "file-".$dateToday."-".$pdf_name;
                    
            $pdf_tmp_name = $_FILES['file']['tmp_name'];
            $full_path = $path."/".$pdf_name;

            if(move_uploaded_file($pdf_tmp_name,$full_path)){ // Copies the file to Server Directory

                $query = "INSERT INTO orders(`name`, `path_compress`,`uploaded_at`) VALUES ('$title', '$full_path', '".date("Y-m-d H:i:s")."')";
             

                $result = mysqli_query($connect, $query);
              

                $_SESSION['orders_uploaded'] = "success";
                header("Location:./orders.php");


            } else {

                $_SESSION['orders_uploaded'] = "error";
                $_SESSION['error_code'] = "1";
               header("Location:./orders.php");
            }
           
        
    } // end of  if(isset($_POST['upload_images_button'])) 
    # delete all images
    
    elseif (isset($_POST['action'])){
        
        #Delete
        if($_POST['action'] == "delete"){

            $id = $_POST['id'];
    
            $path = "";
            
            $sql_query = "SELECT path_compress FROM orders  WHERE id = '". $id ."' ";
            
            $res = $connect -> query($sql_query);
            
            while ($row = $res -> fetch_assoc()) {
                # fetch path
            
                $path = $row['path_compress'];
                
            }
            // delete compressed image from server
            unlink($path);
            
            $sql = "DELETE FROM orders WHERE id = ".$id; // delete from database aswell

            $result = mysqli_query($connect,$sql);

            if ($result === TRUE) {
                echo "success";
            }
            else
            {
                echo "Failed to Delete.";
            }
        } // end of if($_POST['action'] == "delete")
        
    } // end of if(isset($_POST['action']))
    
    else {

        // To view uploaded images
        
        $query = "SELECT orders.id AS id, orders.name, orders.path_compress,orders.uploaded_at FROM orders;";
        
        $res = $connect -> query($query);

        $result = array();

        while ($row = $res -> fetch_assoc()) {
                # code...
                $result[] = $row;
        }
        //print(json_encode($result));
        print('{"data":'.json_encode($result).'}');

    } // end of else


// COMPRESS IMAGE CODE HERE


	function compress_image($source_file, $target_file, $nwidth, $nheight, $quality) 
	{
    
		//Return an array consisting of image type, height, widh and mime type.
		$image_info = getimagesize($source_file);
		if(!($nwidth > 0)) $nwidth = $image_info[0];
		if(!($nheight > 0)) $nheight = $image_info[1];
		

		
		if(!empty($image_info))
		 {
			switch($image_info['mime']) 
			{
				case 'image/jpeg' :
					if($quality == '' || $quality < 0 || $quality > 100) $quality = 65; 
					// Create a new image from the file or the url.
					$image = imagecreatefromjpeg($source_file);
					$thumb = imagecreatetruecolor($nwidth, $nheight);
					//Resize the $thumb image
					imagecopyresized($thumb, $image, 0, 0, 0, 0, $nwidth, $nheight, $image_info[0], $image_info[1]);
					// Output image to the browser or file.
                
					return imagejpeg($thumb, $target_file, $quality); 
					
					break;
				
				case 'image/png' :
					if($quality == '' || $quality < 0 || $quality > 9) $quality = 4; 
					// Create a new image from the file or the url.
					$image = imagecreatefrompng($source_file);
					$thumb = imagecreatetruecolor($nwidth, $nheight);
					//Resize the $thumb image
					imagecopyresized($thumb, $image, 0, 0, 0, 0, $nwidth, $nheight, $image_info[0], $image_info[1]);
					// Output image to the browser or file.
            
					return imagepng($thumb, $target_file, $quality);
					break;
				
					
				default:
					echo "<h4>Not supported file type!</h4>";
					break;
			}
		}
	}



	// Donot Remove any Script


    
    mysqli_close($connect);
