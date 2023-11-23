<?php


include 'conexion.php';

	  $correo = $_POST['correo'];
	  $contrasena = $_POST['contrasena'];
	 

      $validarlogin = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo='$correo' and contrasena='$contrasena'");

      if(mysqli_num_rows($validarlogin) > 0){
      	$_SESSION['usuario'] = $correo;
        
       header("location: ../cancha.html");
       
       exit; }

      else{

      	echo '
      	<script>
      	alert("usuario no existe por favor comprueba tus datos");
         window.location = "../index.php";
        </script>

        ';	
        exit;

      } 





?>
