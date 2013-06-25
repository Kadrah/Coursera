#!/usr/bin/env node

// A function to write out the values to the file
function writePrimesToFile(primeList)
{
   var fs = require('fs');
   var outfile = "primes.txt";
   var outString = "";

   // Loop through the array of primes building the output string
   for (var counter=0; counter<primeList.length; counter++)
   {
      // Add each element to the output string.  If this is not the 
      // first element, add a comma
      if (counter != 0)
      {
         outString = outString + ",";
      }

      outString = outString + primeList[counter];
   }

   // Write the string to the file
   fs.writeFileSync(outfile, outString);
}

// Calculate the next prime number based on the current list
// as to determin if a number is prime you have to ensure it
// cannot be divided by any prime number up to the square root
// of the number
function getNextPrimeNumber(currentPrimeList)
{
   // The next potential prime number is 1 more than the last number checked
   var lastNumberChecked = currentPrimeList[currentPrimeList.length - 1];
   var nextPotentialPrime;
   var noPrimeFound = new Boolean();
   var indexCounter = 0;

   numberIsNotPrime = true;

   // While we have not found a prime, keep incrementing by one until
   // one is found
   while (numberIsNotPrime)
   {
      // The next potential prime number is 1 more than the last one
      nextPotentialPrime = lastNumberChecked + 1;

      // Assume the new number is a prime until we find out otherwise
      numberIsNotPrime = false;

      // The maximum number we need to check if it is a divisor is
      // the square root of the number
      maxDivisorNumber = Math.floor(Math.sqrt(nextPotentialPrime));

      // While the next number in the current prime list is less than or equal
      // to the square root of the potential prime, check if the potential
      // prime divides by it.  If it does, the potential number is not
      // prime
      indexCounter = 0;

      while ((currentPrimeList[indexCounter] <= maxDivisorNumber) && 
             (!numberIsNotPrime))
      {
         // If the potential number divides by the current prime number,
         // the potential number is not prime
         if (isDivisor(nextPotentialPrime, currentPrimeList[indexCounter]))
         {
            numberIsNotPrime = true;         
         }        

         // Move on to the next number in the currentPrimeList
         indexCounter++;
      }

      // Increment the lastNumberChecked to be the number we were just
      // checking
      lastNumberChecked = nextPotentialPrime;
   }
   
   // The nextPotentilPrime is actually a prime.  Return it
   return nextPotentialPrime;
}


// This function detemines if the first number exactly divides by the 
// second.  If it does, then it can be used to rule out the first
// number as a prime number
function isDivisor(potentialNextPrime, currentPrime)
{
   // If the modulus of dividing the first number by the second is 0 then 
   // one divides by the other
   var modulus = potentialNextPrime % currentPrime;

   // If the modulus is 0 then it is a divisor, so return true,
   // otherwise return false
   if (modulus == 0)
   {
      return true;
   }
   else
   {
      return false;
   }
}

var primesToGet = 100;
var primeList = new Array();
var nextPrimeNumber = 0;

// First prime number is 2
primeList[0] = 2; 

// Keep calculating prime numbers, adding them to the array
// until the required number of primes have been found
while (primeList.length < primesToGet)
{
   // We need to find more prime numbers
   nextPrimeNumber = getNextPrimeNumber(primeList);

   // Add the new prime number to the list of current primes
   primeList[primeList.length] = nextPrimeNumber;
}

// Call the function to write the primes to the text file
writePrimesToFile(primeList);

