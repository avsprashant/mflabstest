const express = require("express");
const router = express.Router();
const ProductController = require('../controller/Product.Controller')
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
var path = require('path');

var swagger_path =  path.resolve(__dirname,'../swagger.yaml');
console.log(swagger_path);
const swaggerJSDocs = YAML.load(swagger_path);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDocs));

router.get('/people',ProductController.getAllPeople)
router.post('/people',ProductController.addPeople)
router.get('/people/:id',ProductController.getPeopleById)
router.delete('/people/:id',ProductController.deletePersonById)
router.put('/people/:id',ProductController.updatePersonById)

router.all('*', ProductController.restAllInvalidPaths);

module.exports = router;