<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  
  // Connect to the Database 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "tripdata";
    

    // Create a connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Die if connection was not successful
    if (!$conn){
        die("Sorry we failed to connect: ". mysqli_connect_error());
    };


     if($_SERVER["REQUEST_METHOD"] == "POST"){
        $headers = getallheaders();
        $token = $headers["Authorization"];
        $sql = "SELECT * FROM `users` WHERE `token` = '$token'";
        $res=mysqli_query($conn,$sql);
        if(mysqli_num_rows($res) > 0 ){

          $id = $_POST['id'];
          $name=$_POST['name'];
          $age=$_POST['age'];
          $gender=$_POST['gender'];
          $email=$_POST['email'];
          $files = $_FILES['fileName'];
         // echo $files;
          if($files != ""){
            $fileName = $files['name'];
            $filerr = $files['error'];
            $filetmp = $files['tmp_name'];
            $destination = "../collegetriportal/src/upload/" .$fileName;
            move_uploaded_file($filetmp,$destination);
             $sql="UPDATE `students` SET `name`='$name',`age`='$age',`gender`='$gender',`email`='$email',`FileName`='$destination' WHERE `id` = '$id'";
          }else{
            $sql="UPDATE `students` SET `name`='$name',`age`='$age',`gender`='$gender',`email`='$email' WHERE `id` = '$id'";
          }

        
           $result=mysqli_query($conn,$sql);
          // echo $result;
           $response=array('status' => 'valid');
           echo json_encode($response);

        }else{
           $response=array('status' => 'Invalid');
           echo json_encode($response);
        }

     }
   

    ?>