var app = new function() {
        var vuelo1 = {
          origen: "PASIFICA",
          destino: "EL BOSQUE",
          hora: new Date(2023, 4, 15, 12),
          costobase: 500,
          costoneto: 0,
          reservas: []
        };
        var vuelo2 = {
          origen: "SAN ALONSO",
          destino: "EL FUTBOLERO",
          hora: new Date(2023, 4, 28, 7, 30),
          costobase: 450,
          costoneto: 0,
          reservas: []
        };
        var vuelo3 = {
          origen: "EL TROFEO",
          destino: "GOL GANA",
          hora: new Date(2023, 4, 21, 18),
          costobase: 600,
          costoneto: 0,
          reservas: []
        };
        var vuelo4 = {
          origen: "CANCHEROS",
          destino: "JUEGATRON",
          hora: new Date(2023, 4, 28, 6, 50),
          costobase: 550,
          costoneto: 0,
          reservas: [1078]
        };
        var vuelo5 = {
          origen: "LOS AMIGOS",
          destino: "LA CANCHA DE BOCA",
          hora: new Date(2023, 5, 1, 19, 30),
          costobase: 200,
          costoneto: 0,
          reservas: []
        };
        this.vuelos = [vuelo1, vuelo2, vuelo3, vuelo4, vuelo5];
        for (var i = 0; i < this.vuelos.length; i++) {
          var aumentomanana = 0;
          var aumentofindesemana = 0;
          if (this.vuelos[i].hora.getHours() <= 12) {
            aumentomanana = this.vuelos[i].costobase * 0.05; 
          }
          if (this.vuelos[i].hora.getDay() == 5 || this.vuelos[i].hora.getDay() == 6) {
            aumentofindesemana = this.vuelos[i].costobase * 0.1; 
          }
          this.vuelos[i].costoneto = this.vuelos[i].costobase + aumentomanana + aumentofindesemana;
        }
  
        this.mostrarcanchas = function() {
          var data = '<br>';
          if (this.vuelos.length > 0) {
            for (i = 0; i < this.vuelos.length; i++) {
              var hora = this.vuelos[i].hora.getHours() < 10 ? '0' + this.vuelos[i].hora.getHours() : this.vuelos[i].hora.getHours();
              var minutos = this.vuelos[i].hora.getMinutes() < 10 ? '0' + this.vuelos[i].hora.getMinutes() : this.vuelos[i].hora.getMinutes();
              data += '<tr>';
              data += '<td>ORDEN '+ (i+1) + ' RESERVAR: ' + this.vuelos[i].origen + ', CANCHA: ' + this.vuelos[i].destino + ', SINTETICA: ' + this.vuelos[i].hora.toDateString() + " " + hora + ":" + minutos + '</td>';
              data += '<td><button onclick="app.Reservar(' + i + ')">Reservar</button></td>';
              data += '</tr>';
            }
          }
          document.getElementById('vuelos').innerHTML = data;
          document.getElementById('vuelos').style.display = 'block';
        };

        this.Reservar = function (item) {
          var el = document.getElementById('documento');
          document.getElementById('documento').value = "";
          document.getElementById('datosvuelo').style.display = 'block';
          document.getElementById('vuelos').style.display = 'none';
          document.getElementById('menu1').style.display = 'none';
          document.getElementById('menu2').style.display = 'none';
          document.getElementById('btnback').style.display = 'block';

          var impuesto = this.vuelos[item].costobase == this.vuelos[item].costoneto ? '' : 'PRECIO TOTAL DE LA CANCHA'; 
          var hora = this.vuelos[item].hora.getHours() < 10 ? '0' + this.vuelos[item].hora.getHours() : this.vuelos[item].hora.getHours();
          var minutos = this.vuelos[item].hora.getMinutes() < 10 ? '0' + this.vuelos[item].hora.getMinutes() : this.vuelos[item].hora.getMinutes();

          document.getElementById('datosvuelo').innerHTML = "CANCHA # " + (item + 1) + ":<br>NOMBRE DE LA SEDE: " + this.vuelos[item].origen + '<br>CANCHA: ' + this.vuelos[item].destino + '<br>FECHA DISPONIBLE: ' + this.vuelos[item].hora.toDateString() + " " + hora + ":" + minutos + '<br>PRECIO PARA APARTARLA: $' + this.vuelos[item].costobase + '<br>PRECIO COMPLETO: $' + this.vuelos[item].costoneto + " " + impuesto;
          document.getElementById('campodoc').style.display = 'block';
          self = this;
          document.getElementById('reserva-edit').onsubmit = function() {
            var d = el.value * 1;
            if (isNaN(d) || d == 0) {
              window.alert("Ingrese un dato correcto");
            }else{
              var flag = false;
              for (j = 0; j < self.vuelos.length; j++) {
                var auxDoc = self.vuelos[j].reservas.indexOf(d)
                if (auxDoc != -1) {
                  if (self.vuelos[j].hora.getFullYear() == self.vuelos[item].hora.getFullYear() &&
                    self.vuelos[j].hora.getMonth() == self.vuelos[item].hora.getMonth() &&
                    self.vuelos[j].hora.getDate() == self.vuelos[item].hora.getDate()) {
                    flag = true;
                    break;
                  }
                }
              }
              if (flag) {
                window.alert("Error: usted ya tiene reservado esta cancha para esta fecha");
              }else{
                self.vuelos[item].reservas.push(d);
                window.alert("Cancha reservada correctamente");
                document.getElementById('menu1').style.display = 'block';
                document.getElementById('menu2').style.display = 'block';
                document.getElementById('datosvuelo').style.display = 'none';
                document.getElementById('campodoc').style.display = 'none';

                document.getElementById('btnback').style.display = 'none';
              }
            }
          }
        };

        this.consultarReserva = function () {
          var el = document.getElementById('docConsulta');
          var d = el.value * 1;
          if (isNaN(d) || d == 0) {
              window.alert("Ingrese un dato correcto");
          }else{
            var data = '<br>CANCHAS RESERVADOS DE ' + d;
            for (i = 0; i < this.vuelos.length; i++) {
              var auxDoc = this.vuelos[i].reservas.indexOf(d)
              if (auxDoc != -1) {
                var hora = this.vuelos[i].hora.getHours() < 10 ? '0' + this.vuelos[i].hora.getHours() : this.vuelos[i].hora.getHours();
                var minutos = this.vuelos[i].hora.getMinutes() < 10 ? '0' + this.vuelos[i].hora.getMinutes() : this.vuelos[i].hora.getMinutes();
                data += '<tr>';
                data += '<td> CANCHA # '+ (i+1) + "= RESERVA: " + this.vuelos[i].origen + ', CANCHA: ' + this.vuelos[i].destino + ', SINTETICA: ' + this.vuelos[i].hora.toDateString() + " " + hora + ":" + minutos + '</td>';
                data += '</tr>';
              }
            }
            if (data == '<br>CANCHAS RESERVADOS DE ' + d) {
              window.alert("No existen canchas apartadas a dicho documento");
            }else{
              document.getElementById('menu1').style.display = 'none';
              document.getElementById('menu2').style.display = 'none';
              document.getElementById('vuelos').style.display = 'block';
              document.getElementById('vuelos').innerHTML = data;
              document.getElementById('btnback').style.display = 'block';
            }
          }
        };

        this.Volver = function (){
          document.getElementById('datosvuelo').style.display = 'none';
          document.getElementById('campodoc').style.display = 'none';
          document.getElementById('vuelos').style.display = 'none';
          document.getElementById('btnback').style.display = 'none';
          document.getElementById('menu1').style.display = 'block';
          document.getElementById('menu2').style.display = 'block';
          document.getElementById('docConsulta').value = "";
        };
}