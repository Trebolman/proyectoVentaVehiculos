window.addEventListener("load",()=>{
    //Creacion del objeto 
    var botonClear = document.getElementById("clear");
    botonClear.addEventListener("click",()=>{
        localStorage.clear();
    });

    //Inicializamos variables
    var primeraVezVenta = false;
    var primeraVezCliente = false;
    var primeraVezVehiculo = false;
    var ventas = [];
    var clientes = [];
    var vehiculos = [];

    var nuevaVenta = new Venta();
    var nuevoCliente = new Cliente();
    var nuevoVehiculo = new Vehiculo();

    //Revisamos si hay variables en LocalStorage
    for(var i = 1; i < localStorage.length; i++){
        //Revisa si hay array de ventas
        if(localStorage.key(i) == "Ventas"){
            ventas = JSON.parse(localStorage.getItem("Ventas")); 
            for(var i = 1; i < ventas.length; i++){
                nuevaVenta.nombreCliente = ventas[i].nombreCliente;
                nuevaVenta.fecha = ventas[i].fecha;
                nuevaVenta.nroFactura = ventas[i].nroFactura;
                nuevaVenta.precio = ventas[i].precio;
                nuevaVenta.placa = ventas[i].placa;
                nuevaVenta.crearFila();
            }
        }else{
            ventas = [""];
            primeraVezVenta = true;
        }
    }

    for(var i = 0; i < localStorage.length; i++){
        //Revisa si hay array de clientes
        if(localStorage.key(i) == "Clientes"){
            clientes = JSON.parse(localStorage.getItem("Clientes")); 
            for(var i = 0; i < clientes.length; i++){
                nuevoCliente.nombreCliente = clientes[i].nombreCliente;
                nuevoCliente.DNI = clientes[i].DNI;
                nuevoCliente.crearFila();
                nuevoCliente.crearOpciones();
            }
        }else{
            clientes = [""];
            primeraVezCliente = true;
        }
    }

    for(var i = 0; i < localStorage.length; i++){
        //Revisa si hay array de ventas
        if(localStorage.key(i) == "Vehiculos"){
            vehiculos = JSON.parse(localStorage.getItem("Vehiculos")); 
            for(var i = 0; i < vehiculos.length; i++){
                nuevoVehiculo.color = vehiculos[i].color;
                nuevoVehiculo.placa = vehiculos[i].placa;
                nuevoVehiculo.tipoAuto = vehiculos[i].tipoAuto;
                nuevoVehiculo.cilindraje = vehiculos[i].cilindraje;
                nuevoVehiculo.potencia = vehiculos[i].potencia;
                nuevoVehiculo.ageFabricacion = vehiculos[i].ageFabricacion;
                nuevoVehiculo.crearFila();
                nuevoVehiculo.crearOpciones();
            }
        }else{
            vehiculos = [""];
            primeraVezVehiculo = true;
        }
    }

    //Variables de procesos ventas
    var nombreCliente = document.getElementById("selecClientes");
    var precioVenta = document.getElementById("precioVenta");
    var nroFactura = document.getElementById("nroFactura");
    var fechaVenta = document.getElementById("fechaVenta");
    var selecVechiculos = document.getElementById("selecVehiculos");
    var ventaBotonAceptar = document.getElementById("ventaAceptar");

    //Variables de procesos clientes
    var clienteNombre = document.getElementById("nombre");
    var dni = document.getElementById("dni");
    var clienteBotonAceptar = document.getElementById("ButtonCliente");

    //Variables de procesos vehiculos
    var color = document.getElementById("color");
    var placa = document.getElementById("placa");
    var tipoAuto = document.getElementById("tipo");
    var cilindraje = document.getElementById("cilindraje");
    var potencia = document.getElementById("potencia");
    var ageFabricacion = document.getElementById("AFabricacion");
    var vehiculoBotonRegistrar = document.getElementById("Button");

    //Añadir listeners a los botones
	ventaBotonAceptar.addEventListener("click",function(){
        var nuevaVenta = new Venta(nombreCliente.options[nombreCliente.selectedIndex].innerHTML,precioVenta.value,nroFactura.value,fechaVenta.value,selecVechiculos.options[selecVechiculos.selectedIndex].innerHTML);
        nuevaVenta.crearFila();
        // if(primeraVezVenta){
        //     ventas.reverse();
        //     ventas.pop();
        //     ventas.reverse();
        //     primeraVezVenta = false;
        // }
        // var ventasFiltrado = ventas.filter(function (el) {
        //     return el != null;
        //   });
        // ventasFiltrado.push(nuevaVenta);
        ventas.push(nuevaVenta);
        localStorage.setItem("Ventas",JSON.stringify(ventas));
        console.log(nuevaVenta);
    });
    
    clienteBotonAceptar.addEventListener("click",()=>{
        var nuevoCliente = new Cliente(clienteNombre.value,dni.value);
        nuevoCliente.crearFila();
        clientes.push(nuevoCliente);
        localStorage.setItem("Clientes",JSON.stringify(clientes));
        console.log(nuevoCliente);
    });
    
    vehiculoBotonRegistrar.addEventListener("click",function(){
        var nuevoVehiculo = new Vehiculo(color.value, placa.value, tipoAuto.options[tipoAuto.selectedIndex].innerHTML, cilindraje.value, potencia.value, ageFabricacion.value);
        nuevoVehiculo.crearFila();
        vehiculos.push(nuevoVehiculo);
        localStorage.setItem("Vehiculos",JSON.stringify(vehiculos));
        console.log(nuevoVehiculo);
    });
});

