var jwt = require("jsonwebtoken");

function Util() {}

Util.prototype.createToken = function(info){
	console.log(new Date().getTime());
	var obj = {"info":info,date:new Date().getTime()};
	return jwt.sign(obj, "564168%1sa8#$8sd$a$6$$68sa1@#$&1c8sa1c8as1c68as1c68as1651F1d65s1f")
}

Util.prototype.removeChar = function (str,char) {
	while(str.indexOf(char) != -1){
		str = str.replace(char,"");
	}
	return str;
}
Util.prototype.replaceChar = function (str,charfind,charreplace) {
	while(str.indexOf(charfind) != -1){
		str = str.replace(charfind,charreplace);
	}
	return str;
}

Util.prototype.replaceAllAcentos = function(str, charreplace){
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		A : /[\xC0-\xC6]/g,
		e : /[\xE8-\xEB]/g,
		E : /[\xC8-\xCB]/g,
		i : /[\xEC-\xEF]/g,
		I : /[\xCC-\xCF]/g,
		o : /[\xF2-\xF6]/g,
		O : /[\xD2-\xD6]/g,
		u : /[\xF9-\xFC]/g,
		U : /[\xD9-\xDC]/g,
		c : /\xE7/g,
		C : /\xC7/g,
		n : /\xF1/g,
		N : /\xD1/g,
	};
	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		str = str.replace( expressaoRegular, charreplace );
	}

	return str;
}

Util.prototype.removerAcentos = function( newStringComAcento ) {
	var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		A : /[\xC0-\xC6]/g,
		e : /[\xE8-\xEB]/g,
		E : /[\xC8-\xCB]/g,
		i : /[\xEC-\xEF]/g,
		I : /[\xCC-\xCF]/g,
		o : /[\xF2-\xF6]/g,
		O : /[\xD2-\xD6]/g,
		u : /[\xF9-\xFC]/g,
		U : /[\xD9-\xDC]/g,
		c : /\xE7/g,
		C : /\xC7/g,
		n : /\xF1/g,
		N : /\xD1/g,
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}
module.exports = new Util();