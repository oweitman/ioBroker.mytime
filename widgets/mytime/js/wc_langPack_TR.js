/*
Autor: oweitman
Datum: 03.08.2021
Version: 1.0

WordClock LanguagePack TR

*/

vis.binds['mytime'].wordclock.addLanguage({
  langCode: 'TR',
  letterSet: [
    ["S", "A", "A", "T", "R", "O", "N", "U", "Ü", "Ç", "Ü"], 
    ["B", "İ", "R", "İ", "A", "L", "T", "I", "Y", "I", "D"], 
    ["İ", "K", "İ", "Y", "İ", "D", "O", "K", "U", "Z", "U"], 
    ["D", "Ö", "R", "D", "Ü", "Y", "E", "D", "İ", "Y", "İ"], 
    ["S", "E", "K", "I", "Z", "İ", "Y", "A", "R", "I", "M"], 
    ["D", "Ö", "R", "T", "A", "M", "S", "B", "E", "Ş", "İ"], 
    ["K", "P", "M", "O", "T", "U", "Z", "K", "I", "R", "K"], 
    ["E", "L", "L", "İ", "O", "N", "Y", "İ", "R", "M", "İ"], 
    ["B", "U", "Ç", "U", "K", "Ç", "E", "Y", "R", "E", "K"], 
    ["B", "E", "Ş", "M", "G", "E", "Ç", "İ", "Y", "O", "R"]
  ],
  timeString: function(h, m, settings = { round: false }) {
    var ret = 'SAAT ';
    h %= 12;
    //if (h == 0) h = 12;
    var hourNames1 = [
      'ON İKİ ',
      'BİR ',
      'İKİ ',
      'ÜÇ ',
      'DÖRT ',
      'BEŞ ',
      'ALTI ',
      'YEDİ ',
      'SEKIZ ',
      'DOKUZ ',
      'ON ',
      'ON BİR ',
    ];
    var hourNames2 = [
      'ON İKİYİ ',
      'BİRİ ',
      'İKİYİ ',
      'ÜÇÜ ',
      'DÖRDÜ ',
      'BEŞİ ',
      'ALTIYI ',
      'YEDİYİ ',
      'SEKIZİ ',
      'DOKUZU ',
      'ONU ',
      'ON BİRİ ',
    ];
    switch (
      (settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60
    ) {
      case 0:
        ret += hourNames1[h] + ' ';
        break;
      case 5:
        ret += hourNames2[h] + 'BEŞ GEÇİYOR ';
        break;
      case 10:
        ret += hourNames2[h] + 'ON GEÇİYOR ';
        break;
      case 15:
        ret += hourNames2[h] + 'ON BEŞ GEÇİYOR ';
        break;
      case 20:
        ret += hourNames2[h] + 'YİRMİ GEÇİYOR ';
        break;
      case 25:
        ret += hourNames2[h] + 'YİRMİ BEŞ GEÇİYOR ';
        break;
      case 30:
        ret += hourNames1[h] + 'BUÇUK ';
        break;
      case 35:
        ret += hourNames2[h] + 'OTUZ  BEŞ GEÇİYOR ';
        break;
      case 40:
        ret += hourNames2[h] + 'KIRK GEÇİYOR ';
        break;
      case 45:
        ret += hourNames2[h] + 'KIRK BEŞ GEÇİYOR ';
        break;
      case 50:
        ret += hourNames2[h] + 'ELLİ GEÇİYOR ';
        break;
      case 55:
        ret += hourNames2[h] + 'ELLİ BEŞ GEÇİYOR ';
        break;
    }
    return ret;
  }
});
