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
//var moveRight : KeyCode;
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

//public xList = GameSetup.xList;
//var GameSetup = GetComponent("GameSetup");
//Debug.Log(GlobalVariables.xList.length);


//public var GameSetup : GameSetup;
/*node_x_list = [-6.85,-6.2,-5.55,-4.9,-4.2,-3.55,-2.87,-2.15,-1.4,-0.75,-0.07,0.6,1.3,1.98,2.63,3.3,4,4.65,5.34,6];
node_y_list = [2.35,0,-2.63];
//Debug.Log(node_x_list);
//Debug.Log(node_y_list);
//transform.Rotate(90, 0, 0);
//transform.localRotation = Quaternion.identity;
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
//Debug.Log("X or Y"+x_or_y);
if(x_or_y < 0)
{
	x_or_y = x_or_y*-1;
}*/

//transform.eulerAngles = Vector3(90, 0, 0);
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
/*
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
		if(node_y_list[i] == transform.position.z)
		{
			array_postitiony = i;
		}
		if(node_y_list[i] == node_y_list[desty])
		{
			array_destinationy = i;
		}

		if(i > node_y_list.length || i < 0)
		{
			transform.position.z = node_y_list[1];
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
*/
//This function executes everything at startup immediately
function Start () {
//transform.Rotate(90,0,0,Space.World);
//rb = GetComponent.<Rigidbody>();
//Travel(node_list,node_x_list[destx],node_y_list[desty]);
var RouteList = new Array ();
RouteList = SPF();

Travel(RouteList);
}
//When the user inputs anything the code to make a change goes in here
function Update () {

//If i want to run the code again i just hight the right arrow key
/* if (Input.GetKey(moveRight))
 {
  Travel(node_list,-7.9,-4.37);
 }
 else 
 {
 	//This ensures the sprite doesn't move when nothing happens
   GetComponent.<Rigidbody2D>().velocity.x = 0;
   GetComponent.<Rigidbody2D>().velocity.y = 0;
 }*/
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




function SPF()
{
/*Get distance between starting point and ending point
Get shortest point distance
Compare shortest point dist with the dist of transform and ending point
if it's shorter, lock it into the route list and replace transform with 
latest point in the route and do the process again.
if there are no points closer to the dest than the current point then
the final point in the route is the destination*/
	var randomIndex;
	randomIndex = Random.Range(1,GlobalVariables.xList.length);
	var currentNode = transform.position;
	var destination = Vector3(GlobalVariables.xList[randomIndex],GlobalVariables.Ydepth,GlobalVariables.zList[randomIndex]);
	//Debug.Log("Destination "+destination);
	//Debug.Log("Location "+transform.position);
	var dist : float;
	var DistanceToDestination : float;
	DistanceToDestination = (destination - currentNode).magnitude;
	var DistanceToDestinationFromPoint : float;
	var shortestDist : float;
	var finalNode : float;
	var DestinationNodeIndex = 0;
	var CurrentNodeIndex = 0;
	shortestDist = 20.0;
	var shortestPoint : Vector3;
	var RouteList = new Array ();
	var LeftCentralPark = new Array ();
	LeftCentralPark = [40,45,46,47,48,49,50,69,70
					,71,72,73,75,250,251,305,306
					,307,308,309,310,314,315,316
					,317,322,323,325,326,366,367
					,368,369,370,371];
	//Debug.Log(LeftCentralPark);
	var RightCentralPark = new Array ();
	RightCentralPark = [76,77,78,88,89,102,103
						,104,105,111,112,114
						,115,311,372,375,376
						,387,388,389,394,395
						,422,423,424,436,437
						,495,496,498,501,504
						,505,506,507,508];
	//var RouteList = new Array ();
	var checker : boolean;
	var checker1 = false;
	var checker2 = false;
	var checker3 = false;
	var checker4 = false;
	var placeholder;
	var placeholder2;


	var i = 0;


    
    var j = 0;
    var l = 0;
	while(currentNode != destination && l < 12)
	{

	while(i < GlobalVariables.xList.length)
	{
		if(currentNode == Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]))
		{
			CurrentNodeIndex = i;
		}
		i = i+1;
	}
	 shortestDist = 20.0;
	 i = 0;
		while(i < GlobalVariables.xList.length)
		{
			
			//if(i != randomIndex)
			//{
				//Distance from  point on list to current point
				dist = (Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]) - currentNode).magnitude;
				//Distance from destination to current point
				DistanceToDestination = (destination - currentNode).magnitude;
				DistanceToDestinationFromPoint = (destination - Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i])).magnitude;
				//if (Distance from  point on list to current point) is the closest point

				if(DistanceToDestinationFromPoint < DistanceToDestination)
				{
					//if this point brings you closer to the destination
					if(dist < shortestDist)
					{
						if(dist != 0.0)
						{
							shortestDist = dist;
							DestinationNodeIndex = i;					
							shortestPoint = Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]);
							//shortestPoint = Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]);

						}

					}

				}
			//}
			i = i+1;
		}
		/*if(shortestDist == 20.0)
		{
			RouteList.push(destination);
			currentNode = destination;
		}
		else
		{*/
			checker1 = false;
			checker2 = false;
			checker3 = false;
			checker4 = false;
			i = 0;
			while(i<LeftCentralPark.length)
			{
				if(LeftCentralPark[i] == CurrentNodeIndex)
				{
					checker1 = true;
				}
				if(LeftCentralPark[i] == DestinationNodeIndex)
				{
					checker2 = true;
				}
				i = i+1;
			}
			i = 0;
			while(i<RightCentralPark.length)
			{
				if(RightCentralPark[i] == CurrentNodeIndex)
				{
					checker3 = true;
				}
				if(RightCentralPark[i] == DestinationNodeIndex)
				{
					checker4 = true;
				}
				i = i+1;
			}

			if(checker1 == true && checker4 == true)
			{
				//Debug.Log("Theres");
				if(CurrentNodeIndex < 306)
				{
					placeholder = 250;
					placeholder2 = 103;

				}
				else if(CurrentNodeIndex >= 306 && CurrentNodeIndex < 316)
				{
					placeholder = 308;
					placeholder2 = 114;
				} 
				else if(CurrentNodeIndex >= 316 && CurrentNodeIndex < 326)
				{
					placeholder = 325;
					placeholder2 = 424;
				} 
				else if(CurrentNodeIndex == 326 || CurrentNodeIndex > 326)
				{
					placeholder = 326;
					placeholder2 = 424;
				}
				shortestPoint = Vector3(GlobalVariables.xList[placeholder],GlobalVariables.Ydepth,GlobalVariables.zList[placeholder]);
				RouteList.push(shortestPoint);
				shortestPoint = Vector3(GlobalVariables.xList[placeholder2],GlobalVariables.Ydepth,GlobalVariables.zList[placeholder2]);
				RouteList.push(shortestPoint);
			}
			else if(checker2 == true && checker3 == true)
			{
				//Debug.Log("Hello");
				//Debug.Log("Theres");
				if(CurrentNodeIndex < 111)
				{
					placeholder = 103;
					placeholder2 = 250;

				}
				else if(CurrentNodeIndex >= 111 && CurrentNodeIndex < 115)
				{
					placeholder = 114;
					placeholder2 = 308;
				} 
				else if(CurrentNodeIndex >=115 && CurrentNodeIndex < 388)
				{
					placeholder = 115;
					placeholder2 = 308;
				} 
				else if(CurrentNodeIndex >= 388 && CurrentNodeIndex < 424)
				{
					placeholder = 423;
					placeholder2 = 326;
				}
				else if(CurrentNodeIndex == 424 || CurrentNodeIndex > 424)
				{
					placeholder = 424;
					placeholder2 = 326;
				}
				shortestPoint = Vector3(GlobalVariables.xList[placeholder],GlobalVariables.Ydepth,GlobalVariables.zList[placeholder]);
				RouteList.push(shortestPoint);
				shortestPoint = Vector3(GlobalVariables.xList[placeholder2],GlobalVariables.Ydepth,GlobalVariables.zList[placeholder2]);
				RouteList.push(shortestPoint);
			}
			else
			{
				RouteList.push(shortestPoint);
			}
			currentNode = shortestPoint;
		//}
		l = l+1;
	}
	//Debug.Log(RouteList);
	return RouteList;
}



	    

 function Travel (RouteList : Array)
 {
 	//Debug.Log(RouteList);
 	checker = true;
    var timeSinceStarted : float = 0f;
    var startingPosition = transform.position;
    var i =0;

    while (checker === true)
    {

    	speed = .2;
	        timeSinceStarted = timeSinceStarted + Time.deltaTime*speed;
	        transform.position = Vector3.MoveTowards(startingPosition, RouteList[i], timeSinceStarted);
	        transform.right = transform.position - startingPosition;
	        transform.Rotate(90,0,0);
	       // Debug.Log(transform.rotation);

	        if (transform.position ==  RouteList[RouteList.length-1])
	        {
	        	 
	            checker = false;
	            //Debug.Log("Journey Complete "+transform.name);
	            GlobalVariables.journeyCounter = GlobalVariables.journeyCounter+1;
	            //Debug.Log(GlobalVariables.journeyCounter);
	            //GameSetup.CreateGameObjectFromPrefab(11);/*
	            var car : GameObject;
	            var Cars : GameObject;
	            Cars = GameObject.Find(transform.name);
      			var random_number = 0;
	  			var random_number_array = new Array();
      			var checker = true;
      			random_number = Random.Range(1,GlobalVariables.xList.length);

      			car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.xList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
      			car.name = transform.name;
	            Destroy (GameObject.Find(transform.name)); 

	        }

	        else if(transform.position == RouteList[i])
	        {
	        	startingPosition = transform.position;
	        	timeSinceStarted = 0f;
	        	i = i+1;
	        }
	        yield WaitForSeconds (0.01);
    }


 }

