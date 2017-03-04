#pragma strict

/*
Prototype: 5
Author: Fionn Mcguire
Date: 01/11/2016
*/
public static var speed : float = 0.2; //This would represent 30km/h however this must be tinkered with as it's still too fast.
//Checker exits the while loop in the travel function which finishes the function.
var checker : boolean = true;

//This function executes everything at startup immediately
function Start () {

//Creating routearray, random integer to be used to generate destination.
//This must also be passed into SPF to be used as a point of comparisson.
var RouteList = new Array ();
var randomIndex;
randomIndex = Random.Range(1,GlobalVariables.xList.length);
//Estabilishing where the vehicle is
var currentNode = transform.position; 
// Establishing a randomly generated destination
var destination = Vector3(GlobalVariables.xList[randomIndex],GlobalVariables.Ydepth,GlobalVariables.zList[randomIndex]); 
var avoidcheck = true;
RouteList = SPF(randomIndex,currentNode,destination,avoidcheck);
//Use the Travel function to move the vehicle through it's routelist
Travel(RouteList);

}
//Update will run once a frame, this will lag the entire project if you have anything in here that is not absoloutly nessisary.
function Update () {
}

function SPF(randomIndex : int,currentNode : Vector3,destination : Vector3, avoidcheck)
{
/*Get distance between starting point and ending point
Get shortest point distance
Compare shortest point dist with the dist of transform and ending point
if it's shorter, lock it into the route list and replace transform with 
latest point in the route and do the process again.
if there are no points closer to the dest than the current point then
the final point in the route is the destination*/

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
	var StepBackward : float;
	//List of nodes on the right and left of central park. This will be acted upon later.
	//If the vehicle is on the left and needs to go right, 
	//it is rerouted to an appropriote node which crosses central park
	var LeftCentralPark = new Array ();
	LeftCentralPark = [40,45,46,47,48,49,50,69,70
					,71,72,73,75,250,251,305,306
					,307,308,309,310,314,315,316
					,317,322,323,325,326,366,367
					,368,369,370,371];
	var RightCentralPark = new Array ();
	RightCentralPark = [76,77,78,88,89,102,103
						,104,105,111,112,114
						,115,311,372,375,376
						,387,388,389,394,395
						,422,423,424,436,437
						,495,496,498,501,504
						,505,506,507,508];
	//Checkers are constantly used to establish if a condition was successful or failed for code to interpret later on
	var checker : boolean;
	var checker1 = false;
	var checker2 = false;
	var checker3 = false;
	var checker4 = false;
	var checker5 = false;

	//Placeholder 1 and 2 are used to form a way in a routelist
	//     |--X-------------------X--|
	//Placeholder1 & 2 are the nodes on the Xs.
	var placeholder;
	var placeholder2;

	//i,j,k,l are used as counters for while and sub while loops
	var i = 0;
    var j = 0;
    var k =0;
    var l = 0;
    var m=0;

    //The l<20 ensures the simulation doesn't crash
	while(currentNode != destination && l < 10)
	{
		//Go through all xList and Ylist and find which node index corresponds to the currentNode
		while(i < GlobalVariables.xList.length)
		{
			if(currentNode == Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]))
			{
				CurrentNodeIndex = i;
			}
			i = i+1;
		}
		//Set these values very high to ensure the first value will always overwrite them
		shortestDist = 20.0;
		StepBackward = 20.0;
		i = 0;
		//Go through all nodes
		while(i < GlobalVariables.xList.length)
		{
				checker5 = false;
				//Distance from  node on list to current node
				dist = (Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]) - currentNode).magnitude;
				//Distance from destination node to current node
				DistanceToDestination = (destination - currentNode).magnitude;
				//Get the distance from the point in question to the destination
				DistanceToDestinationFromPoint = (destination - Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i])).magnitude;

				//Checking if it's in the collision array
			    /*m=GlobalVariables.CollisionArrayPosition;
				while(m<GlobalVariables.CollisionArray.length)
				{
					if(GlobalVariables.CollisionArray[m] == Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]))
					{
						checker5 = true;
						m = GlobalVariables.CollisionArray.length;
					}
					m=m+1;
				}*/

				////////////////////////////////////////////////////////////////////////
				//if (Distance from  point on list to current point) is the closer than the current node is
				//Or avoid check is set, this means we may need to go backwards
				// || avoidcheck == false
				if(DistanceToDestinationFromPoint < DistanceToDestination && checker5 == false)
				{
					//if this point is the closest to the destination
					if(dist < shortestDist)
					{
						//If this point is not our current point
						if(dist != 0.0)
						{
							////////////////////////////////////////////////////////////////////////
							//If this is a reroute
							/*if(avoidcheck == false)
							{
								//Start in the position of the array where Collisions are still active
								k = GlobalVariables.CollisionArrayPosition;
								//Move toward the end of the array
								while(k<GlobalVariables.CollisionArray.length)
								{
									if(GlobalVariables.CollisionArray[k] == Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]))
									{
										//This means the point will be ignored
										checker5 = true;
										k = GlobalVariables.CollisionArray.length;
									}
									k = k+1;
								}
								m=0;
								while(m<RouteList.length)
								{
								 if(Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]) == RouteList[m])
								 {
								 	checker5 = true;
									m = RouteList.length;
								 }
								 m=m+1;
								}

							}*/
							////////////////////////////////////////////////////////////////////////
							if(checker5 == false)
							{
								////////////////////////////////////////////////////////////////////////
								/*if(avoidcheck == false)
								{
									if(DistanceToDestinationFromPoint<StepBackward)
									{
										shortestDist = dist;												
										shortestPoint = Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]);
										DestinationNodeIndex = i;
										StepBackward =DistanceToDestinationFromPoint;
									}
								}
								////////////////////////////////////////////////////////////////////////
								else
								{*/
								shortestDist = dist;												
								shortestPoint = Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]);
								DestinationNodeIndex = i;
								//}
							}
						}
					}
				}
			i = i+1;
		}
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
	//Debug.Log(transform.name+" "+RouteList);
	return RouteList;
}
 function Travel (RouteList : Array)
 {
 	//Debug.Log(RouteList);
 	checker = true;
    var timeSinceStarted : float = 0f;
    var startingPosition = transform.position;
    var i =0;
    var j = GlobalVariables.CollisionArrayPosition;
    var getOut = false;
    var car : GameObject;
    var Cars : GameObject;
    var random_number = 0;
    var RerouteList = new Array ();
    //var destin = RouteList[placeholder];
	var randomIndex;
	randomIndex = Random.Range(1,GlobalVariables.xList.length);
	//Debug.Log(transform.name+" "+RouteList[i]);
	//var currentNode = transform.position;
	//var destination = Vector3(GlobalVariables.xList[randomIndex],GlobalVariables.Ydepth,GlobalVariables.zList[randomIndex]);
	//var RerouteList = new Array ();
	var PrerouteList = new Array ();
	var avoidcheck = false;
    while (checker === true && i<RouteList.length)
    {    	
    	////////////////////////////////////////////////////////////////////////
    	// && getOut == false && i != 0 && i != RouteList.length-1
    	/*while(j<GlobalVariables.CollisionArray.length)
    	{
    		if(RouteList[i] == GlobalVariables.CollisionArray[j])
    		{


    		if(i>0 && i<RouteList.length-1)
    		{
    			var placeholder = i;
    			var l = 0;
    			placeholder = placeholder-1;
    			var cNode = RouteList[placeholder];
    			placeholder = placeholder+2;
    			var destin = RouteList[placeholder];
    			RerouteList = Reroute(randomIndex,cNode,destin,avoidcheck);
    			Debug.Log(RerouteList);
    			placeholder = placeholder-2;
    			l=0;
    			while(l<placeholder)
				{
					PrerouteList.push(RouteList[l]);
					l=l+1;
				}
				l =0;
				while(l<RerouteList.length)
				{
					PrerouteList.push(RerouteList[l]);
					l=l+1;
				}

				l = i+1;
				while(l<RouteList.length)
				{
					PrerouteList.push(RouteList[l]);
					l=l+1;
				}
				RouteList = PrerouteList;
    		}*/
				/*var rerouteIndex;
				rerouteIndex =i;
    			Reroute(RouteList,rerouteIndex);*/




    			//Debug.Log("Hello");

    			//Rerouting the vehicles


    			/*var placeholder = i;
    			placeholder = placeholder-1;
    			//Debug.Log(placeholder);
    			var cNode = RouteList[placeholder];
    			placeholder = placeholder+2;
    			if(placeholder<=RouteList.length-1)
    			{
	    			var destin = RouteList[placeholder];
	    			var randomIndex;
					randomIndex = Random.Range(1,GlobalVariables.xList.length);
					Debug.Log(transform.name+" "+RouteList[i]);
					//var currentNode = transform.position;
					//var destination = Vector3(GlobalVariables.xList[randomIndex],GlobalVariables.Ydepth,GlobalVariables.zList[randomIndex]);
					var RerouteList = new Array ();
					var PrerouteList = new Array ();
					var avoidcheck = false;

					//Routlist to go between the last node and the node after the collision
					RerouteList = SPF(randomIndex,cNode,destin,avoidcheck);
					Debug.Log(transform.name+" "+RerouteList);

					//This gets the first half of the routlist up until the collision node
					var l = 0;
					var PrerouteLimit = i;
					if(i>0)
					{
						PrerouteLimit = PrerouteLimit-1;

						while(l<PrerouteLimit)
						{
							PrerouteList.push(RouteList[l]);
							l=l+1;
						}
					}

					l=0;
					//Adding the reroutlist to preroutlist
					while(l<RerouteList.length)
					{
						PrerouteList.push(RerouteList[l]);
						l=l+1;
					}

					//Adding the rest of the origional routelist to preroutelist
					l = i+1;
					while(l<RouteList.length)
					{
						PrerouteList.push(RouteList[l]);
						l=l+1;
					}
					//Making new routelist to be the old routelist as to work with the rest of the function.
					//This was all done because unity javascript has no javascript splice function

					RouteList = PrerouteList;
					//Debug.Log(transform.name+" "+RouteList);
	    			j = GlobalVariables.CollisionArray.length;
    			}
    			else
    			{
    				getOut = true;
    			}*/
    			/*
    		}
    		j=j+1;
    	}*/
    	////////////////////////////////////////////////////////////////////////
    	speed = 0.5;
        timeSinceStarted = timeSinceStarted + Time.deltaTime*speed;
        transform.position = Vector3.MoveTowards(startingPosition, RouteList[i], timeSinceStarted);
        transform.right = transform.position - startingPosition;
        transform.Rotate(90,0,0);
        if (transform.position ==  RouteList[RouteList.length-1])
        {
        	GlobalVariables.journeyCounter = GlobalVariables.journeyCounter+1;
            checker = false;
            //Debug.Log("Journey Complete "+transform.name);

            Cars = gameObject;
  			
  			random_number = Random.Range(1,GlobalVariables.xList.length-1);
  			car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
  			car.name = transform.name;
            Destroy (gameObject); 

        }

        else if(transform.position == RouteList[i])
        {
        	startingPosition = transform.position;
        	timeSinceStarted = 0f;
        	i = i+1;
        }
        yield WaitForSeconds (0.01);
    }
    if(RouteList.length == 0)
    {
    	    
            Cars = gameObject;
  			random_number = 0;
  			random_number = Random.Range(1,GlobalVariables.xList.length-1);
  			car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
  			car.name = transform.name;
            Destroy (gameObject); 
    }
 }

