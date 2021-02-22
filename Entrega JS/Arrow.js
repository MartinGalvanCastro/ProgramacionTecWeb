/**
 * Author: Martin David Galvan Castro
 * Code: 201614423
 */

/*-----------------------------------------------
PUNTO 1 
------------------------------------------------*/

//Función de Encriptar
let encrypt = (arr,a) => {
    arr.forEach((item,i) => item===a? arr[i]+=a:item)
    return arr;
}
//Función de desencriptar.
let decrypt = (arr,a) => {
    arr.forEach((item,i) => item===a? arr[i]-=a:item)
    return arr;
}
//Mensaje
let secret = (arr,operation,key) => operation(arr,key)
var msg = secret([1,2,3,1],encrypt,1);
console.log(msg)
console.log(secret(msg,decrypt,1));


/*-----------------------------------------------
PUNTO 2
------------------------------------------------*/
console.log("-----------------------------")
console.log("Primeros 8 numeros de Fibonacci")
const f = (n) => n<2?1:f(n-1)+f(n-2)
for(i=0;i<8;i++){
    console.log(f(i))
}

/*-----------------------------------------------
PUNTO 3
------------------------------------------------*/
console.log("-----------------------------")
    
const promise1 = new Promise((resolve, reject) => {
  const url =
    "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    if (request.status === 200) {
      resolve(JSON.parse(request.response));
    } else {
      reject("No se encontro el recurso");
    }
    };
    request.send();
  });
    
  const promise2 = new Promise((resolve, reject) => {
  const url =
    "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    if (request.status === 200) {
      resolve(JSON.parse(request.response));
    } else {
       reject("No se encontro el recurso");
    }
    };
    request.send();
  });
    
      
  const array = [promise1,promise2];
      
  Promise.all(array).then((result)=>{
    let arrProductos = result[0];
    let arrPedidos = result[1];
    let numPedidos = [];
    arrProductos.forEach(item=>numPedidos.push(
    {
      nombre:item.nombreProducto,
      id:item.idproducto,
      num:0
    }));
    arrPedidos.forEach(item=>{
      let idProducto = item.idproducto;
      let cantidad = item.cantidad;
      numPedidos.forEach(item=>{
        if(item.id===idProducto){
          item.num += parseInt(cantidad);
        }
      }
      );})
    let max = 0;
    let pedido;
    numPedidos.forEach(item=>{
      if(item.num > max){
        pedido=item;
      }
    });
    console.log("El producto más pedido es: " + pedido.nombre +", se han pedido " + pedido.num+" unidades");
    }).catch(err=>console.log(err));
  


