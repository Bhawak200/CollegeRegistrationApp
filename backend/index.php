<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  
  // Connect to the Database 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "tripdata";
    $id='';

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
            $name=$_POST['name'];
            $age=$_POST['age'];
            $gender=$_POST['gender'];
            $email=$_POST['email'];
            $files = $_FILES['fileName'];

            $fileName = $files['name'];
            $filerr = $files['error'];
            $filetmp = $files['tmp_name'];
            $destination = "../collegetriportal/src/upload/" .$fileName;
            move_uploaded_file($filetmp,$destination);

            $sql="INSERT INTO `students`( `name`, `age`, `gender`, `email`, `FileName`, `date`) VALUES ('$name','$age','$gender','$email','$destination',current_timestamp())";
            $result=mysqli_query($conn,$sql);

            $response=array('status' => 'valid');
            echo json_encode($response);
          }else{
             $response=array('status' => 'Invalid');
             echo json_encode($response);
          }
      }

          
           
       
?>