function Reroute(randomIndex : int,currentNode : Vector3,destination : Vector3, avoidcheck)
{
/*Get distance between starting point and ending point
Get shortest point distance
Compare shortest point dist with the dist of transform and ending point
if it's shorter, lock it into the route list and replace transform with 
latest point in the route and do the process again.
if there are no points closer to the dest than the current point then
the final point in the route is the destination*/

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
	var StepBackward : float;
	//List of nodes on the right and left of central park. This will be acted upon later.
	//If the vehicle is on the left and needs to go right, 
	//it is rerouted to an appropriote node which crosses central park
	var LeftCentralPark = new Array ();
	LeftCentralPark = [40,45,46,47,48,49,50,69,70
					,71,72,73,75,250,251,305,306
					,307,308,309,310,314,315,316
					,317,322,323,325,326,366,367
					,368,369,370,371];
	var RightCentralPark = new Array ();
	RightCentralPark = [76,77,78,88,89,102,103
						,104,105,111,112,114
						,115,311,372,375,376
						,387,388,389,394,395
						,422,423,424,436,437
						,495,496,498,501,504
						,505,506,507,508];
	//Checkers are constantly used to establish if a condition was successful or failed for code to interpret later on
	var checker : boolean;
	var checker1 = false;
	var checker2 = false;
	var checker3 = false;
	var checker4 = false;
	var checker5 = false;

	//Placeholder 1 and 2 are used to form a way in a routelist
	//     |--X-------------------X--|
	//Placeholder1 & 2 are the nodes on the Xs.
	var placeholder;
	var placeholder2;

	//i,j,k,l are used as counters for while and sub while loops
	var i = 0;
    var j = 0;
    var k =0;
    var l = 0;
    var m=0;

    //The l<20 ensures the simulation doesn't crash
	while(currentNode != destination && l < 10)
	{
		//Go through all xList and Ylist and find which node index corresponds to the currentNode
		while(i < GlobalVariables.xList.length)
		{
			if(currentNode == Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]))
			{
				CurrentNodeIndex = i;
			}
			i = i+1;
		}
		//Set these values very high to ensure the first value will always overwrite them
		shortestDist = 20.0;
		StepBackward = 20.0;
		i = 0;
		//Go through all nodes
		while(i < GlobalVariables.xList.length)
		{
				checker5 = false;
				//Distance from  node on list to current node
				dist = (Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]) - currentNode).magnitude;
				//Distance from destination node to current node
				DistanceToDestination = (destination - currentNode).magnitude;
				//Get the distance from the point in question to the destination
				DistanceToDestinationFromPoint = (destination - Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i])).magnitude;

				//Checking if it's in the collision array
			    m=GlobalVariables.CollisionArrayPosition;
				while(m<GlobalVariables.CollisionArray.length)
				{
					if(GlobalVariables.CollisionArray[m] == Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]))
					{
						checker5 = true;
						m = GlobalVariables.CollisionArray.length;
					}
					m=m+1;
				}

				////////////////////////////////////////////////////////////////////////
				//if (Distance from  point on list to current point) is the closer than the current node is
				//Or avoid check is set, this means we may need to go backwards
				// || avoidcheck == false
				if(checker5 == false)
				{
					//if this point is the closest to the destination
					if(DistanceToDestinationFromPoint < shortestDist)
					{
						//If this point is not our current point
						if(dist != 0.0)
						{
						/////////////////////////////////////////////////////////////////
							if(checker5 == false)
							{
								shortestDist = dist;												
								shortestPoint = Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]);
								DestinationNodeIndex = i;
							}
						}
					}
				}
			i = i+1;
		}
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
	return RouteList;
}