# Note :

### Author Dwi Rifki Novianto Student Politeknik Negeri Jember

### How it works :

-   Put your sentences or paragraph
-   Your sentences or paragraph will split into an array
-   Do filtering the same word
-   Do levenshtein distance algorithm
-   Return the result of levenshtein distance algorithm

### How to change your sentence or paragraph into an array ?

`const regex = /(.,)/gi;`
`const res = data.data[5].test.replace(regex, "$1 ").split(" ");`
