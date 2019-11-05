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
        "SELECT * FROM products", function(err, res) {
            if (err) throw err;
            var prods = new ListIt({"autoAlign": true});
            console.log(prods.d( res ).toString() );
            buyPrompt();
        }
    );
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
        var query = "SELECT * FROM products WHERE ?";
        connection.query(
            query, {item_id: prodBuy.selectID},  function(err, res) {
                if (err) throw err;
                // console.log("Quantity: " + res[0].stock_quantity);
                // console.log("Ordered: " + prodBuy.prodQuant);
                // console.log(res.stock_quantity >= prodBuy.prodQuant)
                if(res[0].stock_quantity >= prodBuy.prodQuant) {
                    connection.query("UPDATE products SET stock_quantity = (" + res[0].stock_quantity + "-" + prodBuy.prodQuant + ") WHERE item_id = " + prodBuy.selectID, function(err){
                        if (err) throw err;
                        var total = (res[0].price * prodBuy.prodQuant)
                    console.log("You successfully purchased " + prodBuy.prodQuant + " " + res[0].product_name + " for a total of $" + total) 
                    displayWares()});
                } else {
                    console.log("We do not have enough to fulfill this order.")
                   displayWares();
                }

                // console.log(res[0]);
            });
    });
};