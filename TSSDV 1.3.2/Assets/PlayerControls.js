#pragma strict

/*
Prototype: 8
Author: Fionn Mcguire
Student Number: C13316356
Project Development Start Date: 01/11/2016

The PlayerControls script is designed to handle the main behaviour of the drivers
This includes creation of the routelist(Route the vehicles take on their journey),
traveling through the routelist, collision detection/avoidance and rogue drivers 
behavior.
*/

/*
Speed instantiates the public speed variable to be used all over the script
checker exits the travel while loop, Start time gets the time of the gameObjects
birth and must be set of type Time before it is assigned and compared, RI is a 
random integer.
*/
public var PreviousRootPosition = Vector3(0,0,0);
public var speed : float = 0;
var checker : boolean = true;
public var startTime = Time.time;
public var RI; 
public var timeClear = 0;
public var PreviousOffset = GlobalVariables.Offset;
/* 
These variables are part of the BreakTheRules functionality of the project. They 
accept a random number which decides whether or not a driver will run a red light,
break the speed limit or engage in a head on collision.
*/
public var BoyRacer = false;
public var HeadOnCollision = 0;
public var Speeder = 0;
public var BreakRed = 0;

//public var checkPanningPosition = GameObject.Find("PanningReset").transform.position;
//public var RouteList = new Array ();
public var RouteList : Vector3[];

//The start function executes everything inside when the gameObject is activated.
function Start () 
{
	//Getting time of gameObjects creation
	startTime = Time.time;
	/*
	The routelist is a list of Vector3 nodes containing exact points within the 3D
	world of where the vehicles need to travel to. The translates to a series of
	directions the vehicle must follow. They are in the form Vector3(x,y,z).
	In this project the Y axis marks depth rather than length.

	The following code calls functions to build the routelist and travel through it
	as well as destroying the initial gameObject known as Dcar. Dcar represents the
	driver. This object must be destroyed as it does not conform to the naming 
	conventions of this project.
	*/
	//var RouteList = new Array ();
	RouteList = CreateRouteList ();
	Travel(RouteList);
	if(transform.name == "DCar")
	{
		Destroy(gameObject);
	}
}

