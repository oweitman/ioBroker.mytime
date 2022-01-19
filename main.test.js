'use strict';

/**
 * This is a dummy TypeScript test file using chai and mocha
 *
 * It's automatically excluded from npm and its build output is excluded from both git and npm.
 * It is advised to test all your modules with accompanying *.test.js-files
 */

// tslint:disable:no-unused-expression
debugger;
const { expect } = require('chai');
var loadModule = require('./test/module-loader').loadModule;

// import { functionToTest } from "./moduleToTest";

describe('module to test => function to test', () => {
    // initializing logic
    const expected = 5;

    it(`should return ${expected}`, () => {
        const result = 5;
        // assign result a value from functionToTest
        expect(result).to.equal(expected);
        // or using the should() syntax
        result.should.equal(expected);
    });
    // ... more tests => it

});

var vis = {
    binds: {
        mytime: {
            wordclock: {
                addLanguage: function(lang){this.lang_pack.push(lang)},
                lang_pack:[]
            }
        }
    }
}

// ... more test suites => describe

describe('wordclock => Italian', () => {

    var pack = loadModule('./widgets/mytime/js/wc_langPack_IT.js', {vis:vis});
    
    var data = [
    {h:11,m:55,expected:"SONO LE ORE DODICI MENO CINQUE "},
    {h:0,m:0,expected:"SONO LE ORE DODICI "},
    {h:0,m:5,expected:"SONO LE ORE DODICI E CINQUE "},
    {h:12,m:0,expected:"SONO LE ORE DODICI "},
    {h:12,m:5,expected:"SONO LE ORE DODICI E CINQUE "},
    {h:12,m:55,expected:"È L' UNA MENO CINQUE "},
    {h:1,m:0,expected:"È L' UNA "},
    {h:1,m:5,expected:"È L' UNA E CINQUE "},
    {h:10,m:35,expected:"SONO LE ORE UNDICI MENO VENTICINQUE "},
    {h:10,m:55,expected:"SONO LE ORE UNDICI MENO CINQUE "},
    {h:11,m:5,expected:"SONO LE ORE UNDICI E CINQUE "},
    {h:11,m:20,expected:"SONO LE ORE UNDICI E VENTI "},
    {h:11,m:25,expected:"SONO LE ORE UNDICI E VENTICINQUE "},
    {h:11,m:30,expected:"SONO LE ORE UNDICI E MEZZA "},
    {h:0,m:15,expected:"SONO LE ORE DODICI E UN QUARTO "},
    {h:1,m:15,expected:"È L' UNA E UN QUARTO "},
    {h:2,m:15,expected:"SONO LE ORE DUE E UN QUARTO "},
    {h:3,m:15,expected:"SONO LE ORE TRE E UN QUARTO "},
    {h:4,m:15,expected:"SONO LE ORE QUATTRO E UN QUARTO "},
    {h:5,m:15,expected:"SONO LE ORE CINQUE E UN QUARTO "},
    {h:6,m:15,expected:"SONO LE ORE SEI E UN QUARTO "},
    {h:7,m:15,expected:"SONO LE ORE SETTE E UN QUARTO "},
    {h:8,m:15,expected:"SONO LE ORE OTTO E UN QUARTO "},
    {h:9,m:15,expected:"SONO LE ORE NOVE E UN QUARTO "},
    {h:10,m:15,expected:"SONO LE ORE DIECI E UN QUARTO "},
    {h:11,m:15,expected:"SONO LE ORE UNDICI E UN QUARTO "},
    {h:12,m:15,expected:"SONO LE ORE DODICI E UN QUARTO "},
    {h:11,m:45,expected:"SONO LE ORE DODICI MENO UN QUARTO "},
    {h:0,m:45,expected:"È L' UNA MENO UN QUARTO "},
    {h:1,m:45,expected:"SONO LE ORE DUE MENO UN QUARTO "},
    {h:2,m:45,expected:"SONO LE ORE TRE MENO UN QUARTO "},
    {h:3,m:45,expected:"SONO LE ORE QUATTRO MENO UN QUARTO "},
    {h:4,m:45,expected:"SONO LE ORE CINQUE MENO UN QUARTO "},
    {h:5,m:45,expected:"SONO LE ORE SEI MENO UN QUARTO "},
    {h:6,m:45,expected:"SONO LE ORE SETTE MENO UN QUARTO "},
    {h:7,m:45,expected:"SONO LE ORE OTTO MENO UN QUARTO "},
    {h:8,m:45,expected:"SONO LE ORE NOVE MENO UN QUARTO "},
    {h:9,m:45,expected:"SONO LE ORE DIECI MENO UN QUARTO "},
    {h:10,m:45,expected:"SONO LE ORE UNDICI MENO UN QUARTO "},
    {h:11,m:45,expected:"SONO LE ORE DODICI MENO UN QUARTO "},
    {h:12,m:45,expected:"È L' UNA MENO UN QUARTO "},
    {h:11,m:5,expected:"SONO LE ORE UNDICI E CINQUE "},
    {h:11,m:10,expected:"SONO LE ORE UNDICI E DIECI "},
    {h:11,m:15,expected:"SONO LE ORE UNDICI E UN QUARTO "},
    {h:11,m:20,expected:"SONO LE ORE UNDICI E VENTI "},
    {h:11,m:25,expected:"SONO LE ORE UNDICI E VENTICINQUE "},
    {h:11,m:30,expected:"SONO LE ORE UNDICI E MEZZA "},
    {h:11,m:35,expected:"SONO LE ORE DODICI MENO VENTICINQUE "},
    {h:11,m:40,expected:"SONO LE ORE DODICI MENO VENTI "},
    {h:11,m:45,expected:"SONO LE ORE DODICI MENO UN QUARTO "},
    {h:11,m:50,expected:"SONO LE ORE DODICI MENO DIECI "},
    {h:11,m:55,expected:"SONO LE ORE DODICI MENO CINQUE "},
    ];
    data.forEach(el=>{
        it(`should return ${el.h.toString().padStart(2,"0")}:${el.m.toString().padStart(2,"0")} ${el.expected}`, () => {
            // assign result a value from functionToTest
            var result = pack.vis.binds.mytime.wordclock.lang_pack[0].timeString(el.h,el.m);
            expect(result).to.equal(el.expected);
            // or using the should() syntax
            result.should.equal(el.expected);
        });
    });
    data.forEach(el=>{
        it(`should find ${el.expected} in matrix`, () => {
            // assign result a value from functionToTest
            var timewords = pack.vis.binds.mytime.wordclock.lang_pack[0].timeString(el.h,el.m).split(" ");
            var displayChars = pack.vis.binds.mytime.wordclock.lang_pack[0].letterSet.map(row=>row.join('')).join('');
            var result = true;
            var offset=0;
            for(var j=0; j<timewords.length; j++){
                var start = displayChars.indexOf(timewords[j],offset);
                result = result && start>-1;
                offset=start+1;
            }
            result.should.equal(true);
        });
    });
});

