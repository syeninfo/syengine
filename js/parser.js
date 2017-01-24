class Parser {

	static getWord(string, beginPosition, callback) {
		// разделители значений, их выпиливаем отдельно
		// var dividers = [":", ","];
		var dividers = [":"];
		var quoteFlags = ["\"", "'"];
		var word = new String();
		var findWord = true;
		var quoteFlag = false;

		for (var i = beginPosition; i < string.length; i++) {
			if (quoteFlag) {
				if (string[i] == "\\") {
					if (quoteFlags.indexOf(string[i + 1]) != -1) {
						word += string[i + 1];
						i++;
						continue;
					}
				}
				if (quoteFlags.indexOf(string[i]) != -1) {
					break;
				}
				// если конец строки но кавычки не закрыты, в теории ошибка
				// но мы будем считать это концом строки
				// хотя в последствии возможно както прориагрием
				if (i == string.length - 1) {
					word += string[i];
					break;
				}
				word += string[i];
				continue;
			}
			if (findWord) {
				if ((string[i] == " ") || (string[i] == "\t")) {
					continue;
				} else {
					// если слово начинается с разделителя (: или ,)
					// то отрубаем этот разделитель
					if (dividers.indexOf(string[i]) != -1) {
						word = string[i];
						break;
					}
					findWord = false;
					// ?? возможно это ненадо
					if (quoteFlags.indexOf(string[i]) != -1) {
						quoteFlag = true;
						continue;
					}
				}
			} else {
				// вырубаем двоеточия и запяты отдельно
				// так как возможны конструкции (x: 10)
				// и двоеточие приклеится к x а нам это ненадо
				if (dividers.indexOf(string[i]) != -1) {
					i--;
					break;
				}
				// если кавычки приклеены к слову (echo"hello)
				// в теоррии ошибка, такой синтаксис недопустим хотя
				// мы его пропустим но разрежем
				if (quoteFlags.indexOf(string[i]) != -1) {
					break;
				}
				if ((string[i] == " ") || (string[i] == "\t")) {
					break;
				}
				if (i == string.length - 1) {
					word += string[i];
					break;
				}
			}
			word += string[i];
		}
		callback({value: word, quoteFlag: quoteFlag}, i + 1);
	}

	static parseString(string) {
		var stringIndex = 0;
		var result = [];
		var firstWord = true;
		while (stringIndex < string.length) {
			Parser.getWord(string, stringIndex, function(word, nextCharIndex) {
				// смотри начало первого слова
				// если # - то это команда
				// ` - комментарий, возвращается undefined
				// иначе строка выводимого текста, строка возвращается неизмененной
				if (firstWord) {
					//делаем возможным задать первым символом строки ` или #
					//при помощи обратного слеша
					//правило действительно только для первого вхождения символа
					if (word.value[0] == "\\" && (word.value[1] == "#" || word.value[1] == "`")) {
						var s = "";
						var skipOnce = true;
						for (var i = 0; i < string.length; i++) {
							if (skipOnce) {
								if (string[i] == "\\") {
									skipOnce = false;
									continue;
								}
							}
							s += string[i];
						}
						result.push({value: ">"});
						result.push({value: s});
						stringIndex = string.length;
						return result;
					} else if (word.value[0] == "#") {
						firstWord = false;
					} else if (word.value[0] == "`")  {
						stringIndex = string.length;
						return undefined;
					} else {
						result.push({value: ">"});
						result.push({value: string});
						stringIndex = string.length;
						return result;
					}
				}

				if (!isNaN(word.value)) {
					word.value = Number(word.value);
				}

				result.push(word);
				stringIndex = nextCharIndex;
			})
		}
		return result.length != 0 ? result : undefined;
	}

	static parse(text) {
		var result = [];
		for (var i = 0; i < text.length; i++) {
			var p = Parser.parseString(text[i]);
			if (p != undefined) {
				result.push(p);
			}
		}
		return result;
	}

}