/*
Update will run once a frame, this will lag the entire project if any code that is
not absoloutly nessisary is in the Update(). The vehicles are instantiated with the 
vehicleCollision script deactivated. This stops the vehicles getting into an invalid
collision due to one vehicle instantiating on another vehicle. After 2 seconds the
vehicleCollision script is activated.
*/
function Update () 
{
	if(Time.time > startTime && GetComponent(VehicleCollision).enabled == false){
		
		GetComponent(VehicleCollision).enabled = true;
	}

	/*if(checkPanningPosition != GameObject.Find("PanningReset").transform.position)
	{
		var i =0;
		//This line is broken, it thinks it's an object no matter what.
		var Offset : Vector3 = GameObject.Find("PanningReset").transform.position;
		while(i<RouteList.length)
		{
			//This is the line that can't deal.
			RouteList[i] = Vector3(Offset.x,Offset.y,Offset.z) + RouteList[i];
		}
		transform.position = transform.position+ GameObject.Find("PanningReset").transform.position;
		checkPanningPosition = GameObject.Find("PanningReset").transform.position;
	}*/
	//2nd attempt at this, Bring it to Mike/Liam maybe they know something i don't
	/*if(PreviousOffset != GlobalVariables.Offset)
	{
		var GO : GameObject;
		GO = GameObject.Find("PanningReset");
		transform.position = transform.position + GO.transform.position;
		var j = 0;
		 var x : float = GlobalVariables.Offset.x;
		 var y : float = 0.0f;
		 var z : float = GlobalVariables.Offset.z;
		while(j<RouteList.length)
		{
			RouteList[j] = RouteList[j]+Vector3(x,y,z);
			j=j+1;
		}

	}*/
	 var OffsetFile = System.IO.File.ReadAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/PositionOffset.csv");
	 var separator : char[] = [","[0]];
	 var interMediateOffset = new Array ();
	 interMediateOffset = OffsetFile.Split(separator);
	 var holding : Vector3 = Vector3(float.Parse(interMediateOffset[0]), float.Parse(interMediateOffset[1]), float.Parse(interMediateOffset[2]));
	 var GO : GameObject;
	 GO = GameObject.Find("PanningReset");
	 GO.transform.position = (holding - PreviousRootPosition);
	 if(PreviousRootPosition != holding)
	 {
	 	transform.position = transform.position + GO.transform.position;
	 	var i = 0;
	 	while (i < RouteList.Length)
	 	{
	 		RouteList[i] = RouteList[i] + (holding - PreviousRootPosition); 
	 		i = i+1;
	 	}

	 	/*
		 GlobalVariables.Offset = holding-GlobalVariables.Offset;
		 var GO : GameObject;
		 GO = GameObject.Find("PanningReset");
		 GO.transform.position = GlobalVariables.Offset;
		 var x : float = GlobalVariables.Offset.x;
		 var y : float = 0.0f;
		 var z : float = GlobalVariables.Offset.z;
		 PreviousRootPosition = holding;
		 var other : PlayerControls;
		 var j = 0;
		 var AllObjects : GameObject [] = GameObject.FindGameObjectsWithTag("Car");
		 Debug.Log("Before "+AllObjects[4].transform.position);
		 Debug.Log("Holding: "+holding);
		 var i = 0;
		 while(i < AllObjects.Length)
		 {
			AllObjects[i].transform.position.x = AllObjects[i].transform.localPosition.x + GO.transform.localPosition.x;
			AllObjects[i].transform.position.z = AllObjects[i].transform.localPosition.z + GO.transform.localPosition.z;
		 	other = AllObjects[i].GetComponent("PlayerControls");
		 	while(j < other.RouteList.length)
		 	{
		 		other.RouteList[j] =  Vector3(x,y,z) + other.RouteList[j];
		 		j = j+1;
		 	}
		 	j = 0;
		 	i=i+1;
		  }
		  Debug.Log("After "+AllObjects[4].transform.position);*/
	 }


}

