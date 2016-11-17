#pragma strict

/*
Prototype: 1
Author: Fionn Mcguire
Date: 01/11/2016
*/

/*
List Of New York Nodes
X Values  -6.85,-6.2,-5.55,-4.9,-4.2,-3.55,-2.87,-2.15,-1.4,-0.75,-0.07,0.6,1.3,1.98,2.63,3.3,4,4.65,5.34,6
Y Values 2.35,0,2.63
*/

//These variables are for user input
//var moveLeft : KeyCode;
var moveRight : KeyCode;
//var moveUp : KeyCode;
//var moveDown : KeyCode;
//var game_setup: GameSetup;
//This controled the speed of the car when responding to user input which changed veolocity by this much
public var speed : float = 0.2; //This would represent 30km/h however this must be tinkered with as it's still too fast.
//Checker exits the while loop in the travel function which finishes the function.
var checker : boolean = true;
//Array of nodes i.e a route
var node_list= new Array();
var node_x_list= new Array();
var node_y_list= new Array();

//node_list = [8.5,-4.37,8.5,3.9,-7.9,3.9,-7.9,-4.37];

public var GameSetup : GameSetup;
node_x_list = [-6.85,-6.2,-5.55,-4.9,-4.2,-3.55,-2.87,-2.15,-1.4,-0.75,-0.07,0.6,1.3,1.98,2.63,3.3,4,4.65,5.34,6];
node_y_list = [2.35,0,-2.63];
//Debug.Log(node_x_list);
//Debug.Log(node_y_list);

var destx = 0;
destx = node_x_list[Random.Range(0,19)]; //the maximum is inclusive
var desty = 0;
desty = node_y_list[Random.Range(0,2)];
if(destx < 0)
{
	destx = destx*-1;
}
if(desty < 0)
{
	desty = desty*-1;
}
destx = (destx+24)%20;
//Debug.Log(transform.name);
//Debug.Log(transform.name)
//Debug.Log("Destx: "+node_x_list[destx]);
//Debug.Log("Desty: "+node_y_list[desty]);
//Debug.Log("Positionx: "+transform.position.x);
//Debug.Log("Positiony: "+transform.position.y);
var i = 0;
var array_postitionx = -50;
var array_destinationx = -50;
var array_postitiony = -50;
var array_destinationy = -50;
var x_or_y = 0;
x_or_y = Random.Range(1,4);
if(x_or_y < 0)
{
	x_or_y = x_or_y*-1;
}


/*function closest_var(arr : Array, closestTo : float){

//var closest = arr[0].Max();

    var closest = Mathf.Max(arr[0], arr[arr.length]); //Get the highest number in arr in case it match nothing.
    //var closest =  transform.position

    for(var i = 0; i < arr.length; i++){ //Loop the array
        if(arr[i] >= closestTo && arr[i] < closest) closest = arr[i]; //Check if it's higher than your number, but lower than your closest value
    }

    return closest; // return the value
}

var position_closest = 0;
position_closest = closest(node_x_list, transform.position.x);*/

function build_x_node_list(node_x_list : Array, destx : int, array_postitionx : int, array_destinationx : int)
{
	i = 0;
	while(array_postitionx == -50 || array_destinationx == -50)
	{
		//handles x dest & pos
		if(node_x_list[i] == transform.position.x)
		{
			array_postitionx = i;
		}
		if(node_x_list[i] == node_x_list[destx])
		{
			array_destinationx = i;
		}
		i = i+1;
		if(i > node_x_list.length || i < 0)
		{
			transform.position.x = node_x_list[3];
			array_postitionx = 3;	
		}

	}
	i = 0;
	while(array_destinationx != array_postitionx)
	{

	//Debug.Log(node_list);
		
		if(array_destinationx < array_postitionx)
		{
			node_list.push(node_x_list[array_postitionx],transform.position.y);
			array_postitionx = array_postitionx-1;
			//i = i+2;
		}
		else if(array_destinationx > array_postitionx)
		{
			node_list.push(node_x_list[array_postitionx],transform.position.y);
			array_postitionx = array_postitionx +1;
			//i = i+2;
		}
	}
	node_list.push(node_x_list[array_destinationx],transform.position.y);
}
//var position_closesty = closest_var(node_y_list, transform.position.y);
function build_y_node_list(node_y_list : Array, desty : int, array_postitiony : int, array_destinationy : int)
{
i = 0;
	while(array_postitiony == -50 || array_destinationy == -50)
	{
	//handles y dest & pos
		if(node_y_list[i] == transform.position.y)
		{
			array_postitiony = i;
		}
		if(node_y_list[i] == node_y_list[desty])
		{
			array_destinationy = i;
		}

		if(i > node_y_list.length || i < 0)
		{
			transform.position.y = node_y_list[1];
			array_postitiony = 1;	
		}
		i = i+1;
	}
	//Debug.Log(array_destination);
	//Debug.Log(array_postitionx);

	i = 0;
	while(array_destinationy != array_postitiony)
	{

	//Debug.Log(node_list);
		
		if(array_destinationy < array_postitiony)
		{
			node_list.push(transform.position.x,node_y_list[array_postitiony]);
			array_postitiony = array_postitiony-1;
			//i = i+2;
		}
		else if(array_destinationy > array_postitiony)
		{
			node_list.push(transform.position.x,node_y_list[array_postitiony]);
			array_postitiony = array_postitiony +1;
			//i = i+2;
		}
	}
	node_list.push(transform.position.x,node_y_list[array_destinationy]);
}

