export function convertToRupiah(decimal) {
	var rupiah = '';
	var number = parseFloat(decimal).toFixed(0)
	var numberRev = number.toString().split('').reverse().join('');
	for(var i = 0; i < numberRev.length; i++) if(i%3 == 0) rupiah += numberRev.substr(i,3)+'.';
	return rupiah.split('',rupiah.length-1).reverse().join('');
}

export function addZero(i) {
  if (i < 10) {
    i = "0" + i
  }
  return i
}

export function convertDateIndonesia(date) {
  var dt = new Date(date);
  var d = addZero(dt.getDate())
  var month = new Array();
  month[0] = "Januari";
  month[1] = "Februari";
  month[2] = "Maret";
  month[3] = "April";
  month[4] = "Mei";
  month[5] = "Juni";
  month[6] = "Juli";
  month[7] = "Agustus";
  month[8] = "September";
  month[9] = "Oktober";
  month[10] = "Nopember";
  month[11] = "Desember";
  var m = month[dt.getMonth()];
  var y = dt.getFullYear()
  return d + " " + m + " " + y
}