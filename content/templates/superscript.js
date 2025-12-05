module.exports = async (tp) => {
  const superscriptMap = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };

  // Converts any number string like "35" to superscript
  const toSuperscript = (digits) => {
    return digits.split('').map(char => superscriptMap[char] || char).join('');
  };

  const content = tp.file.content;
  const updated = content.replace(/\^(\d+)/g, (_, num) => toSuperscript(num));

  await tp.file.overwrite(updated);
};
