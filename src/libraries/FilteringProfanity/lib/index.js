/** Javascript Filtering Profanity Bahasa Indonesia (c) Dwi Rifki Novianto
 *  Github username : @dwirifki10
 *  Fuzzy String Matching Logic with Levenshtein Distance Algorithm
 */

/* Import (Profanity) data JSON */
const data = require("./dataset/data.json").words;
const exceptData = require("./dataset/skip.json").skip_words;
const getDataJSON = require("./config.js");

/* Filtering Fuzzy Method */
const fuzzyFilter = (sentence, params = false, inclusion, exclusion) => {
  /* check if the params and sentence doesn't exist */
  if (inclusion !== undefined) data.push(...inclusion);
  if (exclusion !== undefined) exceptData.push(...exclusion);
  if (typeof params === "string") return false;
  if (sentence === undefined) return false;

  /* regex for sanitizing the HTML tag */
  const regex = /(.,)/gi;

  /* attributes */
  let stc = sentence.replace(/(>)/gi, "$1 ").replace(/(<)/gi, " $1");
  let arr = stc
    .toLowerCase()
    .replace(regex, "$1 ")
    .replace(/[.,]/gi, "")
    .split(" ");
  let newArr = [...arr];
  let arrIndex = [];

  /* initial value */
  arr.forEach((value, index) => {
    if (data.includes(value)) arrIndex.push(index);
  });

  /* initial value */
  newArr = newArr.filter((value) => {
    if (!data.includes(value) && !exceptData.includes(value)) return value;
  });

  /* get result from levenshtein distance function */
  const { danger, warning } = levenshteinDistance(arr, newArr, data);
  arrIndex.push(...new Set(danger));
  if (params) arrIndex.push(...new Set(warning));

  /* redeclare value of stc */
  stc = stc.replace(regex, "$1 ").split(" ");

  /* replace profanity */
  for (let i = 0; i <= arrIndex.length - 1; i++) {
    const replacer = "*****";
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
      free_profanity_score: score,
      words_count: sentence.split(" ").length,
      found: arrIndex.length,
      warning: warning.length,
      index_array: arrIndex,
      index_arr_warning: warning,
      initial_sentence: sentence,
      new_sentence: stc.join(" "),
      merge: params,
    },
  };
};

/* Levenshtein Distance Algorithm */
const levenshteinDistance = (arr, newArr, data) => {
  /* attributes */
  let danger = [];
  let warning = [];

  /* do check the string one by one */
  for (let a = 0; a < newArr.length; a++) {
    for (let b = 0; b < data.length; b++) {
      /* skip the looping if the string is less than 3 and 2 character doesn't exist */
      let initial = newArr[a].startsWith(data[b].slice(0, 2)) === false;
      if (newArr[a].length <= 3 && initial) continue;

      /* get prefix and suffix value */
      let prefix = newArr[a].startsWith(data[b].slice(0, 1));
      let suffix = data[b].startsWith(newArr[a].substring(2, 3), 3) === false;
      if (newArr[a].length == 4 && data[b].length == 4 && prefix && suffix) {
        continue;
      }

      /* redeclare initial */
      initial = newArr[a].startsWith(data[b].slice(0, 3)) === false;
      if (initial && data[b].length == 3) continue;

      /* do levenshtein algorithm */
      const track = [];
      for (let i = 0; i <= data[b].length; i++) {
        track[i] = [i];
        for (let j = 1; j <= newArr[a].length; j++) {
          if (i === 0) {
            track[i][j] = j;
          } else {
            const indicator = newArr[a][j - 1] === data[b][i - 1] ? 0 : 1;
            track[i][j] = Math.min(
              track[i - 1][j] + 1, // Insertion
              track[i][j - 1] + 1, // Deletion
              track[i - 1][j - 1] + indicator // Substitution
            );
          }
        }
      }

      suffix = data[b].startsWith(
        newArr[a].substring(newArr[a].length - 2),
        data[b].length - 2
      );

      // console.log(newArr[a], data[b], track[data[b].length][newArr[a].length]);
      /* store index of array if the variable track is less than 1 */
      if (track[data[b].length][newArr[a].length] <= 1) {
        arr.forEach((value, index) => {
          if (newArr[a] == value) danger.push(index);
        });

        /* push index of warning word */
      } else if (newArr[a].length >= 5 && prefix) {
        if (track[data[b].length][newArr[a].length] == 2 && suffix) {
          arr.forEach((value, index) => {
            if (newArr[a] == value) warning.push(index);
          });
        }
      }
    }
  }
  return { danger, warning };
};

module.exports = {
  fuzzyFilter,
};
