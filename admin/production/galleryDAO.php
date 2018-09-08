<?php

    session_start();

    include 'includes/connection.php';

    if(isset($_POST['title']) && isset($_FILES['file']['name']) ) { 
        
        echo "here";
        $title = str_replace("/", "_", $_POST['title']); // get title of image
        
        $path = "gallery"; // Name of Directory on Server

        date_default_timezone_set('Asia/Kolkata');
        
                         
        $filename  = basename($_FILES['file']['name']); // get image name
        $extension = pathinfo($filename, PATHINFO_EXTENSION); // get image extension
        
        $without_extension = pathinfo($filename, PATHINFO_FILENAME); // get image name without extension
        $without_extension_image = preg_replace('/[^\w]/', '',$without_extension); // replace all  special characters in image name without extension
        
        $image_name  = $without_extension_image.'.'.$extension; // append extension at end of new image name
        
        $allowed =  array("jpg","JPG","PNG","png","jpeg","JPEG"); // pass the allowed file extensions as specified in the images.php
       
       $ext = pathinfo($image_name, PATHINFO_EXTENSION);
       if(!in_array($ext , $allowed) ){
            
            $_SESSION['image_uploaded'] = "error";
            $_SESSION['error_code'] = "1";
            header("Location:./gallery.php");
            return;
        }
        
       if(!(file_exists($path."/".$image_name))){

             foreach($_FILES as $file => $fileArray){
                   
                   $getFileExtension = $extension; // get file extension to know which image compression to be called
                 
                    $newFileName = $image_name;
                    $compressedImage = "compressed_".$image_name;
                
                   $targetPath = $path."/".$newFileName; // orignal image
				   $compressedTarget = $path."/".$compressedImage; // compressed image
                 
                   $width=$_POST['width']; // parameters to be passed to compress function
				   $height=$_POST['height'];
				   $quality=$_POST['quality'];
                 
                 // call to compress function and parameters are sent to be compressed
                 $success = compress_image($fileArray["tmp_name"], $compressedTarget, $width, $height, $quality);
           
             if(move_uploaded_file($fileArray["tmp_name"], $targetPath) && $success) { // Copies the file to Server Directory
                 //when compression function returns success
                // orignal file is needed to compress. After compressing image delete orignal image from server
                 
                 unlink($targetPath); // delete orignal image
         
                $query = "INSERT INTO gallery(`name`, `path_compress`,`uploaded_at`) VALUES ('$title', '$compressedTarget', '".date("Y-m-d H:i:s")."')";
             
                $result = mysqli_query($connect, $query);
                // get images_id and use for fcm
                $image_id = mysqli_insert_id($connect);

                if ($result) {
                    $_SESSION['image_uploaded'] = "success";
                    header("Location:./gallery.php");
                } else {
                    $_SESSION['image_uploaded'] = "error";
                    header("Location:./gallery.php");
                }

                 // insert into db and compression successfull
             
              
             } // end of if(move_uploaded_file)
                 else {
                     $_SESSION['image_uploaded'] = "error";
                     $_SESSION['error_code'] = "1";
                     header("Location:./gallery.php");
                     }
          } // end of foreach
           
        } // end of if(!(file_exists($path."/".$image_name))) 
        
        else {
            $_SESSION['image_uploaded'] = "error";
            $_SESSION['error_code'] = "2";
            header("Location:./gallery.php");
        }
        
    } // end of  if(isset($_POST['upload_images_button'])) 
    # delete all images
    
    elseif (isset($_POST['action'])){
        
        #Delete
        if($_POST['action'] == "delete"){

            $id = $_POST['id'];
    
            $path = "";
            
            $sql_query = "SELECT path_compress FROM gallery  WHERE id = '". $id ."' ";
            
            $res = $connect -> query($sql_query);
            
            while ($row = $res -> fetch_assoc()) {
                # fetch path
            
                $path = $row['path_compress'];
                
            }
            // delete compressed image from server
            unlink($path);
            
            $sql = "DELETE FROM gallery WHERE id = ".$id; // delete from database aswell

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
        
        $query = "SELECT gallery.id AS id, gallery.name, gallery.path_compress,gallery.uploaded_at FROM gallery;";
        
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
