/*
Autor: Raphael Hoeser
Datum: 11.07.2017
Version: 1.1

WordClock LanguagePack DE

*/

vis.binds['mytime'].wordclock.addLanguage({
  langCode: 'DE',
  letterSet: [
    ["E","S","T","I","S","T","I","M","E","I","N","E"],
    ["V","I","E","R","T","E","L","A","Z","E","H","N"],
    ["Z","W","A","N","Z","I","G","F","Ü","N","F","N"],
    ["N","A","C","H","V","O","R","D","H","A","L","B"],
    ["D","A","T","Z","W","Ö","L","F","E","I","N","S"],
    ["Z","W","E","I","D","R","E","I","V","I","E","R"],
    ["F","Ü","N","F","S","E","C","H","S","E","L","F"],
    ["E","S","I","E","B","E","N","A","C","H","T","T"],
    ["N","E","U","N","I","Z","E","H","N","U","H","R"]
  ],
  timeString: function(h, m, settings = { round: false }) {
    var ret = 'ES IST ';
    h %= 12;
    if (h == 0) h = 12;
    var hourNames = [
      'EINS',
      'ZWEI',
      'DREI',
      'VIER',
      'FÜNF',
      'SECHS',
      'SIEBEN',
      'ACHT',
      'NEUN',
      'ZEHN',
      'ELF',
      'ZWÖLF'
    ];
    switch (
      (settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60
    ) {
      case 0:
        ret += (h == 1 ? 'EIN' : hourNames[h - 1]) + ' UHR';
        break;
      case 5:
        ret += 'FÜNF NACH ' + hourNames[h - 1];
        break;
      case 10:
        ret += 'ZEHN NACH ' + hourNames[h - 1];
        break;
      case 15:
        ret += 'VIERTEL NACH ' + hourNames[h - 1];
        break;
      case 20:
        ret += 'ZWANZIG NACH ' + hourNames[h - 1];
        break;
      case 25:
        ret += 'FÜNF VOR HALB ' + hourNames[h % 12];
        break;
      case 30:
        ret += 'HALB ' + hourNames[h % 12];
        break;
      case 35:
        ret += 'FÜNF NACH HALB ' + hourNames[h % 12];
        break;
      case 40:
        ret += 'ZWANZIG VOR ' + hourNames[h % 12];
        break;
      case 45:
        ret += 'VIERTEL VOR ' + hourNames[h % 12];
        break;
      case 50:
        ret += 'ZEHN VOR ' + hourNames[h % 12];
        break;
      case 55:
        ret += 'FÜNF VOR ' + hourNames[h % 12];
        break;
    }
    return ret;
  }
});
