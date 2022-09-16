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
// Index 3 -> Special non-letter / non-numeric chars such as '!' and '@'
var chars = ["ABCDEFGHIJKLMNOPQRTSUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "1234567890", "!@#$%^&*()`~-=_+"];
var length_chars = chars.length;

// The use_char_set array will store whether or not a char set in the chars array should be used
// var use_char_set = [];
var use_char_set = new Array(length_chars)
// Set each index of the array to false
for(var i = 0; i < length_chars; i++) {
  // use_char_set.push(false);
  use_char_set[i] = false;
}

// The length_of_char_sets array will store the length of the char sets stored in chars in order to
// prevent excessive calls of '.length'
var length_of_char_sets = new Array(length_chars);
// Set each index of the array to the length of the strings in chars
for(var i = 0; i < length_chars; i++) {
  length_of_char_sets[i] = chars[i].length;
}

// Helper function that generates a random integer in the range min to max
function gen_random_num(min, max) {
  var result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
}

// Helper function that finds out how chars they want a password to have
function how_many_chars() {
  // var answer = parseInt(prompt("How many characters long will your password be?"));
  // console.log(typeof answer);
  return parseInt(prompt("How many characters long will your password be?"));
}

// Helper function that finds out which char sets the user wants to use
// Not exactly the most scalable method, but we aren't worrying about other variouschar sets right now
  // ^ Possible fix to this could be making an array called somithing like 'char_set_confirm_statment'
  // and have a for loop go over the current setup with:
  // user_char_set[i] = confirm(char_set_confirm_statment[i]);
function check_char_set() {
  use_char_set[0] = confirm("Do you want uppercase letters in your password?");
  // console.log(use_char_set[0]);

  use_char_set[1] = confirm("Do you want lowercase letters in your password?");
  // console.log(use_char_set[1]);

  use_char_set[2] = confirm("Do you want numbers in your password?");
  // console.log(use_char_set[2]);

  use_char_set[3] = confirm("Do you want non-letter and non-numeric characters (ie: !, @, #, etc.) in your password?");
  // console.log(use_char_set[3]);
}

// Use gen_random_num to give a random index of char to check and an char to pull from a char_set
// Use while-loop to check if a the selected char index is valid to use, rerolling if a miss occurs
function generatePassword() {
  max_password_length = how_many_chars();
  // console.log("max_password_length currently is " + max_password_length);
  check_char_set();
  var password_holder = "";
  if(max_password_length > 0) {
    for(var i = 0; i < max_password_length; i++) {
      var index_char;
      var boolean_holder = false;

      while(boolean_holder === false) {
        index_char = gen_random_num(0, length_chars - 1);
        console.log("index_char in while-loop is " + index_char);
        boolean_holder = use_char_set[index_char];
      }

      var num_holder = gen_random_num(0, length_of_char_sets[index_char]);
      password_holder = password_holder.concat(chars[index_char].charAt(num_holder));
      console.log("password_holder currently is " + password_holder);
      // A weird bug is occuring where the password can be one or two chars short of the desired length.
      // This probably has something to do with .concat receiving "" as input based on the console logs,
      // but where is it coming from? Is one of the chars being read as ""?
    }
  }

  return password_holder;
  // return "final_password";
}
