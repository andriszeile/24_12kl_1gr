//no URL iegūst vārdu un ievieto to virsrakstā
let adrese = window.location.hash;
adrese = decodeURI(adrese);
adrese = adrese.replace('#','');
adrese = adrese.split(",");
vards  = adrese[0];
klikski = adrese[1];
laiks = adrese[2];

let datums = new Date();
let datumsVirkne = datums.getDate()+'.'+datums.getMonth()+'.'+datums.getFullYear()+'.'

async function iegutDatusNoApi(url)
{
  let datiNoServera = await fetch(url);
  let datiNoServeraJson = await datiNoServera.json();
  return datiNoServeraJson;
}

async function atlasitTop();
{
  iegutDatusNoApi('cels pie datiem json');
  let topsJson = await iegutDatusNoApi('topData');
  console.log(datiJson);
  for (i=0; i < topsJson.lenght; i++)
  {
    let tabula = document.querySelector(".tops");

    tabula.innerHTML = tabula.innerHTML+`
    <tr id="`+topsJson[i]['id']+`">
      <td> `+topsJson[i]['vards']+` </td>
      <td> `+topsJson[i]['klikski']+` </td>
      <td> `+topsJson[i]['laiks']+` </td>
      <td> `+topsJson[i]['datums']+` </td>
    </tr>`;
  }
}

atlasitTop();


function pievienotTop() {
  let tabula = document.querySelector('.tops');
  tabula.innerHTML = tabula.innerHTML +`
    <tr id='jauns'>
      <td>`+vards+`</td>
      <td>`+klikski+`</td>
      <td>`+laiks+`</td>
      <td>`+datumsVirkne+`</td>
    </tr>`;
}