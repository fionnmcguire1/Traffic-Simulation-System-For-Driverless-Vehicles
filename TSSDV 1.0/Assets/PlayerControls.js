#pragma strict

/*
Prototype: 1
Author: Fionn Mcguire
Date: 01/11/2016
*/

//These variables are for user input
var moveLeft : KeyCode;
var moveRight : KeyCode;
var moveUp : KeyCode;
var moveDown : KeyCode;

//This controled the speed of the car when responding to user input which changed veolocity by this much
var speed : float = 3; //This would represent 30km/h however this must be tinkered with as it's still too fast.
//Checker exits the while loop in the travel function which finishes the function.
var checker : boolean = true;
//Array of nodes i.e a route
var node_list= new Array();
node_list = [8.5,-4.37,8.5,3.9,-7.9,3.9,-7.9,-4.37];

//This function executes everything at startup immediately
function Start () {
Travel(node_list,-7.9,-4.37);
}
//When the user inputs anything the code to make a change goes in here
function Update () {

//If i want to run the code again i just hight the right arrow key
 if (Input.GetKey(moveRight))
 {
  Travel(node_list,-7.9,-4.37);
 }
 else 
 {
 	//This ensures the sprite doesn't move when nothing happens
   GetComponent.<Rigidbody2D>().velocity.x = 0;
   GetComponent.<Rigidbody2D>().velocity.y = 0;
 }
}

/*The travel function is basically a route executer
The function accepts in an array of nodes, a destination x and a destination y
The node array should be made up of even indexs 0 2 4 6 8 etc which are X co-ordinates
and odd indexs 1 3 5 7 9 which make up the Y co-ordinates.
The function sets the checker to true, timeSinceStarted, StartingPosition to 0.
timeSinceStarted is used to measure how long it has been since the beginning of the travel between 2 nodes.
This is a fraction of a second (time it takes to complete a frame). I used the MoveForward function to travel from
point A (startingPosition) to point B (destination Node). The "steps" are calculated by multiplying the time by speed
of the vehicle. Every time the object moves closer, the while loop checks
if the object is at it's final destination, or if the object is at it's node destination. If it's at it's node destination then 
the i variabe is incremented to get the next set of co-ordinates to make the new destination node and go all over again. 
If the current position of the object is the destination x,y then checker is set to false and the loop exists as does the 
function. The yield at the bottom of the function is just to make it seem asthoug the car is constantly moving as opposed 
to jumping from one posiition to the next.
*/

 function Travel (node_list : Array, destinationX, destinationY) 
 {
	checker = true;
    var timeSinceStarted : float = 0f;
    var startingPosition = transform.position;
    var i =0;

    while (checker === true)
    {

        timeSinceStarted = timeSinceStarted + Time.deltaTime*speed;
        transform.position = Vector3.MoveTowards(startingPosition, Vector2(node_list[i],node_list[i+1]), timeSinceStarted);

        /*var angle = (Mathf.Sin(Time.time * speed) + 1.0) / 2.0 * 90.0;
        transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);

 		var neededRotation = Quaternion.LookRotation(Vector3.forward, transform.position - Vector2(node_list[i],node_list[i+1]));
        transform.rotation = Quaternion.Slerp(transform.rotation,neededRotation, timeSinceStarted);*/
        //transform.LookAt(Vector3(node_list[i],node_list[i+1],1));


        if (transform.position ==  Vector2(destinationX,destinationY))
        {
            checker = false;
        }
        else if(transform.position == Vector2(node_list[i],node_list[i+1])){
        startingPosition = transform.position;
        timeSinceStarted = 0f;

        i = i+2;
        }
        yield WaitForSeconds (0.01);
    }
 }

 /*    while (checker === true)
    {

        timeSinceStarted = timeSinceStarted + Time.deltaTime*0.5;
        transform.position = Vector3.Lerp(startingPosition, Vector2(node_list[i],node_list[i+1]), timeSinceStarted);

        if (transform.position ==  Vector2(destinationX,destinationY))
        {
            checker = false;
        }
        else if(transform.position == Vector2(node_list[i],node_list[i+1])){
        startingPosition = transform.position;
        timeSinceStarted = 0f;
        i = i+2;
        }
        yield WaitForSeconds (0.01);
    }*/