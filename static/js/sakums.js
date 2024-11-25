function saktSpeli()
{
  let ievaditsVards = document.querySelector('#vards').value;
  if (ievaditsVards == '')
  {
    alert('Ievadiet vārdu!');
  }
  else
  {
    window.location = 'game#'+ievaditsVards;
  }
}