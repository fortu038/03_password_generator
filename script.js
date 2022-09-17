// Assignment Code
var generateBtn = document.querySelector("#generate");

var max_password_length = 0;

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Use this array instead of individual strings to help generate passwords (scales better!)
// The current char sets are:
// Index 0 -> Uppercase latin alphabetic chars
// Index 1 -> Lowercase latin alphabetic chars
// Index 2 -> Numeric chars
// Index 3 -> Special non-letter/non-numeric chars such as '!' and '@'
var chars = ["ABCDEFGHIJKLMNOPQRTSUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "1234567890", "!@#$%^&*()`~-=_+"];
var length_chars = chars.length;

// The use_char_set array will store whether or not a char set in the chars array should be used
var use_char_set = new Array(length_chars)
// Set each index of the array to false
for(var i = 0; i < length_chars; i++) {
  use_char_set[i] = false;
}

// The length_of_char_sets array will store the length of the char sets stored in chars in order to
// prevent excessive calls of '.length'
var length_of_char_sets = new Array(length_chars);
// Set each index of the array to the length of the strings in chars
for(var i = 0; i < length_chars; i++) {
  length_of_char_sets[i] = chars[i].length;
}

// Helper function that generates a random integer in the range min to max.
// Inclusive for both min and max
function gen_random_num(min, max) {
  var result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
}

// Helper function that finds out how many chars a password should have
function how_many_chars() {
  return parseInt(prompt("How many characters long will your password be? (If you type a number less than 8 or greater than 128 or a non-number it will default to 8)"));
}

// Helper function that finds out which char sets the user wants to use
// Not exactly the most scalable method, but we aren't worrying about other various char sets right now
  // ^ Possible fix to this could be making an array called somithing like 'char_set_confirm_statment'
  // and have a for loop go over the current setup with:
  // user_char_set[i] = confirm(char_set_confirm_statment[i]);
function check_char_set() {
  use_char_set[0] = confirm("Do you want uppercase letters in your password?");

  use_char_set[1] = confirm("Do you want lowercase letters in your password?");

  use_char_set[2] = confirm("Do you want numbers in your password?");

  use_char_set[3] = confirm("Do you want non-letter and non-numeric characters (ie: !, @, #, etc.) in your password?");
}

// This function generates a password of a specificed length using specifcied character sets. Makes use of
// the how_many_chars, check_char_set, and gen_random_num helper functions. Sets password length to 8 if a
// non-number value or a number less than 8 or greater than 128 is given.
function generatePassword() {
  max_password_length = how_many_chars();
  check_char_set();
  var password_holder = "";
  if(isNaN(max_password_length) || max_password_length <  8 || max_password_length > 128) {
    max_password_length = 8;
  }

  for(var i = 0; i < max_password_length; i++) {
    var index_char;
    var boolean_holder = false;

    while(boolean_holder === false) {
      index_char = gen_random_num(0, length_chars - 1);
      console.log("index_char in while-loop is " + index_char);
      boolean_holder = use_char_set[index_char];
    }

    var num_holder = gen_random_num(0, length_of_char_sets[index_char] - 1);
    password_holder = password_holder.concat(chars[index_char].charAt(num_holder));
    // A weird bug is occuring where the password can be one or two chars short of the desired length.
    // This probably has something to do with .concat receiving "" as input based on the console logs,
    // but where is it coming from? Is one of the chars being read as ""?
      // ^ Adding '- 1' after length_of_char_sets[index_char] fixed the bug; it was occuring due to
      // gen_random_num being inclusive for max rather than exclusive as intended.
  }

  return password_holder;
}
