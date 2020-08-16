//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// //Home route
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html")
// });
//
// app.post("/", function(req, res) {
//
//   var num1 = Number(req.body.n1);
//   var num2 = Number(req.body.n2);
//
//   var result = num1 + num2;
//   res.send("The result of the calculation is " + result);
//
// });


//BMI Calculator

app.listen(3000, function() {
  console.log('Server started in port 3000')
});

app.get('/bmiCalculator', function(req, res) {

  res.sendFile(__dirname + '/bmiCalculator.html')

});

app.post('/bmiCalculator', function(req, res) {

  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);

  //Testing .py function processing retrieval file
  //checking all variables(variable dump) on line 40
  console.dir(req.body);

  // spawn new child process to call the python script
  const {
    spawn
  } = require('child_process');

  const py = spawn('python', ['bmi.py', weight, height]);

  let dataToSend = '';

  // collect data from script
  py.stdout.on('data', function(data) {
    console.log('Pipe data from python script ...');
    dataToSend += data.toString();

    py.stdin.write(JSON.stringify(dataToSend));
    py.stdin.end();

    res.send('Your BMI is ' + dataToSend);
    console.log(dataToSend);

  });
});
