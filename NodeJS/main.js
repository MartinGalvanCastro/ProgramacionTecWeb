const http = require("http");
const fs = require("fs");
const axios = require("axios");

const clientesUrl = "/api/clientes";
const proveedoresUrl = "/api/proveedores";
const JSONcliente =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
const JSONproveedor =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";

const getFileContent = (callback) => {
  fs.readFile("index.html", (err, data) => {
    if (err) throw err;
    callback(data.toString());
  });
};

http
  .createServer((req, res) => {
    const url = req.url;
    getFileContent((data) => {
      if (url == clientesUrl) {
        data = data.replace("{{nombre}}", "Clientes");
        axios
          .get(JSONcliente)
          .then((response) => {
              newEntry="";
              response.data.forEach((entry,index)=>{
                indexData = "<th scope=\"row\">"+(index+1)+"</th>\n";
                nameData="<td>"+entry.NombreCompania+"</td>";
                contactData="<td>"+entry.NombreContacto+"</td>";
                newEntry += "<tr>"+indexData+nameData+contactData+"</tr>";
              });
            data = data.replace("{{cuerpoTabla}}",newEntry)
            res.end(data);
            })
          .catch((error) => {console.log(error)});
        
      } else if (url == proveedoresUrl) {
        data = data.replace("{{nombre}}", "Proveedores");
        axios
          .get(JSONproveedor)
          .then((response) => {
              newEntry="";
              response.data.forEach((entry,index)=>{
                indexData = "<th scope=\"row\">"+(index+1)+"</th>\n";
                nameData="<td>"+entry.nombrecompania+"</td>";
                contactData="<td>"+entry.nombrecontacto+"</td>";
                newEntry += "<tr>"+indexData+nameData+contactData+"</tr>";
              });
            data = data.replace("{{cuerpoTabla}}",newEntry)
            res.end(data);
            })
          .catch((error) => {console.log(error)});
      } else {
        res.end("404: Recurso no encontrado");
      }
    });
  })
  .listen(8081);
