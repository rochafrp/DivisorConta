function addItem() {
  var table = document.getElementById("billTable");
  var row = table.insertRow(table.rows.length);
  var itemCell = row.insertCell(0);
  var priceCell = row.insertCell(1);
  var clientCell = row.insertCell(2);

  itemCell.innerHTML = '<input type="text">';
  priceCell.innerHTML = '<input type="number" step="0.01" min="0.01">';
  clientCell.innerHTML = '<input type="text" placeholder="Separar clientes por vírgula">';
}

function splitBill() {
  var table = document.getElementById("billTable");
  var sharedTotal = 0;
  var clientsTotal = {};

  for (var i = 1; i < table.rows.length; i++) {
      var itemInput = table.rows[i].cells[0].getElementsByTagName("input")[0];
      var priceInput = table.rows[i].cells[1].getElementsByTagName("input")[0];
      var clientInput = table.rows[i].cells[2].getElementsByTagName("input")[0];

      var item = itemInput.value;
      var price = parseFloat(priceInput.value);
      var clientNames = clientInput.value.trim().split(",");

      sharedTotal += price;

      var numClients = clientNames.length;

      for (var j = 0; j < numClients; j++) {
          var client = clientNames[j].trim();
          if (client !== "") {
              if (clientsTotal[client]) {
                  clientsTotal[client] += price / numClients;
              } else {
                  clientsTotal[client] = price / numClients;
              }
          }
      }
  }

  var includeTip = document.getElementById("includeTip").checked;

  document.getElementById("result").innerHTML = "";

  for (var client in clientsTotal) {
      var share = clientsTotal[client].toFixed(2);

      if (includeTip) {
          var shareWithTip = (clientsTotal[client] * 1.1).toFixed(2);
          document.getElementById("result").innerHTML += "Cliente: " + client + " - Total a pagar (com 10% de gorjeta): R$ " + shareWithTip + "<br>";
      } else {
          document.getElementById("result").innerHTML += "Cliente: " + client + " - Total a pagar: R$ " + share + "<br>";
      }
  }
}


