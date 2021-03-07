var express = require("express");
var router = express.Router();
const joi = require("joi");
const fs = require("fs");

const jsonRoute = "./JSON/messages.json";

/**
 * Función para validar el mensaje
 * @param {Message} Mensaje a validar
 */
function validateMessage(message) {
  const schema = joi.object({
    author: joi
      .string()
      .required()
      .regex(new RegExp("^[a-zA-Z]+( +[a-zA-Z]+)*$")),
    message: joi
      .string()
      .required()
      .min(5),
    ts:joi
      .number()
  });

  return schema.validate(message);
}

/**
 * Función para leer un archivo JSON
 * @param {function} callback función para manipular el archivo
 */
function getFileContent(callback) {
  fs.readFile(jsonRoute, (err, data) => {
    if (err) throw err;
    callback(data.toString());
  });
}

/* GET messages listing. */
router.get("/", function (req, res, next) {
  getFileContent((data) => {
    if (!data) res.status(200).send(JSON.parse("[]"));
    else {
      const messages = JSON.parse(data);
      res.status(200).send(messages);
    }
  });
});

/*GET BY message ID*/
router.get("/:ts", function (req, res, next) {
  getFileContent((data) => {
    const messages = JSON.parse(data);
    const message = messages.find(
      (item) => item.ts === parseInt(req.params.ts)
    );
    if (!message) res.status(404).send("Message not found");
    res.status(200).send(message);
  });
});

/*POST new message */
router.post("/", function (req, res, next) {
  getFileContent((data) => {
    //Validación
    const { error } = validateMessage(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
      let message;
      let messages;
      //Creación
      if (!data) {
        messages = [];
        message = {
          ts: 1,
          author: req.body.author,
          message: req.body.message,
        };
      } else {
        messages = JSON.parse(data);
        message = {
          ts: messages.length + 1,
          author: req.body.author,
          message: req.body.message,
        };
      }
      messages.push(message);
      fs.writeFileSync(jsonRoute, JSON.stringify(messages));
      res.status(200).send(message);
    }
  });
});

/*PUT update a message by id*/
router.put("/:ts", function (req, res, next) {
  getFileContent((data) => {
    if (!data) res.status(404).send("Message not found");
    else {
      const messages = JSON.parse(data);
      const message = messages.find(
        (item) => item.ts === parseInt(req.params.ts)
      );
      if (!message) res.status(404).send("Message not found");
      else {
        //Validación
        const { error } = validateMessage(req.body);
        if (error) res.status(400).send(error.details[0].message);
        else {

          const index = messages.indexOf(message)

          message.author = req.body.author;
          message.message = req.body.message;

          
          messages[index]=message;
          fs.writeFileSync(jsonRoute, JSON.stringify(messages));
          res.status(200).send(message);
        }
      }
    }
  });
});

/*DELETE deleta a message by id*/
router.delete("/:ts", function (req, res, next) {
  getFileContent((data) => {
    if (!data) res.status(404).send("Message not found");
    else {
      const messages = JSON.parse(data);
      const message = messages.find(
        (item) => item.ts === parseInt(req.params.ts)
      );
      if (!message) res.status(404).send("Message not found");
      else {
          const index = messages.indexOf(message)
          messages.splice(index);
          fs.writeFileSync(jsonRoute, JSON.stringify(messages));
          res.status(204);
      }
    }
  });
});

module.exports = router;