public function CreateRouteList ()
{
	/*
	Creating the Routelist by taking a line from a precompiled unity route list
	array. At the time of development I found no equvilant of split string in 
	unity as the docs were so poor I was forced to write my own algorithm to
	split the string, char by char. This function also double checks if the node
	is part of the bad route signature, restarting the entire process with a new route.

	Routestring is the line from the route array, RouteList is the actual split
	string into a comprehensive route. Coord is the coordinate still being built,
	k%2 figures out if the coord is x or z. X,Z are converted into floats for
	the routeList, ReversedX is x*-1 as the initial deployment revealed the 
	vehicles were performing a mirrored routeList on the wrong side of Manhatten
	Occupied assessed whether or not the vehicle will instantiate on another vehicle.
	*/
	var RouteList = new Array ();
	var RouteString : String;
	var j=0;
	var co_ord = "";
	var k =0;
	var x : String;
	var z : String;
	var reversedX : float;
	var occupied = true;

	//Obtain random route
	RI = Random.Range(1,GlobalVariables.PCrouteList.length);
	RouteString = GlobalVariables.PCrouteList[RI];

	//Break down outelist here, make the routelist into array of Vector3
	j=0;
	co_ord = "";
	k =0;
	x="";
	z="";
	reversedX=0.0f;
	//Go through each char in the routelist
	while(j < RouteString.Length)
    {
    	//The string is comma separated in the form x,z,x,z,x,z,x,z,x,z,x,z\n
		if(RouteString[j] == "," && co_ord != "")
		{
			//Check if the coord is x or z
			if(k%2 == 0)
			{
    			z = co_ord;
	        	co_ord = "";
	        	k = k+1;
        	}
        	else
        	{
   				/*
   				X needs to be both reversed and supplemented a small value so all 
   				the vehicles line up on the roads. This part also checks if the 
   				Recently built node is in the bad route zone. If it is, start the 
   				process again.
   				*/
        		x = co_ord;
    			reversedX = float.Parse(x);
    			reversedX = reversedX +0.0764372;
    			RouteList.push(Vector3(reversedX,GlobalVariables.Ydepth,float.Parse(z)));
    			if(Vector3.Distance(Vector3(reversedX,GlobalVariables.Ydepth,float.Parse(z)), Vector3(0.081,0.2,-0.58)) < 0.1495 ||
    			 Vector3.Distance(Vector3(reversedX,GlobalVariables.Ydepth,float.Parse(z)), Vector3(-1.7538,0.2,-0.1397)) <0.3079 ||
    			 Vector3.Distance(Vector3(reversedX,GlobalVariables.Ydepth,float.Parse(z)), Vector3(0.143,0.2,-0.072)) < 0.1144 )
    			{
    				RI = Random.Range(1,GlobalVariables.PCrouteList.length);
					RouteString = GlobalVariables.PCrouteList[RI];
					j = -1;
					RouteList.Clear();
					k = -1;
    			}
	        	co_ord = "";
	        	k = k+1;
        	}

		}
		else
		{
    		co_ord = co_ord+RouteString[j];
    	}	        
        j = j+1;
    }
    /*
    The python program was only able to obtain 40% of the routes, about 92,000
    Bad routes make up approx 25,000
    Reversing the routelist doubles the number of remaining possible 134,000
    */
	var FlipaCoin : float;
	FlipaCoin = Random.Range(1,2);
	if(FlipaCoin>1.5)
	{
		RouteList = RouteList.Reverse();
	}
	//Check if the position about to be instantiated on is occupied, if not initiate
	//At the midpoint between the first and second item of the routelist.
	while(occupied == true)
	{
		for(var gameObj : GameObject in GameObject.FindObjectsOfType(GameObject))
		{
 			if(gameObj.transform.position == RouteList[0])
 			{
 				occupied = true;
 			}
 			else
 			{ 				
				transform.position = Vector3.Lerp(RouteList[0],RouteList[1],0.5);
				occupied = false;
			}
 		}
	}//Routelist returned for use in the travel function
	return RouteList;
}


