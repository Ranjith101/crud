const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    database:'employee'
})

app.post('/create',(req,res)=>{
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const salary = req.body.salary

    db.query(
        'insert into employee.employee (name, age, country, position, salary) VALUES (?,?,?,?,?)',
        [name,age,country,position, salary], (err,result) =>{
            if(err){
                console.log(err)
            }else {
                res.send('Values Inserted Successfully')
            }
        }
    )
})

app.get('/employee',(req,res)=>{
    db.query(
        'select * from employee.employee',(err,result)=>{
            if(err){
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})



app.put("/update", (req, res) => {
    const id = req.body.id;
    const salary = req.body.salary;
    db.query(
      "UPDATE employee SET salary = ? WHERE id = ?",
      [salary, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001,()=>{
    console.log("backend server running Started")
})