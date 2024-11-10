/*
Autor: oweitman
Datum: 03.08.2021
Version: 1.0

WordClock LanguagePack ES

*/

vis.binds['mytime'].wordclock.addLanguage({
  langCode: 'ES',
  letterSet: [
    ["E", "S", "O", "N", "E", "L", "A", "S", "U", "N", "A"],
    ["D", "O", "S", "I", "T", "R", "E", "S", "O", "A", "M"],
    ["C", "U", "A", "T", "R", "O", "C", "I", "N", "C", "O"],
    ["S", "E", "I", "S", "A", "S", "I", "E", "T", "E", "N"],
    ["O", "C", "H", "O", "N", "U", "E", "V", "E", "P", "M"],
    ["L", "A", "D", "I", "E", "Z", "S", "O", "N", "C", "E"],
    ["D", "O", "C", "E", "L", "Y", "M", "E", "N", "O", "S"],
    ["O", "V", "E", "I", "N", "T", "E", "D", "I", "E", "Z"],
    ["V", "E", "I", "N", "T", "I", "C", "I", "N", "C", "O"],
    ["M", "E", "D", "I", "A", "C", "U", "A", "R", "T", "O"]
  ],
  timeString: function (h, m, settings = { round: false }) {
    var ret = '';
    h %= 12;
    var hourNames = [
      'SON LAS DOCE ',
      'ES LA UNA ',
      'SON LAS DOS  ',
      'SON LAS TRES ',
      'SON LAS CUATRO ',
      'SON LAS CINCO ',
      'SON LAS SEIS ',
      'SON LAS SIETE ',
      'SON LAS OCHO ',
      'SON LAS NUEVE ',
      'SON LAS DIEZ ',
      'SON LAS ONCE '
    ];
    switch (
    (settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60
    ) {
      case 0:
        ret += hourNames[h];
        break;
      case 5:
        ret += hourNames[h] + 'Y CINCO ';
        break;
      case 10:
        ret += hourNames[h] + 'Y DIEZ ';
        break;
      case 15:
        ret += hourNames[h] + 'Y CUARTO ';
        break;
      case 20:
        ret += hourNames[h] + 'Y VEINTE ';
        break;
      case 25:
        ret += hourNames[h] + 'Y VEINTICINCO ';
        break;
      case 30:
        ret += hourNames[h] + 'Y MEDIA ';
        break;
      case 35:
        ret += hourNames[h] + 'MENOS VEINTICINCO ';
        break;
      case 40:
        ret += hourNames[h] + 'MENOS VEINTE ';
        break;
      case 45:
        ret += hourNames[h] + 'MENOS CUARTO ';
        break;
      case 50:
        ret += hourNames[h] + 'MENOS DIEZ ';
        break;
      case 55:
        ret += hourNames[h] + 'MENOS DIEZ ';
        break;
    }
    return ret;
  }
});