class Venta{
    constructor(nombreCliente="", precio=0, nroFactura=0, fecha=0, placa=""){
        this.nombreCliente = nombreCliente;
        this.precio = precio;
        this.nroFactura = nroFactura;
        this.fecha = fecha;
        this.placa = placa;
    }
    crearFila(){
        var fila = document.createElement("tr");
        var colNombreCliente = document.createElement("td");
        var colPrecioVenta = document.createElement("td");
        var colNroFactura = document.createElement("td");
        var colFechaVenta = document.createElement("td");
        var colPlacaVenta = document.createElement("td");

        colNombreCliente.innerHTML = this.nombreCliente;
        colPrecioVenta.innerHTML = this.precio;
        colNroFactura.innerHTML = this.nroFactura;
        colFechaVenta.innerHTML = this.fecha;
        colPlacaVenta.innerHTML = this.placa;

        fila.append(colNombreCliente);
        fila.append(colPrecioVenta);
        fila.append(colNroFactura);
        fila.append(colFechaVenta);
        fila.append(colPlacaVenta);
        document.getElementById("TablaRegistroVentas").append(fila);
    }
}

class Cliente{
    constructor(nombreCliente="", DNI=0){
        this.nombreCliente = nombreCliente;
        this.DNI = DNI;
    }
    crearFila(){
        var fila = document.createElement("tr");
        var colNombreCliente = document.createElement("td");
        var colDni = document.createElement("td");

        colNombreCliente.innerHTML = this.nombreCliente;
        colDni.innerHTML = this.DNI;

        fila.append(colNombreCliente);
        fila.append(colDni);
        document.getElementById("TablaRegistroClientes").append(fila);
    }

    crearOpciones(){
        var opcion = document.createElement("option");

        opcion.innerHTML = this.nombreCliente;
        document.getElementById("selecClientes").append(opcion);
    }
}

class Vehiculo{
    constructor(color="", placa="", tipoAuto="", ageFabricacion=0, cilindraje=0, potencia=0){
        this.color = color;
        this.placa = placa;
        this.tipoAuto = tipoAuto;
        this.ageFabricacion = ageFabricacion;
        this.cilindraje = cilindraje;
        this.potencia = potencia;
    }
    crearFila(){
        var fila = document.createElement("tr");
        var colColor = document.createElement("td");
        var colPlaca = document.createElement("td");
        var colTipoAuto = document.createElement("td");
        var ageFabricacion = document.createElement("td");
        var colCilindraje = document.createElement("td");
        var colPotencia = document.createElement("td");

        colColor.innerHTML = this.color;
        colPlaca.innerHTML = this.placa;
        colTipoAuto.innerHTML = this.tipoAuto;
        ageFabricacion.innerHTML = this.ageFabricacion;
        colCilindraje.innerHTML = this.cilindraje;
        colPotencia.innerHTML = this.potencia;

        fila.append(colColor);
        fila.append(colPlaca);
        fila.append(colTipoAuto);
        fila.append(ageFabricacion);
        fila.append(colCilindraje);
        fila.append(colPotencia);
        document.getElementById("TablaRegistroVehiculos").append(fila);
    }

    crearOpciones(){
        var opcion = document.createElement("option");

        opcion.innerHTML = this.placa;
        document.getElementById("selecVehiculos").append(opcion);
    }
}