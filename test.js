// Question 1

function sortByString(s, t) {
  /* This method assumes that string t
  contains all the letters appeared in string s */

  // for storing each letter's frequency in the string s
  let freq = {};

  for (let i = 0; i < s.length; i++) {
    if (!freq[s[i]]) {
      freq[s[i]] = 1;
    } else {
      freq[s[i]]++;
    }
  }

  let result = '';

  for (let j = 0; j < t.length; j++) {
    if (freq[t[j]]) {
      result += t[j].repeat(freq[t[j]]);
    }
  }

  return result;
}

//====================================================================

// Question 2:

var decodeString = function(s) {
  let result = s;
  let indexes = needDecode(result);
  let repeat;

  // The str before the number
  // if s = 5[ab2[cd]], str = 'ab'
  let str = '';

  // Base case for resursion (no any brackets).
  if (indexes === false) {
    return s;
  }

  // Start is the index where the left bracket is.
  let start = indexes[0] - 1;
  let numStr = '';
  while (!isNaN(parseInt(s[start]))) {
    numStr += s[start];
    start--;
  }

  for (; start >= 0; start--) {
    str += s[start];
  }

  // Need to reverse both number string and letter string.
  repeat = parseInt(
    numStr
      .split('')
      .reverse()
      .join('')
  );

  str = str
    .split('')
    .reverse()
    .join('');

  return (
    str +
    decodeString(
      s.slice(indexes[0] + 1, indexes[1]).repeat(repeat) +
        s.slice(indexes[1] + 1)
    )
  );
};

function needDecode(s) {
  let brakets = [];
  let countBegin = false;
  let startCount = true;

  // The indexes of left bracket and right bracket.
  let start, end;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      brakets.push(s[i]);
      countBegin = true;
      if (startCount) {
        start = i;
        startCount = false;
      }
    }
    if (s[i] === ']') {
      brakets.pop();
    }

    if (!brakets.length && countBegin) {
      end = i;
      return [start, end];
    }
  }

  return false;
}

// ====================================================================

// Question 3:

function changePossibilities(amount, coins) {
  let combinations = new Array(amount + 1);
  combinations.fill(0);
  combinations[0] = 1;
  coins.forEach(coin => {
    for (let i = coin; i <= amount; i++) {
      combinations[i] += combinations[i - coin];
    }
  });

  return combinations[amount];
}
