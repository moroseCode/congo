var mysql = require("mysql");
var inquirer = require("inquirer");
var ListIt = require("list-it");
require("dotenv").config();
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password1",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayWares();
});

function displayWares() {
    connection.query(
        "SELECT * FROM products", function(err, result) {
            if (err) throw err;
            var prods = new ListIt({"autoAlign": true});
            console.log(prods.d( result ).toString() );
        }
    );
    buyPrompt();
};

var buyPrompt = function(){
    inquirer.prompt([

        {
            type: "input",
            name: "selectID",
            message: "Enter the ID of the product you would like to purchase"
        },
        {
            type: "input",
            name: "prodQuant",
            message: "How many of these would you like?"
        }
    
    // After the prompt, store the user's response in a variable called location.
    ]).then(function(prodBuy) {
        connection.query(
            "SELECT * FROM products", function(err, result) {
                if (err) throw err;
            });
        if(result.stock_quantity >= prodBuy.prodQuant) {
            connection.query(
                "UPDATE products SET stock_quantity = stock_quantity - prodBuy.prodQuant WHERE id = selectID", function(err, result) {
                    if (err) throw err;
                }
            );
            console.log("You successfully purchased " + prodBuy.prodQuant + " " + result.id)
        };
    });
};