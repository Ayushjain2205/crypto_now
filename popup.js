document.querySelector(".changeData").addEventListener("click", changeData);

const getDataAndRender = (function getData(currency = "INR") {
  const xhr = new XMLHttpRequest();
  const url = "min-api.cryptocompare.com/data/top/totalvolfull";
  xhr.open(
    "GET",
    `https://${url}?limit=10&tsym=${currency}&api_key=fb964ca47e691ec0d1ea7d92558b1e194af47c1d705051f8e8797a8a7c2c57fe`,
    true
  );

  let output =
    "<tr> < td ><b></b> </td> <b>Coin</b> </td> <td> <b>PRICE</b> </td> <td> <b>HIGH DAY</b> </td> <td> <b>LOW DAY</b> </td> </tr > ";

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      const dataArr = response.Data;
      dataArr.forEach(function (data) {
        const name = data.CoinInfo.FullName;
        const imgURL = data.CoinInfo.ImageUrl;
        const price = data.DISPLAY.INR.PRICE;
        console.log(typeof data.CoinInfo.FullName);
        const img = `https://www.cryptocompare.com/${imgURL}`;
        const highDay = data.DISPLAY.INR.HIGHDAY;
        const lowDay = data.DISPLAY.INR.LOWDAY;
        output += ` <tr><td><img src=${img} width="30" height="30"></td>
			<td>${name}</td>
			<td>${price}</td>
			<td>${highDay}</td>
			<td>${lowDay}</td></tr>`;
      });
      document.querySelector(".data-back").innerHTML = output;
    }
  };
  xhr.send();
})();

function getCurrency() {
  const selectElement = document.querySelector("#select1");

  const output = selectElement.value;

  // console.log("get" ,output);
  return output;
}

function changeData() {
  const newOutput = getCurrency();
  console.log(newOutput);
  document.querySelector(".data-back").innerHTML = "";

  getDataNew(newOutput);
}
