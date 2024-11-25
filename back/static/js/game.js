//no URL iegūst vārdu un ievieto to virsrakstā
let adrese = window.location.hash;
adrese = decodeURI(adrese);
adrese = adrese.replace('#','');
adrese = adrese.split(",");
vards  = adrese[0]

//mainīgie spēles rezultātam
let laiks = 0 //new Number()
let klikski = 0
//masīvi spēles funkcionalitātei
const laukumi       = ['L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11','L12'];
const laukumiSaturs = ['😀','🤡' ,'😺' ,'🎃','😺' ,'🤖','😀','🎃' ,'🤖' ,'👽','👽' ,'🤡'];
//vienādie atvērtie laukumi
let atvertieLaukumi = [] 
//pēdējie 2 atvēwrtie laukumi
let pedejieDivi = []

//gājiena veikšana
function veiktGajienu(laukums)
{
  console.log( 'klikskis uz laukuma ' + laukums )
  klikski++ //kliksi = klikski+1
  let atvertsJaunsLaukums = false;
  if( atvertieLaukumi.indexOf(laukums) == -1 )
  { 
    atvertsJaunsLaukums = true;
    console.log("atvērts jauns laukums")
  }
//klikšķis uz laukuma
  if( atvertsJaunsLaukums )
  {	
    document.querySelector('#'+laukums+' div').style.display="block"
    pedejieDivi.push(laukums)
  }

  if( pedejieDivi.length == 2 )
  {
    console.log('divi laukumi atvērti, pārbaudam vai vai vienādi')
    atverts1_index = laukumi.indexOf( pedejieDivi[0] );
    atverts2_index = laukumi.indexOf( pedejieDivi[1] );
    if( laukumiSaturs[atverts1_index] == laukumiSaturs[atverts2_index] )
    {
      console.log('atvērti divi vienādi laukumi')
      atvertieLaukumi.push(pedejieDivi[0],pedejieDivi[1])
    }
    else
    {
      console.log('pēdējie divi nebija vienādi')
      let pedejieDivi_copy = pedejieDivi
      setTimeout(function() { pasleptLaukumu(pedejieDivi_copy[0]) }, 500);
      setTimeout(function() { pasleptLaukumu(pedejieDivi_copy[1]) }, 500);
    }
    pedejieDivi = []
  }
  //gad visi laukumi ir atvērti
  if( laukumi.length == atvertieLaukumi.length  )
  {
    console.log('visi laukumi atvērti')
    alert('Apsveicam! \nKlikški:'+klikski+'  \nLaiks:'+laiks+' \n\nTagad vari pievienoties TOPAM');
    //dati tiek nosūtīti uz top_URL
    document.location = 'top#'+vards+','+klikski+','+laiks
  
  }
}
function pasleptLaukumu(laukums)
{
  document.querySelector('#'+laukums+' div').style.display='none';
}


setInterval(skaititLaiku, 1000);
function skaititLaiku()
{
  laiks++;
}
