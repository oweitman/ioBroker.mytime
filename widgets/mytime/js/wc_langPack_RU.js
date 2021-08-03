/*
Autor: oweitman
Datum: 03.08.2021
Version: 1.0

WordClock LanguagePack RU

*/

vis.binds['mytime'].wordclock.addLanguage({
  langCode: 'RU',
  letterSet: [
    ["О", "Д", "И", "Н", "П", "Я", "Т", "Ь", "Д", "В", "А"], 
    ["Д", "Е", "Ш", "Е", "С", "Т", "Ь", "В", "Я", "Т", "Ь"], 
    ["В", "О", "Ч", "Е", "С", "Е", "М", "Ь", "Т", "Р", "И"], 
    ["Т", "Ы", "Д", "В", "Е", "Р", "Е", "С", "Я", "Т", "Ь"], 
    ["Н", "А", "Д", "Ц", "А", "Т", "Ь", "Ч", "А", "С", "А"], 
    ["Ч", "А", "С", "О", "В", "Д", "С", "О", "Р", "О", "К"], 
    ["Т", "Р", "И", "Д", "В", "А", "Д", "П", "Я", "Т", "Ь"], 
    ["П", "Я", "Т", "Н", "А", "Д", "Е", "Ц", "А", "Т", "Ь"], 
    ["А", "М", "Д", "Е", "С", "Я", "Т", "С", "Я", "Т", "Ь"], 
    ["П", "Я", "Т", "Ь", "Я", "Р", "М", "И", "Н", "У", "Т"]
  ],
  timeString: function(h, m, settings = { round: false }) {
    var ret = '';
    h %= 12;
    if (h == 0) h = 12;
    var hourNames = [
      'ДВЕ НАДЦАТЬ ЧАСОВ ',
      'ОДИН ЧАС ',
      'ДВА ЧАСА ',
      'ТРИ ЧАСА ',
      'ЧЕ ТЫ РЕ ЧАСА ',
      'ПЯТЬ ЧАСОВ ',
      'ШЕСТЬ ЧАСОВ ',
      'СЕМЬ ЧАСОВ ',
      'ВО СЕМЬ ЧАСОВ ',
      'ДЕ ВЯТЬ ЧАСОВ ',
      'ДЕ СЯТЬ ЧАСОВ ',
      'ОДИН НАДЦАТЬ ЧАСОВ '
    ];
    switch (
      (settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60
    ) {
      case 5:
        ret += hourNames[h] + 'ПЯТЬ МИНУТ ';
        break;
      case 10:
        ret += hourNames[h] + 'ДЕ СЯТЬ МИНУТ ';
        break;
      case 15:
        ret += hourNames[h] + 'ПЯТНАД ЦАТЬ МИНУТ ';
        break;
      case 20:
        ret += hourNames[h] + 'ДВАД ЦАТЬ МИНУТ ';
        break;
      case 25:
        ret += hourNames[h] + 'ДВАД ЦАТЬ ПЯТЬ МИНУТ ';
        break;
      case 30:
        ret += hourNames[h] + 'ТРИД ЦАТЬ МИНУТ ';
        break;
      case 35:
        ret += hourNames[h] + 'ТРИД ЦАТЬ ПЯТЬ МИНУТ ';
        break;
      case 40:
        ret += hourNames[h] + 'СОРОК МИНУТ ';
        break;
      case 45:
        ret += hourNames[h] + 'СОРОК ПЯТЬ МИНУТ ';
        break;
      case 50:
        ret += hourNames[h] + 'ПЯТЬ ДЕСЯТ МИНУТ ';
        break;
      case 55:
        ret += hourNames[h] + 'ПЯТЬ ДЕСЯТ ПЯТЬ МИНУТ ';
        break;
    }
    return ret;
  }
});
