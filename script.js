// backup rates in case the live fetch fails (1 unit = X USD)
var rates = {
  USD: 1,
  INR: 83.2,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 147.5,
  AUD: 1.53,
  CAD: 1.36
};

var fromSelect = document.getElementById("from");
var toSelect = document.getElementById("to");
var statusNote = document.getElementById("statusNote");

// fill dropdowns using the backup list first, so the page works right away
function fillDropdowns() {
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";
  for (var currency in rates) {
    var option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    fromSelect.appendChild(option1);

    var option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    toSelect.appendChild(option2);
  }
  fromSelect.value = "USD";
  toSelect.value = "INR";
}

fillDropdowns();

// try to get live rates (base = USD) from a free API, no key needed
fetch("https://open.er-api.com/v6/latest/USD")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if (data && data.result === "success" && data.rates) {
      // keep only the currencies we care about
      var wanted = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];
      var liveRates = {};
      for (var i = 0; i < wanted.length; i++) {
        var code = wanted[i];
        if (data.rates[code]) {
          liveRates[code] = data.rates[code];
        }
      }
      rates = liveRates;
      fillDropdowns();
      statusNote.innerHTML = "live rates loaded ✅ (updated " + data.time_last_update_utc + ")";
    } else {
      throw new Error("bad response");
    }
  })
  .catch(function (error) {
    // if the fetch fails, just keep using the backup rates
    console.log("couldn't fetch live rates, using backup values", error);
    statusNote.innerHTML = "couldn't load live rates, using backup values ⚠️";
  });

function convertMoney() {
  var amount = document.getElementById("amount").value;
  var fromCurrency = fromSelect.value;
  var toCurrency = toSelect.value;
  var resultBox = document.getElementById("result");

  if (amount === "" || isNaN(amount)) {
    resultBox.innerHTML = "Please enter a valid number!";
    return;
  }

  // convert amount to USD first, then to target currency
  var amountInUSD = amount / rates[fromCurrency];
  var finalAmount = amountInUSD * rates[toCurrency];

  resultBox.innerHTML = amount + " " + fromCurrency + " = " + finalAmount.toFixed(2) + " " + toCurrency;
}