describe('wordclock => Deutsch', () => {

    var pack = loadModule('./widgets/mytime/js/wc_langPack_DE.js', {vis:vis});
    
    var data = [
    {h:0,m:0,expected:"ES IST ZWÖLF UHR "},
    {h:1,m:0,expected:"ES IST EIN UHR "},
    {h:2,m:0,expected:"ES IST ZWEI UHR "},
    {h:3,m:0,expected:"ES IST DREI UHR "},
    {h:4,m:0,expected:"ES IST VIER UHR "},
    {h:5,m:0,expected:"ES IST FÜNF UHR "},
    {h:6,m:0,expected:"ES IST SECHS UHR "},
    {h:7,m:0,expected:"ES IST SIEBEN UHR "},
    {h:8,m:0,expected:"ES IST ACHT UHR "},
    {h:9,m:0,expected:"ES IST NEUN UHR "},
    {h:10,m:0,expected:"ES IST ZEHN UHR "},
    {h:11,m:0,expected:"ES IST ELF UHR "},
    {h:12,m:0,expected:"ES IST ZWÖLF UHR "},
    {h:2,m:5,expected:"ES IST FÜNF NACH ZWEI UHR "},
    {h:2,m:10,expected:"ES IST ZEHN NACH ZWEI UHR "},
    {h:2,m:15,expected:"ES IST VIERTEL NACH ZWEI UHR "},
    {h:2,m:20,expected:"ES IST ZWANZIG NACH ZWEI UHR "},
    {h:2,m:25,expected:"ES IST FÜNF VOR HALB DREI UHR "},
    {h:2,m:30,expected:"ES IST HALB DREI UHR "},
    {h:2,m:35,expected:"ES IST FÜNF NACH HALB DREI UHR "},
    {h:2,m:40,expected:"ES IST ZWANZIG VOR DREI UHR "},
    {h:2,m:45,expected:"ES IST VIERTEL VOR DREI UHR "},
    {h:2,m:50,expected:"ES IST ZEHN VOR DREI UHR "},
    {h:2,m:55,expected:"ES IST FÜNF VOR DREI UHR "},
  
    ];
    data.forEach(el=>{
        it(`should return ${el.h.toString().padStart(2,"0")}:${el.m.toString().padStart(2,"0")} ${el.expected}`, () => {
            // assign result a value from functionToTest
            var result = pack.vis.binds.mytime.wordclock.lang_pack[0].timeString(el.h,el.m);
            expect(result).to.equal(el.expected);
            // or using the should() syntax
            result.should.equal(el.expected);
        });
    });
    data.forEach(el=>{
        it(`should find ${el.expected} in matrix`, () => {
            // assign result a value from functionToTest
            var timewords = pack.vis.binds.mytime.wordclock.lang_pack[0].timeString(el.h,el.m).split(" ");
            var displayChars = pack.vis.binds.mytime.wordclock.lang_pack[0].letterSet.map(row=>row.join('')).join('');
            var result = true;
            var offset=0;
            for(var j=0; j<timewords.length; j++){
                var start = displayChars.indexOf(timewords[j],offset);
                result = result && start>-1;
                offset=start+1;
            }
            result.should.equal(true);
        });
    });
});

