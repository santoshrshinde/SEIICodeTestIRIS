# IRIS Code Test

## Introduction

Congratulations on making it to the code test! Firstly you will want to do a little setup to
get the project up and running. The code contains two folders - web and api. The web folder 
contains an Angular application where the code test will take place and the api contains a 
skeleton api with a single endpoint that returns subdivision data (See glossary). This test
should take around 1- 2 hours. Please read all the way through this document before starting. 

## Submitting
Please create a new branch for your specific test. Name the branch in the format:
iris-code-test-<yourname> so we can recognise your submittal. Once you have completed
the test make sure all your code is pushed to your branch. 

### Api Setup

To setup the api run the following:

Navigate to api folder: `cd iris-test-api`
Install packages: `npm install`
Run api: `npm run start`

Check the api is up and running by using:
`curl http://localhost:3000/v1/subdivisions`

### Angular app Setup

To setup the test script run the following:

At the root of the SEICodeTest folder run:
`npm install`

To run the script: `npm run start`

## Test

The test is broken down into three parts.

### Part 1 - Retrieving and Displaying the data

The first part of this test requires you to retrieve the subdivision data from the api and display it in 
the angular application. This can be displayed in any way you so choose and any third party libraries can
be chosen to aid in this. You can see the structure of the subdivision data in the api/src/subdivision.json
file. Note: the data set contains around 1000 subdivisions so you may need to think about how that is 
displayed (e.g pagination, infinite scrolling etc).

### Part 2
 Give the user the ability to filter the data based on subdivisionDataCode (This can be either Active, Future 
 or Builtout (See Glossary). Also, allow the user to sort the data based on subdivision name or nearMapImageDate.

### Part 3

Finally, write some unit tests for the code that has been written. If you start to run out of time at this point
then just attempt one test and write some comments about what other tests you would've written. Angular comes
with Jasmine packaged with it so it is preferred that you use this framework however if you are low on time and
are more comfortable with another testing framework (e.g Jest).

## Glossary

subdivision - An area of land containing lots or plots of land for property development <br />
subdivision status code - The status of the subdivision. Can either be: <br />
ACTIVE: This subdivision has ongoing construction <br />
FUTURE: This subdivision will have construction in the near future <br />
BUILT OUT: This subdivisions construction has been completed <br />
NearMap: NearMap is one of the providers used at Zonda satellite for our image data. <br />


run test cases => npm run ng test 
run test cases dode coverage => npm run ng test --code-coverage 