## Fuzzy Filtering Profanity
is a RestFull APIs for filtering profanity by using <b>Levenshtein Distance </b> algorithm. Built with <b> Vanilla JavaScript </b> and combined using <b> Hapi Framework </b> for making APIs. it allows you to build a website for blocking the harsh words.

### How it works 
1. Put your sentences or paragraph.
2. Your sentences or paragraph will split into an array.
3. Do filtering on the same word.
4. Do filtering on the exception data.
5. Do <b>Levenshtein Distance</b> algorithm.
6. Return the result of <b>Levenshtein Distance</b> algorithm.

</br>

Payload       | Status                      | 
--------------|-----------------------------| 
merge         | `Boolean default (false)`   |
sentence      | `String required`           |
inclusion     | `Array not required`        |
exclusion     | `Array not required`        |

Method | Path                                                             | 
-------|------------------------------------------------------------------| 
POST   | https://project-app-forum.herokuapp.com/api/v1/filter?merge=true |

```json
{
    "status": "success",
    "data": {
        "result": {
            "merge": true,
            "free_profanity_score": 100,
            "words_count": 3,
            "found": 0,
            "warning": 0,
            "index_array": [],
            "index_arr_warning": [],
            "initial_sentence": "Levenshtein Distance Checker",
            "new_sentence": "Levenshtein Distance Checker"
        }
    }
}
```
                                                                                
### How to change your sentence or paragraph into an array ?
```
const regex = /([.,!:;"'])/gi;

const result = sentence.replace(regex, "$1 ").split(" ").filter((item) => { if (item !== "") { return item } });
```
