var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bmazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

inquirer.prompt([
    {
        type: "input",
        name: "item",
        message: "What would you like to buy?" + "\n"+"Type 'list' to see whats for sale!"
      },
    ]).then(function(user) {console.log(user.item);
        if (user.item === "socks") {deleteProduct()}
        if (user.item === "shirts") {deleteProduct()}
        if (user.item === "toycar") {deleteProduct()}
        if (user.item === "shoes") {deleteProduct()}
        if (user.item === "show") {readProducts()}
        else {console.log("please try inputting an item, or type 'list' to see everything!")}


function updateProduct() {
  console.log("Updating all sock quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        product_name: "socks"
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("buying item...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      product_name: user.item
    },
    function(err, res) {
      console.log(res.affectedRows + " products bought!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}})