/*
Autor: oweitman copied from https://github.com/doumlap/MMM-wordclock/blob/master/lang.js 
Datum: 02.08.2021
Version: 1.1

WordClock LanguagePack FR

*/
/* global vis */

vis.binds['mytime'].wordclock.addLanguage({
    langCode: 'fr-CA',
    letterSet: [
        ['I', 'L', 'W', 'E', 'S', 'T', 'B', 'S', 'I', 'X', 'G'],
        ['U', 'N', 'D', 'E', 'U', 'X', 'T', 'R', 'A', 'I', 'S'],
        ['Q', 'U', 'A', 'T', 'R', 'E', 'D', 'O', 'U', 'Z', 'E'],
        ['C', 'I', 'N', 'Q', 'S', 'E', 'P', 'T', 'D', 'I', 'X'],
        ['H', 'U', 'I', 'T', 'F', 'N', 'E', 'U', 'F', 'K', 'I'],
        ['O', 'N', 'Z', 'E', 'C', 'H', 'E', 'U', 'R', 'E', 'S'],
        ['E', 'T', 'D', 'U', 'T', 'R', 'E', 'N', 'T', 'E', 'R'],
        ['M', 'O', 'I', 'N', 'S', 'H', 'D', 'E', 'M', 'I', 'K'],
        ['D', 'I', 'X', 'Z', 'Q', 'U', 'A', 'R', 'T', 'S', 'D'],
        ['G', 'A', 'M', 'V', 'T', 'U', 'A', 'R', 'T', 'U', 'C'],
        ['V', 'I', 'N', 'G', 'T', '-', 'C', 'I', 'N', 'Q', 'R'],
    ],
    timeString: function (h, m, settings = { round: false }) {
        var ret = 'IL EST ';
        h %= 12;

        if (h == 0) {
            h = 12;
        }
        var hourNames = [
            'UN',
            'DEUX',
            'TROIS',
            'QUATRE',
            'CINQ',
            'SIX',
            'SEPT',
            'HUIT',
            'NEUF',
            'DIX',
            'ONZE',
            'DOUZE',
        ];
        switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
            case 0:
                ret += `${hourNames[h - 1]} HEURES`;
                break;
            case 5:
                ret += `${hourNames[h - 1]} HEURES CINQ`;
                break;
            case 10:
                ret += `${hourNames[h - 1]} HEURES DIX`;
                break;
            case 15:
                ret += `${hourNames[h - 1]} HEURES ET QUART`;
                break;
            case 20:
                ret += `${hourNames[h - 1]} HEURES ET VINGT`;
                break;
            case 25:
                ret += `${hourNames[h - 1]} HEURES ET VINGT-CINQ`;
                break;
            case 30:
                ret += `${hourNames[h - 1]} HEURES ET DEMI`;
                break;
            case 35:
                ret += `${hourNames[h - 1]} HEURES TRENTE CINQ`;
                break;
            case 40:
                ret += `${hourNames[h % 12]} HEURES MOINS VINGT`;
                break;
            case 45:
                ret += `${hourNames[h % 12]} HEURES MOINS QUART`;
                break;
            case 50:
                ret += `${hourNames[h % 12]} HEURES MOINS DIX`;
                break;
            case 55:
                ret += `${hourNames[h % 12]} HEURES MOINS CINQ`;
                break;
        }
        return ret;
    },
});