describe('wordclock => CH Bern', () => {

    var pack = loadModule('./widgets/mytime/js/wc_langPack_CH_BERN.js', {vis:vis});

    var data = [
    {h:0,m:0,expected:"ÄS ISCH ZWÖUFI"},
    {h:1,m:0,expected:"ÄS ISCH EIS"},
    {h:2,m:0,expected:"ÄS ISCH ZWÖI"},
    {h:3,m:0,expected:"ÄS ISCH DRÜÜ"},
    {h:4,m:0,expected:"ÄS ISCH VIERI"},
    {h:5,m:0,expected:"ÄS ISCH FÜFI"},
    {h:6,m:0,expected:"ÄS ISCH SÄCHSI"},
    {h:7,m:0,expected:"ÄS ISCH SIBNI"},
    {h:8,m:0,expected:"ÄS ISCH ACHTI"},
    {h:9,m:0,expected:"ÄS ISCH NÜNI"},
    {h:10,m:0,expected:"ÄS ISCH ZÄHNI"},
    {h:11,m:0,expected:"ÄS ISCH EUFI"},
    {h:12,m:0,expected:"ÄS ISCH ZWÖUFI"},
    {h:2,m:5,expected:"ÄS ISCH FÜF AB ZWÖI"},
    {h:2,m:10,expected:"ÄS ISCH ZÄH AB ZWÖI"},
    {h:2,m:15,expected:"ÄS ISCH VIERTU AB ZWÖI"},
    {h:2,m:20,expected:"ÄS ISCH ZWÄNZG AB ZWÖI"},
    {h:2,m:25,expected:"ÄS ISCH FÜF VOR HAUBI DRÜÜ"},
    {h:2,m:30,expected:"ÄS ISCH HAUBI DRÜÜ"},
    {h:2,m:35,expected:"ÄS ISCH FÜF AB HAUBI DRÜÜ"},
    {h:2,m:40,expected:"ÄS ISCH ZWÄNZG VOR DRÜÜ"},
    {h:2,m:45,expected:"ÄS ISCH VIERTU VOR DRÜÜ"},
    {h:2,m:50,expected:"ÄS ISCH ZÄH VOR DRÜÜ"},
    {h:2,m:55,expected:"ÄS ISCH FÜF VOR DRÜÜ"},

    {h:0,m:10,expected:"ÄS ISCH ZÄH AB ZWÖUFI"},
    {h:1,m:10,expected:"ÄS ISCH ZÄH AB EIS"},
    {h:2,m:10,expected:"ÄS ISCH ZÄH AB ZWÖI"},
    {h:3,m:10,expected:"ÄS ISCH ZÄH AB DRÜÜ"},
    {h:4,m:10,expected:"ÄS ISCH ZÄH AB VIERI"},
    {h:5,m:10,expected:"ÄS ISCH ZÄH AB FÜFI"},
    {h:6,m:10,expected:"ÄS ISCH ZÄH AB SÄCHSI"},
    {h:7,m:10,expected:"ÄS ISCH ZÄH AB SIBNI"},
    {h:8,m:10,expected:"ÄS ISCH ZÄH AB ACHTI"},
    {h:9,m:10,expected:"ÄS ISCH ZÄH AB NÜNI"},
    {h:10,m:10,expected:"ÄS ISCH ZÄH AB ZÄHNI"},
    {h:11,m:10,expected:"ÄS ISCH ZÄH AB EUFI"},
    {h:12,m:10,expected:"ÄS ISCH ZÄH AB ZWÖUFI"},

    ];

    data.forEach(el=>{
        it(`should return ${el.h.toString().padStart(2,"0")}:${el.m.toString().padStart(2,"0")} ${el.expected}`, () => {
            // assign result a value from functionToTest
            var result = pack.vis.binds.mytime.wordclock.lang_pack[0].timeString(el.h,el.m);
            expect(result).to.equal(el.expected);
            // or using the should() syntax
            result.should.equal(el.expected);
        });
    });

    data.forEach(el=>{
        it(`should find ${el.expected} in matrix`, () => {
            // assign result a value from functionToTest
            var timewords = pack.vis.binds.mytime.wordclock.lang_pack[0].timeString(el.h,el.m).split(" ");
            var displayChars = pack.vis.binds.mytime.wordclock.lang_pack[0].letterSet.map(row=>row.join('')).join('');
            var result = true;
            var offset=0;
            for(var j=0; j<timewords.length; j++){
                var start = displayChars.indexOf(timewords[j],offset);
                result = result && start>-1;
                offset=start+1;
            }
            result.should.equal(true);
        });
    });



});
