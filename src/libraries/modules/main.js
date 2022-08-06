/** Javascript Filtering Profanity Bahasa Indonesia (c) Dwi Rifki Novianto
 *  Github username : @dwirifki10
 *  Fuzzy String Matching Logic with Levenshtein Distance Algorithm
 */

/* Import (Profanity) data JSON */
const data = require("./dataset/data.json").words;
const exceptData = require("./dataset/skip.json").words;
const getDataJSON = require("./config.js");

/* Filtering Fuzzy Method */
const fuzzyFilter = (sentence, merge = false, inclusion, exclusion) => {
  /* attributes */
  let arrIndex = [];
  let excIndex = [];
  const regex = /([.,!:;"'])/gi;

  /** check if the merge and sentence doesn't exist
   *  return false
   *  and add a new dataset
   */
  if (inclusion !== undefined) data.push(...inclusion);
  if (exclusion !== undefined) exceptData.push(...exclusion);
  if (["true", "false"].includes(merge)) return false;
  if (sentence === undefined) return false;

  /**  regex for sanitizing the HTML tag
   *   examples : <p>'She is damn. I hate her'</p>
   *   [ '<p>', 'she', 'is', 'damn', 'i', 'hate', 'her', '</p>' ]
   */
  let stc = sentence.replace(/(>)/gi, "$1 ").replace(/(<)/gi, " $1");
  let arr = stc
    .toLowerCase()
    .replace(regex, " ")
    .split(" ")
    .filter((item) => {
      if (item !== "") {
        return item;
      }
    });

  /* initial value */
  arr.forEach((item, index) => {
    if (data.includes(item)) arrIndex.push(index);
  });

  /* initial value */
  arr.forEach((item, index) => {
    if (exceptData.includes(item)) excIndex.push(index);
  });

  /* get result from levenshtein distance function */
  let { danger, warning } = levenshteinDistance(arr, data);
  warning = [
    ...new Set(
      warning.filter((index) => {
        if (!excIndex.includes(index)) {
          return index;
        }
      })
    ),
  ];
  arrIndex.push(...danger);
  if (merge) arrIndex.push(...warning);
  arrIndex = [...new Set(arrIndex)];

  /* redeclare value of sentence */
  stc = stc
    .replace(regex, "$1 ")
    .split(" ")
    .filter((item) => {
      if (item !== "") {
        return item;
      }
    });

  /* replace profanity */
  for (let i = 0; i <= arrIndex.length - 1; i++) {
    const replacer = "**********";
    stc[arrIndex[i]] = stc[arrIndex[i]].replace(
      stc[arrIndex[i]].slice(1),
      replacer.slice(0, stc[arrIndex[i]].length - 1)
    );
  }

  /* get score of profanity */
  const score =
    arrIndex.length !== 0
      ? Math.round(100 - (arrIndex.length / sentence.split(" ").length) * 100)
      : 100;

  getDataJSON(data, exceptData, inclusion, exclusion);

  /* return response */
  return {
    result: {
      merge: merge,
      free_profanity_score: score,
      words_count: sentence.split(" ").length,
      found: arrIndex.length,
      warning: warning.length,
      index_array: arrIndex,
      index_arr_warning: warning,
      initial_sentence: sentence,
      new_sentence: stc.join(" "),
    },
  };
};

/* Levenshtein Distance Algorithm */
const levenshteinDistance = (arr, data) => {
  /* attributes */
  const track = [];
  let danger = [];
  let warning = [];

  /* do a check on the string one by one */
  for (let a = 0; a < arr.length; a++) {
    for (let b = 0; b < data.length; b++) {
      for (let i = 0; i <= data[b].length; i++) {
        track[i] = [i];
        for (let j = 1; j <= arr[a].length; j++) {
          if (arr[a][j - 1] == arr[a][j]) {
            arr[a] = arr[a].replace(arr[a][j], "");
            j = 1;
          }
          if (i === 0) {
            track[i][j] = j;
          } else {
            const indicator = arr[a][j - 1] === data[b][i - 1] ? 0 : 1;
            track[i][j] = Math.min(
              track[i - 1][j] + 1, // Insertion
              track[i][j - 1] + 1, // Deletion
              track[i - 1][j - 1] + indicator // Substitution
            );
          }
        }
      }
      if (track[data[b].length][arr[a].length] == 0) {
        arr.forEach((item, index) => {
          if (arr[a] == item) danger.push(index);
        });
      }
      if (track[data[b].length][arr[a].length] == 1) {
        arr.forEach((item, index) => {
          if (arr[a] == item) warning.push(index);
        });
      }
    }
  }
  return { danger, warning };
};

module.exports = {
  fuzzyFilter,
};
