const url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

const eventoBody = document.getElementById("tabla-evento-cuerpo");
const correlacionBody = document.getElementById("tabla-correlacion-cuerpo");

console.log(eventoBody)
console.log(correlacionBody)

function eventoObj(nombre) {
  this.nombre = nombre;
  this.TP = 0;
  this.TN = 0;
  this.FP = 0;
  this.FN = 0;
  this.MCC = 0;
  this.getMCC = function () {
    let aux1 = this.TP * this.TN - this.FP * this.FN;
    let aux2 = Math.sqrt(
      (this.TP + this.FN) *
        (this.TP + this.FP) *
        (this.TN + this.FP) *
        (this.TN + this.FN)
    );
    this.MCC = aux1 / aux2;
  };
}

/**
 * Compara si el nombre de un evento del fetch es igual al nombre de un objeto evento
 * @param {String} evento1
 * @param {Evento} evento2
 */
let sonIguales = (evento1, evento2) => evento1 == evento2.nombre;

let tablaA = (response) => {
  response.forEach((item, index) => {
    /*------------------------TABLA A--------------------------*/

    /*Se crean los elementos HTML*/
    let filaEvento = document.createElement("tr");
    let numFila = document.createElement("th");
    let eventos = document.createElement("td");
    let esSquirrel = document.createElement("td");

    /*Se modifica el CSS*/
    if (item.squirrel) {
      filaEvento.style.backgroundColor = "pink";
    }

    /*Se asigna el numero de fila, el contenido y si es squirrel*/
    numFila.setAttribute("scope", "row");
    numFila.innerHTML = index + "";

    eventos.innerHTML = item.events.join(",");

    esSquirrel.innerHTML = item.squirrel.toString();

    /*Se hace los apend*/
    filaEvento.appendChild(numFila);
    filaEvento.appendChild(eventos);
    filaEvento.appendChild(esSquirrel);
    eventoBody.appendChild(filaEvento);
  });
};

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    tablaA(res);

    /*------------------------TABLA B--------------------------*/

    eventosArr = [];
    res.forEach((item) => {
      eventosArr = eventosArr.concat(
        item.events.filter((event) => !eventosArr.includes(event))
      );
    });
    eventosArr = eventosArr.map((event) => {
      return new eventoObj(event);
    });

    res.forEach((item) => {
      eventosArr.forEach((eventI) => {
        if (item.events.includes(eventI.nombre) && item.squirrel) {
          eventI.TP += 1;
        } else if (item.events.includes(eventI.nombre) && !item.squirrel) {
          eventI.FP += 1;
        } else if (!item.events.includes(eventI.nombre) && item.squirrel) {
          eventI.FN += 1;
        } else if (!item.events.includes(eventI.nombre) && !item.squirrel) {
          eventI.TN += 1;
        }
      });
    });

    eventosArr.map((event) => event.getMCC());
    eventosArr = eventosArr.sort((a, b) =>
      a.MCC > b.MCC ? -1 : a.MCC < b.MCC ? 1 : 0
    );

    eventosArr.forEach((item, index) => {
      /*Se crean los elementos HTML*/
      let filaEvento = document.createElement("tr");
      let numFila = document.createElement("th");
      let evento = document.createElement("td");
      let correlacion = document.createElement("td");

      /*Se asigna el numero de fila, el contenido y si es squirrel*/
      numFila.setAttribute("scope", "row");
      numFila.innerHTML = index + "";

      evento.innerHTML = item.nombre;
      correlacion.innerHTML = item.MCC;

      /*Se hace los apend*/
      filaEvento.appendChild(numFila);
      filaEvento.appendChild(evento);
      filaEvento.appendChild(correlacion);
      correlacionBody.appendChild(filaEvento);
    });
  })
  .catch((err) => console.log("Error al obtener el recurso: " + err));
