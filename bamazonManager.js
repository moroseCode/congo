// Use inquirer for menu
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
  mgrPrompt();
});



var mgrPrompt = function(){
    inquirer.prompt([

        {
            type: "list",
            message: "What would you like to do today?",
            name: "searchType",
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }
    ]).then(function(inquirerResponse) {
        cmd = inquirerResponse.searchType;
        console.log(cmd)
        switch(inquirerResponse.searchType) {
            case "View Products for Sale":
                displayWares().then(function() {
                    mgrPrompt();
                });
                break;
            case "View Low Inventory":
                lowInv();
                break;
            case "Add to Inventory":
                addInv();
                break;
            case "Add New Product":
                addItem();
                break;
            case "Exit":
                console.log("Thanks for visiting Congo, have a great day!")
                process.exit();
                break;
        };
    });
};
function displayWares() {
    return new Promise(function(resolve, reject){
        connection.query(
            "SELECT * FROM products", function(err, res) {
                if (err) reject(err);
                var prods = new ListIt({"autoAlign": true});
                console.log(prods.d( res ).toString() );
                resolve(prods);
                // mgrPrompt();
            }
        ); 
    })

};

function lowInv(){
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        if (err) throw err;
        if(!res.length > 0){
            console.log("");
            console.log("There are currently no low inventory items.")
            displayWares().then(function() {
                mgrPrompt();
            });
        } else {
            var lowProds = new ListIt({"autoAlign": true});
            console.log(lowProds.d( res ).toString() );
            displayWares().then(function() {
                mgrPrompt();
            });
        }
    });
};

function addInv() {
    displayWares().then(function(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you want adjust the quantity? \n",
            name: "updateItem"
        },
        {
            type: "input",
            message: "How many will you be adding to stock?",
            name: "updateQuant"
        }
    ]).then(function(inquirerResponse) {
        connection.query("UPDATE products SET stock_quantity = (stock_quantity" + "+" + inquirerResponse.updateQuant + ") WHERE item_id = " + inquirerResponse.updateItem, function(err){
            if (err) throw err;
        console.log("You successfully added " + inquirerResponse.prodQuant + " to our stock." ) 
        displayWares().then(function() {
            mgrPrompt();
        });
        });
        

    })
    });
};

function addItem(){

    inquirer.prompt([
        // Here we create a basic text prompt.
        {
        type: "input",
        message: "What is the item you would like to add?",
        name: "itemName"
        },
        {
        type: "input",
        message: "What department does this item belong in?",
        name: "itemDept"
        },
        {
        type: "input",
        message: "What is the item price?",
        name: "itemPrice"
        },
        {
        type: "input",
        message: "How many if this item are being added to the inventory?",
        name: "itemQuant"
        },
        {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
        }
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.confirm) {
            var post = {product_name: inquirerResponse.@mh3rst^
                itemName, department_name: inquirerResponse.itemDept, price: inquirerResponse.itemPrice, stock_quantity: inquirerResponse.itemQuant}
            var query = ("INSERT INTO products SET ?");  
            connection.query(query, post, function(err) {
                if (err) throw err;
                console.log("Inventory item added successfully")
                displayWares().then(function() {
                    mgrPrompt();
                });
            });
        } else {
        console.log("\nThat's okay try again when you are more sure.\n");
        displayWares().then(function() {
            mgrPrompt();
        });
        };
    });
};