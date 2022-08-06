## Notes :

`Author Dwi Rifki Novianto, Student at State Polytechnic of Jember`

### How it works 
1. Put your sentences or paragraph.
2. Your sentences or paragraph will split into an array.
3. Do filtering on the same word.
4. Do filtering on the exception data.
5. Do <b>Levenshtein Distance</b> algorithm.
6. Return the result of <b>Levenshtein Distance</b> algorithm.

### How to change your sentence or paragraph into an array ?
```
const regex = /([.,!:;"'])/gi;

const result = sentence.replace(regex, "$1 ").split(" ").filter((item) => { if (item !== "") { return item } });
```
