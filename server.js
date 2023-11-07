const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const server = express()
server.use(bodyParser.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"partsmart"
});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

server.listen(8080,function check(error) {
    if (error) console.log("OOPS Somthing went wrong");
    else console.log("Started with the port number 8080");
});

//Create the Records

server.post("/api/sabari/employee/add", (req, res) => {
    let details = {
      user_name: req.body.name,
      code: req.body.code,
      mobile_number: req.body.mobile_number,
      password: req.body.password,
      created_at: "0000-00-00",
      updated_at: "0000-00-00",
      created_by: 1
    };
    let sql = "INSERT INTO mpay_employee_details SET ?";
    db.query(sql, details, (error) => {
      if (error) res.send({ status: false, message: "Not able to create this Employee" });
      else res.send({ status: true, message: "Employee created successfully" });
      });
  });

//view the Records

server.get("/api/employee/view", (req, res) => {
    var sql = "SELECT * FROM mpay_employee_details";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Somthing went wrong");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


//Search the Records

server.get("/api/employee/search/:id", (req, res) => {
    var emp_id = req.params.id;
    var sql = "SELECT * FROM mpay_employee_details WHERE id=" + emp_id;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Somthing went wrong");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });



//Update the Records

server.put("/api/employee/edit/:id", (req, res) => {
    let sql =
      "UPDATE mpay_employee_details SET user_name='" + req.body.name + "', code='" + req.body.code + "',mobile_number='" + req.body.mobile_number + "',password='" +
      req.body.password + "'  WHERE id=" + req.params.id;
    let a = db.query(sql, (error, result) => {
      if(error) res.send({ status: false, message: "Employee Not Getting Updated" });
      else res.send({ status: true, message: "Employee Updated successfully" });
    });
  });



  //Delete the Records
  
  server.delete("/api/employee/delete/:id", (req, res) => {
    let sql = "DELETE FROM mpay_employee_details WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) res.send({ status: false, message: "Employee not Deleted" });
       else res.send({ status: true, message: "Employee Deleted successfully" });
    });
  });