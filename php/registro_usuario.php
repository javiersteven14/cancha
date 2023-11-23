<?php

include 'conexion.php';

	  $nombrecompleto = $_POST['nombrecompleto'];
	  $correo = $_POST['correo'];
	  $usuario = $_POST['usuario'];
	  $contrasena = $_POST['contrasena'];

      $query = "INSERT INTO usuarios(nombre_completo, correo, usuario, contrasena) VALUES ('$nombrecompleto', '$correo', '$usuario' , '$contrasena')";


      $ejecutar = mysqli_query($conexion, $query);	

  if($ejecutar){

  	echo' 
  	<script>

  	alert("Usuario registrado correctamente");
window.location = "../index.php";
  </script>
      ';
     }
     else{

      	echo'<script>
      	alert("No registrado intentelo nuevamente");
window.location ="../index.php";
</script>
';

      

  }

mysql_close($conexion);	
?>