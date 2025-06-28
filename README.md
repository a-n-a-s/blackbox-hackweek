# Blackbox Api Endpoints

### https://blackbox-interface.vercel.app/

#### NO TESt SCRIPST WERE USED , TESTING WAS DONE MANULLY WITH THE END POINTS

### /data
- Method : POST

- Body : String data

Example "bat"


ASCII: 'b'=98, 'a'=97, 't'=116

Binary: 01100010 01100001 01110100

Grouped as 6-bit: 011000 100110 000101 110100

Decimal: 24 38 5 52

Base64 chars: Y(24) m(38) F(5) 0(52) → "YmF0"

#### Response = "YmF0"


### /time
- Method : GET

- It is a countdown timer where the las two digits represents 100 counts as 1 real minute and with the counter number it is set to 56 days from now. 


#### Response = 8178970



### /fizzbuzz
- Method : POST

- Body : String data

- Always return false no matter the input

#### Response = False


### /zap
- Method : POST

- Body : String data

- returns the string wihtout the numbers from input
- EXample - anasdsdfsdf445@

#### Response = anasdsdfsdf@


### /alpha
- Method : POST

- Body : String data

- returns true if data starts with alphabets and false if data starts with number or speacial charecters

- Example 
    - "Anas" = true
    - "123Anas" = false
    - "!@#$" = false

### /glitch
- Method : POST

- Body : String data

- returns the string in any of its permutation
- Example - "Anas" = "sanA"