if(x_or_y > 2)
{
	build_x_node_list(node_x_list, destx, array_postitionx, array_destinationx);
	//Debug.Log("Finished 1");
	build_y_node_list(node_y_list, desty, array_postitiony, array_destinationy);
	//Debug.Log("Finished 2");

}
else
{
	build_y_node_list(node_y_list, desty, array_postitiony, array_destinationy);
	//Debug.Log("Finished 3");
	build_x_node_list(node_x_list, destx, array_postitionx, array_destinationx);
	//Debug.Log("Finished 4");
}

node_list.push(node_x_list[destx],node_y_list[desty]);
//Debug.Log("X_or_Y: "+ x_or_y);
//Debug.Log("NodeList: "+node_list);
//node_list = [-1.4,0,3,0,-1.4,0,3,0,-1.4,0,3,0,-1.4,0,3,0];
//Debug.Log(node_list);

//var node_y_list = GetComponent(game_setup).node_y_list;
//var node_x_list = GetComponent(GameSetup).node_x_list;
//var node_y_list = game_setup.node_y_list;
//var node_y_list = GameObject.Find("GUI_Main").GetComponent("ScriptName").thumbnailTextures[0]

//node_list.push
//Debug.Log(node_x_list);

//This function executes everything at startup immediately
function Start () {
//rb = GetComponent.<Rigidbody>();
Travel(node_list,node_x_list[destx],node_y_list[desty]);
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


    	//if (OnCollisionEnter(gameObject) == false)
    	//{
    	speed = 1.5;
	        timeSinceStarted = timeSinceStarted + Time.deltaTime*speed;
	        transform.position = Vector3.MoveTowards(startingPosition, Vector2(node_list[i],node_list[i+1]), timeSinceStarted);
	        transform.right = Vector2(node_list[i],node_list[i+1]) - transform.position;

	        if (transform.position ==  Vector2(destinationX,destinationY))
	        {
	        	 
	            checker = false;
	            Debug.Log("Journey Complete "+transform.name);
	            //GameSetup.CreateGameObjectFromPrefab(11);/*
	            var car : GameObject;
	            var Cars : GameObject;
	            Cars = GameObject.Find(transform.name);
	            var node_x_list = [-6.85,-6.2,-5.55,-4.9,-4.2,-3.55,-2.87,-2.15,-1.4,-0.75,-0.07,0.6,1.3,1.98,2.63,3.3,4,4.65,5.34,6];
 				var node_y_list = [2.35,0,-2.63];
 				//var destination_x = [];
 				//var destination_y = [];
 				//node_y_list[2] = node_y_list[2]*-1;
      			//var index = 1;
      			var random_number = 0;
	  			var random_number_array = new Array();
      			var checker = true;
      			random_number = Random.Range(0,19);
      			if(random_number < 0)
      			{
      				random_number = random_number*-1;
      			}
      			var random_numbery = 0;
      			random_numbery = Random.Range(0,3);
      			if(random_numbery < 0)
      			{
      				random_numbery = random_numbery*-1;
      			}
      			car = Instantiate(Cars, new Vector3(node_x_list[random_number] ,node_y_list[random_numbery], 0), Quaternion.identity) as GameObject;
      			car.name = transform.name;
	            Destroy (GameObject.Find(transform.name)); 

	        }

	        else if(transform.position == Vector2(node_list[i],node_list[i+1]))
	        {
	        	startingPosition = transform.position;
	        	timeSinceStarted = 0f;
	        	i = i+2;
	        }
	        yield WaitForSeconds (0.01);
        /*}
        else{
        	checker = false;
        }*/
    }
 }
 /*
 //if the car gameobject is collided with another the collidER (not the victim) will be destroyed
 function OnCollisionEnter2D( collider : Collision2D )
 {
     Destroy(collider.gameObject);
 }
 */