public function Travel (RouteList : Array)
 {
 	var checker = true;
    var timeSinceStarted : float = 0f;
    var startingPosition = transform.position;
    var i =1;
    var car : GameObject;
    var Cars : GameObject;
    var random_number = 0;
	var randomIndex;
	randomIndex = Random.Range(1,GlobalVariables.xList.length);
	var AngleDifference : float;
	var PathIsNowClear = true;


	speed = 0.004064543942; //Same as 25mph
	//var simulationSpeed = 64; //Speed of simulation 1 realtime minute = 64 simulated minutes
	speed = speed*GlobalVariables.simulationSpeed;

	/*
	The following segment of code is used to generate the stopping distance and to set different
	values to the driver. Awareness = 60 simulated meters, a driverless vehicle can sense up to
	0.0703427998788 which is the unity equivilant of 100 meters. Stopping distance contains think
	time up to of 2 seconds. 0.75 for perception, 1.25 for movement of foot to brake pedal. The
	project is engineered to allow for collisions to occur if they're above 1.5 second think 
	time. Driverless can brake faster (twice as fast), given they do not disobey the speed limit.
	The stopping distance can be hardcoded.
	*/
	var rb: Rigidbody;
	rb = GetComponent.<Rigidbody>();
	var bc: BoxCollider;
	bc = GetComponent.<BoxCollider>();
	//0.0008 is the scale. The box collider's size is relative to it's initial size, gets smaller when scale down
	var boxColX = bc.size.x*0.0008; 
	var boxColY = bc.size.y*0.0008;

	//Debug.Log("Actual Size x: "+(bc.size.x*0.0008));
	var Awareness : float = 0.0403427998788;
	var thinktime : float = 0f;
	var reduction : float= 0f;
	var dist : float;
	var theirDist : float;
	var relativePoint : Vector3;
	var myDist : float;
	var other : PlayerControls;
	var MultiplierToCreateFPS = 261051.1690876167;
	var UnityFtMeasurement = 0.000137903998384;
	//Drivers have been set to have a mass of 0.1001 driverless have a mass of 0.1, other than the sprite
	//This is the only physical distinguishable factor.
	var StoppingDistance : float = 11;


	if(rb.mass == 0.1001)//0.1001
	{
		//Given perception time and time to move foot to brake pedal, for a human driver the accumulated 
		//think time is from 0.5 to 2 seconds
		thinktime = Random.Range(0.5f,2f);

		//Break the rules functionality
		HeadOnCollision = Random.Range(1,100);
		Speeder = Random.Range(1,50);
		BreakRed = Random.Range(1,150);
		if(Speeder > 49)
		{
			speed = speed*1.5;
			//speed = speed/1.5;
			MultiplierToCreateFPS = MultiplierToCreateFPS*1.5;
		}
		//Calculating the stopping distance after the speeder has been checked. 
		StoppingDistance = 21+(thinktime*MultiplierToCreateFPS*UnityFtMeasurement);
		//
		//BoyRacer is used to disobey traffic signals
		if(BreakRed > 149)
		{
			BoyRacer = true;
		}
	}
	//This variable is for after a gameobject has braked to return to this speed
	var ReturnToSpeed = speed;
	//Converting to 1ft in unity measurments
	StoppingDistance = StoppingDistance*UnityFtMeasurement;
	var currentProcess :float = Time.time;
	//Debug.Log("Stopping Distance: "+StoppingDistance);
    while (checker === true && i<RouteList.length)
    {
    	if(i == 1 )
    	{
			/* 
			Wanted to put this after the collision detection code to ensure
			the collision detection is the primary concern 
			*/
			var a = 0;
			var clostestTrafficLightDist : float = 20f;
			var clostestTrafficLight : Vector3;
			while(a<GlobalVariables.xList.length)
			{
				if(Vector3.Distance(RouteList[1], Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a])) < clostestTrafficLightDist && Vector3.Distance(RouteList[1], Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a])) < StoppingDistance)
				{
					//if(Vector3.Distance(transform.position, RouteList[0]) > Vector3.Distance(RouteList[0], Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[i])))
					//{
						clostestTrafficLightDist = Vector3.Distance(transform.position, Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a]));
						clostestTrafficLight = Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a]);
					//}
				}
				a = a+1;
			}
    	}    	
    	//If within radius
    	var checkPosition = true;						
 		if(Vector3.Distance(transform.position, Vector3(0.2371,0.2,-0.2914)) < 0.24133309611 ||
 		 Vector3.Distance(transform.position, Vector3(0.39435,0.2,-0.00295)) < 0.30133309611|| 
 		 Vector3.Distance(transform.position, Vector3(0.6812,0.2,-0.56845)) < 0.34133309611)
 		{
 			checkPosition = false;
 		}
 		PathIsNowClear = true;
 		if(checkPosition == true)
 		{

	    	/*
	    	Driverless car has a sensor that goes up to 100m for noticing obstacles and vehicles changing lanes
	    	Driverless vehicle can stop at 30fps. These vehicles travel at 36.6 fps therfore they only need two
	    	seconds notice and thus only a 60ft sphere will be put in place. Overlap sphere was the only overlap
	    	relevant with appropriote documentation. Any gameObject within the sphere gets "noticed" by the
	    	vehicle thus triggering the collision detection/avoidance and rightOfWay.
	    	*/
	    	var hitColliders = Physics.OverlapSphere(transform.position, Awareness);
	    	for (var m = 0; m < hitColliders.Length; m++) 
	    	{
	    		/*
	    		Go through each gameObject that entered the sphere and check if it's a car and not part of the map
	    		Then access the PlayerControls component of the other gameObjects to access the public variables
	    		in each script. Compare the angles of the gameObjects to check what kind of collision it was. Subtract
	    		the angles, then make the result positive, if the difference was close to 0 then the vehicles are rear 
	    		ending. If the difference is closer to 90 degrees it's a ver serious side on collision in which case
	    		right of way must be given to the vehicle on the right hand side of the vehicle i.e the car with the
	    		greater x value. And if the difference is closer to 180, the vehicle is driving toward you in which 
	    		case do nothing. The 2% of collisions that are head on will be handled in the VehicleCollision. Given
	    		that we're trying to force this 2% to occur as it is a statistical outlyer, there is no point in putting
	    		in collision detection/avoidance.
	    		*/
	    		var GO = hitColliders[m];
	    		other = GO.GetComponent("PlayerControls");
	    		dist = Vector3.Distance(transform.position,GO.transform.position);	
	    		if(GO.name.length < 7)
	    		{
					AngleDifference = transform.eulerAngles.y - GO.transform.eulerAngles.y;
					if(AngleDifference < 0)
					{
						//Make the angular distance positive
						AngleDifference = AngleDifference*-1;
					}
					//if(transform.eulerAngles.y !=0 && GO.transform.eulerAngles.y !=0)
					//{
						if(AngleDifference < 36 || AngleDifference > 324)
						{
						 	//Fender Bender
						 	if(Vector3.Distance(transform.position, RouteList[i]) > Vector3.Distance(GO.transform.position,RouteList[i]))
						 	{
								PathIsNowClear = false;
								m=hitColliders.Length;
								//&& dist < (0.013527998788+StoppingDistance)
								//if(dist > 0.000053 && dist < 0.000253)

								//Play around with this distance to fix the stacking.
								//@@I think this is the if that makes the queuing work!!!
								//if(dist > (StoppingDistance+0.000002) && dist <(StoppingDistance+0.000012) )
								if(dist > (StoppingDistance+boxColX+0.000002) && dist <(StoppingDistance+boxColX+0.000012) )
								//if(dist > (StoppingDistance+boxColX+0.000002))
								{
									//Debug.Log(dist);
									//Debug.Log(rb.mass);
									/*if(speed != 0 )
									{
										speed = speed-(ReturnToSpeed*0.25);
									}*/
									//transform.position = Vector3.MoveTowards(transform.position, GO.transform.position, Time.deltaTime);
									speed = 0;
								}

							}
						}
						else if(AngleDifference < 200 && AngleDifference > 162)
						{
							//Driving towards you, do nothing.
						}
						else
						{
							if(transform.position.x < GO.transform.position.x)
							{
								/*
								This code avoids the scenario when a vehicle is given right of way and as it travels
								past, it's center is now no longer on the right and it therfore stops to give the other
								vehicle right of way. However this is the only case where YOU are closer to your
								destination than the other vehicle. When that happens, keep going. 
								Side Note: The 0.000253 is the vehicles box collider
								*/
								myDist = Vector3.Distance(transform.position, RouteList[i]);
								theirDist = Vector3.Distance(GO.transform.position, RouteList[i]);
								if(myDist > theirDist)
								{		//			 && dist < (0.0135427998788+StoppingDistance)											
									//if(dist > (0.000253+StoppingDistance))
									//if(dist > (boxColX+0.0000003) && dist < (boxColX+0.0090003))
									if(dist > 0.000253+StoppingDistance)
									{
										PathIsNowClear = false;	
										m=hitColliders.Length;
										speed = 0;
									}
								}

							}
						}
					//}
				}
			}

		}
		//If there is no reason to stop anymore, return to the regular speed
		/*if(PathIsNowClear == true && speed < ReturnToSpeed)
		{
			speed = ReturnToSpeed;
		}*/
		//If there is no reason to stop anymore, return to the regular speed
		if(PathIsNowClear == true && speed < ReturnToSpeed)
		{
			/*
			Drivers need a 2 second pause before they realise they can start driving again
			if timeClear is 0 then set it to time, it won't be overwritten until this code is 
			fulfilled. If the time difference since the driver can drive again is 2 seconds
			Speed = ReturnToSpeed which was the natural speed set earlier, and reset the timeClear
			If you're a driverless, there is no delay
			*/
			if(rb.mass == 0.1001)
			{
				if(timeClear == 0)
				{
					timeClear = Time.time;
				}
				if((Time.time - timeClear) > (2.00/GlobalVariables.simulationSpeed))
				{
					speed = speed+ReturnToSpeed*(Time.deltaTime/(2/GlobalVariables.simulationSpeed));
					//speed = ReturnToSpeed;
					if(speed >= ReturnToSpeed)
					{
						timeClear = 0;
						speed = ReturnToSpeed;
					}
				}
			}
			else
			{
				speed = ReturnToSpeed;
			}
		}

		/*
		The following segment of code is the behavior implementation of the traffic light system. Based on the vehicles angle 
		the vehicle will be requested to stop for a period of time controlled by the GameSetup. The vehicle will wait until it
		gets close to the nearest traffic light to stop as this will ensure vehicles don't just top in the middle of the road
		or the middle of an intersection. The traffic light system acts on red,yellow,green. For simplicity yellow is just a
		pause between red and green. The red and green operate as through they were true or false, as in true for all vehicles
		moving on a east to west or vice versa road and false for all vehicles moving on a north to south road and vice versa. 
		If boyRacer is true the traffic light system is ignored entirely.
		*/

		//Origional distances >SD+0.000253 && < SD+0.005053
		if(checkPosition == true && PathIsNowClear == true )
		{
			if(GlobalVariables.TrafficLightState == "Red" && BoyRacer == false )
			{
				if((transform.eulerAngles.y > 20 && transform.eulerAngles.y < 40) || (transform.eulerAngles.y > 200 && transform.eulerAngles.y < 220))
				{
					if(Vector3.Distance(transform.position, clostestTrafficLight) > (0.000253+StoppingDistance) && 
					Vector3.Distance(transform.position, clostestTrafficLight) < (0.005053+StoppingDistance) &&
					Vector3.Distance(transform.position, RouteList[i]) > Vector3.Distance(clostestTrafficLight, RouteList[i]))
					{
						speed = 0;
					}
					//speed = 0;
				}
			}
			else if(GlobalVariables.TrafficLightState == "Green" && BoyRacer == false)
			{
				if((transform.eulerAngles.y > 110 && transform.eulerAngles.y < 130) || (transform.eulerAngles.y > 290 && transform.eulerAngles.y < 310))
				{
					if(Vector3.Distance(transform.position, clostestTrafficLight) > (0.000253+StoppingDistance) && 
					Vector3.Distance(transform.position, clostestTrafficLight) < (0.005053+StoppingDistance) &&
					Vector3.Distance(transform.position, RouteList[i]) > Vector3.Distance(clostestTrafficLight, RouteList[i]))
					{
						speed = 0;
					}
					//speed = 0;
				}
			}
		}

		/*
		MoveToward function moves the gameObject toward a destination by a fraction. Concidering time.deltatime is such a small fraction which
		increments slightly over time, this was perfect to slowly move the vehicle along. To manipulte this movement, Time.deltatime is
		multiplied by speed. Given the github project imported takes place on a different axis, all gameObjects must be rotated every time
		a the code iterates through the loop. If the position of the gameObject is the same as the next node on the routelist, increment the 
		iterator and travel to the next node. Once the gameObjects position is last node, the journey has been complete, exit the while loop,
		create a new gameObject and destroy the old one.  
		*/
		if(1==1)
		{
			/*
			If speed is 0 than the rotation is 0 as the rotation is created using the current position with the position of the last iteration.
			To counteract this and to make the script more optimised, the rotation and movement code is only fultilled if the path is clear.
			*/
			if(PathIsNowClear == true)
			{
		        timeSinceStarted = timeSinceStarted + Time.deltaTime*speed;
		        transform.position = Vector3.MoveTowards(startingPosition, RouteList[i], timeSinceStarted);
		        transform.right = transform.position - startingPosition;
		        transform.Rotate(90,0,0);
	        }

	       
	        if (transform.position ==  RouteList[RouteList.length-1])
	        {
	        	GlobalVariables.journeyCounter = GlobalVariables.journeyCounter+1;
	        	checker = false;
	            Cars = gameObject;  			
	  			random_number = Random.Range(1,GlobalVariables.xList.length-1);
	  			car = Instantiate(Cars, new Vector3(Random.Range(4,GlobalVariables.xList.length),Random.Range(4,GlobalVariables.xList.length),Random.Range(4,GlobalVariables.xList.length)), Quaternion.Euler(90, 0, 0)) as GameObject;
	  			car.name = transform.name;
	            Destroy (gameObject);
	            //CallOtherFunctions();
	            //GameSetup.ResetGameObject(gameObject);
	        }
	        else if(transform.position == RouteList[i])
	        {
	        	startingPosition = transform.position;
	        	timeSinceStarted = 0f;
	        	i = i+1;
				/* 
				After each node on the routelist is complete, the vehicle tracks the next nearest traffic light to the next node on the routelist. 
				This is used for the next time a vehicle comes to an intersection and needs to stop close to it. Note the nodes within the 
				routelist are not traffic light nodes, this is why this is nessisary. Set  clostestTrafficLightDist to be high so it's immediatly 
				overwritten. Go through each traffic light, if it's closer than the last traffic light make that the new nearest traffic light.
				*/
				a = 0;

				clostestTrafficLightDist = 20f;
				while(a<GlobalVariables.xList.length)
				{
					//if(Vector3.Distance(RouteList[i], Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a])) < clostestTrafficLightDist && Vector3.Distance(Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a]), transform.position) < (StoppingDistance/2) )
					if(Vector3.Distance(RouteList[i], Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a])) < clostestTrafficLightDist )
					//&& Vector3.Distance(RouteList[i], Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a])) > 0.0001)
					{
							clostestTrafficLightDist = Vector3.Distance(transform.position, Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a]));
							clostestTrafficLight = Vector3(GlobalVariables.xList[a],GlobalVariables.Ydepth,GlobalVariables.zList[a]);					
					}
					a = a+1;
				}
	        }
	        //Yield makes the movement seem more natural, more realistic
	        //Note: For the love of god, DO NOT TOUCH this line. The project won't run without it. It gives a chance for the changes to take effect
	        //Otherwise the cycles just keep passing by without the vehicle being able to act on them.
	        yield WaitForSeconds (0.01);
	    }
    }

	//GameSetup.ResetGameObject(gameObject);
	//RouteList = this.CreateRouteList ();
	//this.Travel(RouteList);
	//Reset = true;

	/* This code ensures the gameObjects are always destroy and recreated*/
	Cars = gameObject;  			
	random_number = Random.Range(1,GlobalVariables.xList.length-1);
	car = Instantiate(Cars, new Vector3(Random.Range(4,GlobalVariables.xList.length),Random.Range(4,GlobalVariables.xList.length),Random.Range(4,GlobalVariables.xList.length)), Quaternion.Euler(90, 0, 0)) as GameObject;
	car.name = transform.name;
	Destroy (gameObject);
 }


