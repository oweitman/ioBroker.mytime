/*
Autor: oweitman
Datum: 02.08.2021
Version: 1.0

WordClock LanguagePack Italia 

*/

vis.binds['mytime'].wordclock.addLanguage({
  langCode: 'IT',
  letterSet: [
    ['S', 'O', 'N', 'O', 'R', 'L', 'E', 'B', 'O', 'R', 'E'],
    ['È', 'R', 'L', '\'','U', 'N', 'A', 'D', 'U', 'E', 'Z'],
    ['T', 'R', 'E', 'O', 'T', 'T', 'O', 'N', 'O', 'V', 'E'],
    ['D', 'I', 'E', 'C', 'I', 'U', 'N', 'D', 'I', 'C', 'I'],
    ['D', 'O', 'D', 'I', 'C', 'I', 'S', 'E', 'T', 'T', 'E'],
    ['Q', 'U', 'A', 'T', 'T', 'R', 'O', 'C', 'S', 'E', 'I'],
    ['C', 'I', 'N', 'Q', 'U', 'E', 'S', 'M', 'E', 'N', 'O'],
    ['E', 'C', 'U', 'N', 'O', 'Q', 'U', 'A', 'R', 'T', 'O'],
    ['V', 'E', 'N', 'T', 'I', 'C', 'I', 'N', 'Q', 'U', 'E'],
    ['D', 'I', 'E', 'C', 'I', 'E', 'M', 'E', 'Z', 'Z', 'A']
  ],
  timeString: function(h, m, settings = { round: false }) {
    var ret = '';
    h %= 12;
    if (h == 0) h = 12;
    var hourNames = [
      'DODICI',
      'UNA',
      'DUE',
      'TRE',
      'QUATTRO',
      'CINQUE',
      'SEI',
      'SETTE',
      'OTTO',
      'NOVE',
      'DIECI',
      'UNDICI'
    ];
    if (h==1) {
        ret += "È L' ";
    } else {
        ret += "SONO LE ORE ";        
    }
    ret += hourNames[h]+" ";
    
    var min = (settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60;
    if (min >=5) {
        if (min<35) {
            ret += "E ";
        } else {
            ret += "MENO ";
        }
    }
    
    min = (settings.round ? Math.round(m / 5)  : Math.floor(m / 5) ) % 60;
    switch (
      min
    ) {
      case 1:
      case 11:
        ret += "CINQUE ";
        break;
      case 2:
      case 10:
        ret += "DIECI ";
        break;
      case 3:
      case 9:
        ret += "UN QUARTO ";
        break;
      case 4:
      case 8:
        ret += "VENTI ";
        break;
      case 5:
      case 7:
        ret += "VENTICINQUE ";
        break;
      case 6:
        ret += "MEZZA ";
        break;
    }
    return ret;
  }
});
