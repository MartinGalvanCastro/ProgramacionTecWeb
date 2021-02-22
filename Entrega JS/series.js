console.log("Martin David Galvan Castro - 201614423")


const promise = new Promise((resolve, reject) => {
  const url =
    "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    if (request.status === 200) {
      let seriesArray = JSON.parse(request.response);
      let prom = 0;
      seriesArray.forEach((serie) => (prom += serie.seasons));
      resolve(prom / seriesArray.length);
    } else {
      reject("No se encontro el recurso");
    }
  };
  request.send();
});

promise.then((result) => console.log(result)).catch((err) => console.log(err));
