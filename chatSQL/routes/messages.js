var express = require("express");
var router = express.Router();
const joi = require("joi");

const Message = require("../models/message");

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
    id:joi
      .number()
  });

  return schema.validate(message);
}


/* GET messages listing. */
router.get("/", function (req, res, next) {
  Message.findAll().then(result=>{
    res.status(200).send(result);
  })
});

/*GET BY message ID*/
router.get("/:id", function (req, res, next) {
  Message.findByPk(req.params.id).then(result=>{
    if(result===null) res.status(404).send("Message not found")
    else{res.status(200).send(result);}  
  });
});

/*POST new message */
router.post("/", function (req, res, next) {
  const {error} = validateMessage(req.body);
  if(error) return res.status(404).send(error.details[0].message);
  else{
    const {author,message} = req.body;
    Message.create({author, message}).then(response=>{
      res.status(200).send(response);
    });
  }
});

/*PUT update a message by id*/
router.put("/:id", function (req, res, next) {
  const {error} = validateMessage(req.body);
  if(error) return res.status(404).send(error.details[0].message);
  else{
    Message.update(req.body,{where:{id:req.params.id}}).then(response=>{
      if(response[0]===0) res.status(404).send("Message not found")
      else {res.status(200).send("Message Updated");}
    });
  }
});

/*DELETE deleta a message by id*/
router.delete("/:id", function (req, res, next) {
  Message.destroy({where:{id:req.params.id}}).then(result=>{
    if(result===0) res.status(404).send("Message not found");
    else{res.status(204).send("Message deleted")}
  });
});

module.exports = router;
