const BASEURL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let fromSelectEle = document.getElementById("fromCurrency");
let toSelectEle = document.getElementById("toCurrency");
let fromFlagEle = document.getElementById("fromFlag");
let toFlagEle = document.getElementById("toFlag");
let amountEle = document.getElementById("inputAmount");
let resultEle = document.getElementById("currencyResult");
let convertButtonEle = document.getElementById("convertButton");
/*async function getConversionRate(url,fromCurrency, toCurrency){
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    //console.log(data[fromCurrency][toCurrency]);
    return data[fromCurrency][toCurrency];
}*/

// covert button logic
convertButtonEle.onclick = async () => {
    let amountValue = amountEle.value;
    // Validate amount input
    let fromCurrency = fromSelectEle.value.toLowerCase();
    let toCurrency = toSelectEle.value.toLowerCase();
    if(amountValue === ""|| amountValue<1){
        amountEle.value = 1;
        amountValue = 1;
    }
    if(fromCurrency === toCurrency){
        resultEle.textContent = "Please select different currencies for conversion.";
        return;
    }
    if(!fromCurrency || !toCurrency){
        resultEle.textContent = "Please select both currencies.";
        return;
    }
    // create API URL based on selected currencies
    let urlAPI = `${BASEURL}/${fromCurrency}.json`;
    // get data from API and calculate conversion rate
    let response = await fetch(urlAPI);
    let data = await response.json();
    let rate = data[fromCurrency][toCurrency];
    //let rate = getConversionRate(urlAPI,fromCurrency, toCurrency);
    //resultEle.textContent = rate*amountValue;
    //console.log(rate,amountValue, typeof rate, typeof amountValue);
    resultEle.textContent = `${amountValue} ${fromCurrency.toUpperCase()} = ${rate*amountValue} ${toCurrency.toUpperCase()}`;
    amountEle.value = 1;// Reset input amount after conversion
}

// at start set default flags as US and IN and call convert button onclick event to show usd to inr conversion
window.addEventListener("load", () => {
    fromFlagEle.src = `https://flagsapi.com/US/flat/64.png`;
    toFlagEle.src = `https://flagsapi.com/IN/flat/64.png`;

    convertButtonEle.onclick();
});


// change flag images based on selected currencies
fromSelectEle.addEventListener("change", () =>{
    fromFlagEle.src = `https://flagsapi.com/${countryList[fromSelectEle.value]}/flat/64.png`;
});
toSelectEle.addEventListener("change", () => {
    toFlagEle.src = `https://flagsapi.com/${countryList[toSelectEle.value]}/flat/64.png`;
});

// adding options to select elements of from and to using countryList
for(item in countryList){
    let optionEle = document.createElement("option");
    optionEle.value = item;
    optionEle.textContent = item;
    //console.log(optionEle);
    fromSelectEle.appendChild(optionEle);
    if(item === "USD"){
        optionEle.selected = "selected"; // Set default from currency to USD
    }
};

for(item in countryList){
    let optionEle = document.createElement("option");
    optionEle.value = item;
    optionEle.textContent = item;
    //console.log(optionEle);
    toSelectEle.appendChild(optionEle);
    if(item === "INR"){
        optionEle.selected = "selected"; // Set default to currency to INR
    }
};