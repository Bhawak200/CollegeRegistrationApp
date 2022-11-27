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

    if (!$conn){
        die("Sorry we failed to connect: ". mysqli_connect_error());
    };
    
    if(isset($_GET['key'])){
        $key=mysqli_real_escape_string($conn,$_GET['key']);
        $sql="select * from users where token ='$key'";
        $result=mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)>0){
            http_response_code(200);
            $myObj = new stdClass();
            $myObj->status = "200";
            $myObj->msg = "sucess";
            $myJSON = json_encode($myObj);
            echo $myJSON;
        }else{
            http_response_code(202);
            $err="Invalid Credtinals";
            $myObj = new stdClass();
            $myObj->status = "202";
            $myObj -> msg = $err;
          
            $myJSON = json_encode($myObj);
            echo $myJSON;
        }
      }else{
        http_response_code(202);
        $err="Invalid Credtinals";
        $myObj = new stdClass();
        $myObj->status = "202";
        $myObj -> msg = $err;
        $myJSON = json_encode($myObj);
        echo $myJSON;
    }
      


  ?>