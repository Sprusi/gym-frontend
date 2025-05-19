export const formatAmountToLookGood = (
  s: string | number | undefined,
  numberOfDecimalPointsToPreserve: 0 | 2 = 2
): string | undefined => {
  let answer = undefined;
  if (s !== undefined && s !== '' && s !== 'undefined') {
    const isNegative = (typeof s === 'string' && s.startsWith('-')) || (typeof s === 'number' && s < 0);
    const absValue = isNegative ? s.toString().replace('-', '') : s.toString();
    answer = formatStrAmountAsYouType(absValue.toString(), numberOfDecimalPointsToPreserve);
    if (numberOfDecimalPointsToPreserve == 2) {
      const separatorIndex = answer.lastIndexOf('.');
      if (separatorIndex < 0) {
        answer += '.00';
      } else if (separatorIndex === answer.length - 1) {
        answer += '00';
      } else if (separatorIndex === answer.length - 2) {
        answer += '0';
      }
    }
    if (isNegative) {
      answer = parseFloat(answer) === 0 ? answer : '-' + answer;
    }
  }
  return answer;
};

export const formatStrAmountAsYouType = (number: string, decimalPointsToPreserve = 2): string => {
  let answer = number;

  if (answer) {
    answer = answer.replace(/[^\d.]/g, '');

    const separatorIndex = answer.lastIndexOf('.');

    let beforeSeparator = separatorIndex >= 0 ? answer.substring(0, separatorIndex) : answer;
    let afterSeparator = separatorIndex >= 0 ? answer.substring(separatorIndex + 1) : '';

    // adding spaces every 3 characters
    const numberParts: string[] = [];

    for (let i = beforeSeparator.length; i > 0; i -= 3) {
      const part = beforeSeparator.substring(Math.max(0, i - 3), i);
      if (part) {
        numberParts.push(part);
      }
    }
    beforeSeparator = numberParts.reverse().join(' ');

    if (decimalPointsToPreserve >= 0) {
      afterSeparator = afterSeparator.substring(0, decimalPointsToPreserve);
    }

    beforeSeparator = beforeSeparator.replace(/[.]/g, '');
    afterSeparator = afterSeparator.replace(/[.]/g, '');

    answer = beforeSeparator + (separatorIndex < 0 || decimalPointsToPreserve === 0 ? '' : '.' + afterSeparator);
  }

  return answer;
};
