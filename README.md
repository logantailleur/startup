# startup
This is the beginning of my startup application using Git and GitHub
This is the editing of my README.md from github
This is the second change on github
This should create a conflict

Git is a very powerful tool. But I think it requires extra focus on the part of the coder to keep up to date with it or they could be overwhelmed by the amount of options that the tool offers.

# Elevator Pitch
It's time to end the debate once and for all... In Utah, who has the best fried chicken? You've got the classics: KFC, Chick-fil-a, or McDonald's. The alternatives: Sonic, JCW's, Popeye's, or Zaxby's. Or there is the up-and-coming Raising Cane's. If all of the other chicken places had to go, which two would you want to stay? This polling application will allow users to vote on their two favorite restaurants to get fried chicken and allow them to see the votes in real-time. The ability to see the votes in real-time will also allow users new to Utah who have a hankering for fried chicken see the best options available.

![CS 260 - Startup](https://user-images.githubusercontent.com/122576833/214382266-2303e054-cf8c-4cc2-b98e-24ba30c677e1.jpg)

Key Features:

Secure login over HTTPS

Display of choices

Ability to select two choices

Ability to update choices

Display of current standings

Results are persistently stored

# Web Server access
IP address : 3.134.124.64

SSH command : ssh -i [key pair file] ubuntu@cs260ldt.click

# How to update Simon App

./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon

# UI Colors
Primary - #6c1305
Secondary - #ae8881
Tertiary - #a48f5b
Neutral - #998e8c

# MidTermNotes
let a = ['cow', 'rat', 'fish'];
<br>let b = a.filter(v => v.match(/A|f/i));
<br>console.log(b);
<br> -> ['rat', 'fish']

"< div >" - Creates a division element

The CSS property padding 
<br> p {
    <br>padding: 1em;
<br>}
<br> -> Puts space around the content of selected elements

To point to another DNS record, you should use the following DNS record type - CNAME - An alias for another record

You can use import url(....); to load fonts from google

Promises get put on the side burner to execute while everything else is happening

Valid JSON {"x":3} - undefined is not a valid JSON object

Using CSS how would you turn only the BYU text blue? - div.header {color:blue;} (div specifies the div element specifically)

Which of the following is not valid JavaScript in HTML - < javascript >1+1</ javascript >

What does the following code output - FILL ME IN

Which of the following is not a valid JavaScript function? - function f(x)={}

The CSS property padding; Peanut butter and mayonnaise, Pals before marriage

What is the order of the CSS box model, starting from the outside going in - margin, border, padding, content

What does the following code output - cow:rat:fish
<br> let a = ['cow', 'rat', 'fish'];
<br> let b = a.reduce((a,v) => [a,v].join(':'));
<br> console.log(b);

What is the HTML tag for an unordered list? - < ul > --- < li > - list item

What does the following code do - adds a mouseover event listener to a p element.
<br> document.querySelector('p').addEventListener('mouseover', console.log);

Which HTML will create a valid hyperlink? - < a href='...' > x < /a > 

What does the following code ouput? - ['a1', 'a2', 'a3'] - Javascript looks at a string + int leads to making a string
<br> let a = [1, 2, 3];
<br> e = a.map(number => {
    <br> return ('a' + number)
<br>});
<br> console.log(e);

Map function takes an array and maps the value of the array to another array according to the callback function you give it

What will the following output? - A D B - await blocks execution until the async happens
<br>const a = async function() {
    <br>return new Promise((resolve, reject) => {
        <br>setTimeout(() => {console.log('D'); resolve(true)}, 10000);
    <br>})
<br>}
<br>
<br>try {
    <br>console.log('A');
    <br>await a();
    <br>console.log('B');
<br>} catch(e) {
    <br>console.log('C');
<br>}

What does the DOM textContent property do? - Sets the child text for the element

Which of the following is a DNS subdomain? - c260.cs.byu.edu - Whole extended url is the subdomain

How will the hello world be oriented? - Two lines with the first saying world and the second saying hello

Executing the following will output - 4
<br> const f = y => ++y;
<br> console.log(f(3));

Which of the following is a valid JS object? - { n:1 } - DON'T USE EQUALS SIGNS - JS objects don't require quotes

The following console command makes a script executable - chmod +x deploy.sh - chmod +x changes it to make it executable

# Services
deployServices and deployFiles are different... Be sure to use the right one when deploying

# Database
If the environment variables need to change, remember to update them in the remote shell for the server.

# Login
Make sure to use pm2 restart all --update-env
pm2 save every now and then to make sure the data is being saved to my database when I update the website

# Websocket
This could be really useful for my startup. I sort of picture if working similarly to how it works in the simon app, but instead it will broadcast the votes that are placed.

# React
Make sure to run npm install create-react-app before deploying when I begin working on my startup for react

# Notes for Final
Cookies allow a server to store data on the client

Which is not a standard HTTP header: Language

You can use fetch in front-end and back-end : TRUE

What is not a purpose of jsx: To combine CSS, HTML, and JavaScript

Which express middleware will match this fetch request
![Screenshot 2023-04-20 at 10 18 28 AM](https://user-images.githubusercontent.com/122576833/233426979-735a055f-6fcc-41d6-a8c4-80bf7dc53e64.jpg)
app.delete(/fav\/(.*)/, () => {})

Which of the following is not true about linux daemon? Cannot fork other processes

Why is hashing stored passwords imporant? It improves security by making the password unreadable

![Screenshot 2023-04-20 at 10 27 43 AM](https://user-images.githubusercontent.com/122576833/233429252-e86be843-4a98-4939-a978-8201eb9abd99.jpg)
B

What value does Websocket add to HTTP? It is peer to peer instead of client to server.

![Screenshot 2023-04-20 at 10 30 36 AM](https://user-images.githubusercontent.com/122576833/233429985-ed9bedb0-ecf3-4d8f-ba4d-e732ea07b925.jpg)
tacofish

For the request [GET] /fav/george what is logged? 
![Screenshot 2023-04-20 at 10 43 32 AM](https://user-images.githubusercontent.com/122576833/233432944-b44ae8af-0753-44cd-800e-d9b444b7c219.jpg)
paul george john

Port 80 is reserved for HTTP

HTTPS 443, SSH 22

Given the following code what will console.log print?![Screenshot 2023-04-20 at 10 48 22 AM](https://user-images.githubusercontent.com/122576833/233434080-034304d0-4e4c-4131-9a32-32163a0b6cc4.jpg)
Client:Server:Hello

What document matches this mongoDB query? { $or: [{name:/J.*/}, {score: {$lt:3}}]} -> {name: Walke, score: -55}

HTTP status codes in the 300 range are for Content redirects or caching

What does the command NPM install ws not do? Adds template code for websockets to your JavaScript

