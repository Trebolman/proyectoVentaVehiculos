window.addEventListener("load",()=>{
    //Creacion del objeto 
    // var cliente2 = new Object();
    // var cliente1 = new Object();
    var botonClear = document.getElementById("clear");
    botonClear.addEventListener("click",()=>{
        localStorage.clear();
        var nroVenta = 0;
        localStorage.setItem("nroVenta",nroVenta);
    });
    
    for(var i = 1; i < localStorage.length; i++){
        if(localStorage.key(i) == "venta"+i){
            console.log("Si hay variable venta");
            console.log(localStorage.getItem(localStorage.key(i)));
            console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            var venta = new Venta();
            venta.crearFila();
            console.log(typeof(venta));
            venta = JSON.parse(localStorage.getItem(localStorage.key(i)));
            console.log(typeof(venta));
            // venta.crearFila();
            // venta.crearFila();
        }
        else{
            console.log("No hay aun variable venta");
        }
    }
    var nombreCliente = document.getElementById("nombreCliente");
    var precioVenta = document.getElementById("precioVenta");
    var nroFactura = document.getElementById("nroFactura");
    var fechaVenta = document.getElementById("fechaVenta");
    var ventaBotonAceptar = document.getElementById("ventaAceptar");
    
    //Procedimientos
	ventaBotonAceptar.addEventListener("click",()=>{
        nroVenta = localStorage.getItem("nroVenta");
        nroVenta++;
        localStorage.setItem("nroVenta",nroVenta);

        var nuevaVenta = new Venta(nombreCliente.value,parseFloat(precioVenta.value),parseInt(nroFactura.value),parseInt(fechaVenta.value));
        nuevaVenta.crearFila();
        
        localStorage.setItem("venta"+nroVenta,JSON.stringify(nuevaVenta));
        console.log(nuevaVenta);
	});
});

class Venta{
    // nombreCliente = "";
    // this.precio = 0;
    // this.nroFactura = 0;
    // this.fecha = 0;
    constructor(nombreCliente="", precio=0, nroFactura=0, fecha=0){
        this.nombreCliente = nombreCliente;
        this.precio = precio;
        this.nroFactura = nroFactura;
        this.fecha = fecha;
    }
    crearFila(){
        var fila = document.createElement("tr");
        var colNombreCliente = document.createElement("td");
        var colPrecioVenta = document.createElement("td");
        var colNroFactura = document.createElement("td");
        var colFechaVenta = document.createElement("td");

        colNombreCliente.innerHTML = this.nombreCliente;
        colPrecioVenta.innerHTML = this.precioVenta;
        colNroFactura.innerHTML = this.nroFactura;
        colFechaVenta.innerHTML = this.fechaVenta;  

        fila.append(colNombreCliente);
        fila.append(colPrecioVenta);
        fila.append(colNroFactura);
        fila.append(colFechaVenta);
        document.getElementById("TablaRegistroVentas").append(fila);
    }
}