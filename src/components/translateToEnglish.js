export function translateToEnglish(text) {
  const conversionTable = {
    'ç': 'c',
    'ğ': 'g',
    'ı': 'i',
    'ö': 'o',
    'ş': 's',
    'ü': 'u',
    'Ç': 'C',
    'Ğ': 'G',
    'İ': 'I',
    'Ö': 'O',
    'Ş': 'S',
    'Ü': 'U'
  };

  let convertedText = '';

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);

    if (char in conversionTable) {
      convertedText += conversionTable[char];
    } else {
      convertedText += char;
    }
  }
  return convertedText;
}