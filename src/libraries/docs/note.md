# Note :

### Author Dwi Rifki Novianto Student Politeknik Negeri Jember

### How it works :

-   Put your sentences or paragraph
-   Your sentences or paragraph will split into an array
-   Do filtering on the same word
-   Do filtering on the exception Data
-   Do levenshtein distance algorithm
-   Return the result of levenshtein distance algorithm

### How to change your sentence or paragraph into an array ?

`const regex = /([.,!:;"'])/gi;`
`const res = sentence.replace(regex, "$1 ").split(" ").filter((item) => { if (item !== "") { return item; } });`
