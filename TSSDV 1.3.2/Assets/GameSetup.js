#pragma strict

/*
This script handles the setup of the game. The script reads in the csv files containing
all traffic lights in manhattan and all precompiled routes. Then the vehicles are created
by cloning the initial gameObject manually created with the properties of a driverless vehicle
and a regular vehicle. The array of traffic lights and the array of routes are broken down here
into three arrays, one with x coordinates of traffic lights, one with z coordinates of traffic
lights and one with each route as an element of the array of type string. The vehicles are then
instantiated onto random coordinates outside the map, When the playerControls script takes effect
The vehicles will be assigned a position according to their route.
*/
import UnityEngine.UI;
public var AllSprites : Sprite[];
public static var Cars : GameObject;
public var car : GameObject;
public var minutes = 0;
var i =0;
public var JourneyDisplay : GUIText;
public var CollisionDisplay : GUIText;
public var SimulatedTimeDisplay : GUIText;
//JourneyDisplay.text = "0";
/*
Reading the lat/long query csv file into an array of Traffic light signals as well as the precompiled routelist.
The local path is provided for both windows and Mac, change this to wherever the files are stored on your computer 
Mac Paths: /Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/PythonTrafficSignals.txt
		   /Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/UnityRouteList1.txt
Windows Paths: C:/Users/Fionn Mcguire/Documents/GitHub/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/PythonTrafficSignals.txt
			   C:/Users/Fionn Mcguire/Documents/GitHub/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/UnityRouteList1.txt
Assuming on windows you downloaded the repo into the suggested folder /Documents/Github
*/

var text = System.IO.File.ReadAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/PythonTrafficSignals.txt");
//This needs to be reset otherwise it takes values from the cached text value which is the previous file which was loaded in, in an earlier version
text = System.IO.File.ReadAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/PythonTrafficSignals.txt");
var PreCompiledRouteList = System.IO.File.ReadAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/UnityRouteList1.txt");

System.IO.File.WriteAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/PositionOffset.csv",  System.String.Format('0,0,0'));


//These variables are used as iterators, co_ord is used to build the array of coordinates. This algorithm was built before 
//The methodology of String split was found in unity. The coordinates are split into two arrays of x,z.
var j = 0;
var k = 0;
var co_ord = "";
var TrafficLightLatArr = new Array ();
var TrafficLightLongArr = new Array ();

/*
Creating a class of important variables that need to be passed around the project.
xList and zList are public lat and long arrays. Journey counters and Collision 
counters. Ydepth is used to ensure the vehicles are located above the map. The map 
tiles are curved in a U shape. The Ydepth ensures the vehicles don't travel both
above and below the map irregularly.
*/
public static class GlobalVariables 
{
	public static var xList = new Array ();
	public static var zList = new Array ();
	public static var journeyCounter = 0;
	public static var CollisionCounter = 0;
	public static var Ydepth = 0.2f;
	public static var PCrouteList : String[];
	public static var TrafficLightState = "Green";
	public static var simulationSpeed = 64; //Was x64
	public static var SeriousCollision = 0;
	public static var SuperficialCollision = 0;
	public static var FatalCollision = 0;
	public static var Offset : Vector3 = new Vector3(0,0,0);

}
public var PreviousRootPosition : Vector3 = new Vector3(0,0,0) ;
//Creating a routelist array to have a full route string per element in the array
var separator : char[] = ["\n"[0]];
GlobalVariables.PCrouteList = PreCompiledRouteList.Split(separator);
/*
Go through each element in text, when you reach a space, it's a new coordinate
if its the first coordinate it's an x and if it's the seconds coordinate its a z
Push the coordinates to their respective Arrays. If no space is reached, build 
the co_ord string. This was an algorithm developed before the Split(separator code was found).
Concidering the two arrays were built over the entire project there was no time to change
over to a 2D array. This works as is and given the time contraint on the project, there was no
need to change.
*/
while(j < text.Length)
{
	if(text[j] == " ")
	{
		if(k%2 == 0)
		{
			GlobalVariables.xList.Push(float.Parse(co_ord));
        	co_ord = "";
        	k = k+1;
    	}
    	else
    	{
			GlobalVariables.zList.Push((float.Parse(co_ord)));
        	co_ord = "";
        	k = k+1;
    	}

	}
	co_ord = co_ord+text[j];	        
	j = j+1;
}
k=0;
j = 0;
//No space at the end of the file so push the last coordinate
TrafficLightLongArr.Push(co_ord);

function Start ()
{
	//JourneyDisplay = GameObject.Find("JourneyDisplay").GetComponent.<GUIText>();
	//JourneyDisplay.text = "Hello";
	//Instantiating the Collision report file with headings to make it more readable
	System.IO.File.WriteAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/CollisionReport.csv", System.String.Format("CAR 1, CAR 2, SPEED 1, SPEED 2, ANGLE DIFFERENCE \n"));
	/*
	Setting index to 1 as the initial Driverless car (Car) exists. Go through the while
	Loop calling CreateGameObjectFromPrefab. This function is poorly named as it should
	Be called CreateGameObjectFromClone. This clones the origional gameObject and appends
	the name with the index number. After this is done, print the Current real time to
	the debug log to give an update on when the next notification should take place.
	The notification is with regards to the journeys and collisions per simulated minute.
	Seperately DCar is destroyed as this does not follow the naming convention. DCar is 
	the driver car gameObject.
	*/
	var index = 1;
	while(index < 25)
	{ 
	CreateGameObjectFromPrefab(index);     
	index=index+1;
	}
	Destroy(GameObject.Find("DCar"));
	Debug.Log(System.DateTime.Now.ToString("hh:mm:ss"));
	//Debug.Log(Mesh.bounds.size.);
 }

function Update () 
{
 	//Time%60 Gets the results per minute. Assigning the minutes variables ensures this code is only executed once per minute.
	if(Mathf.Round(Time.fixedTime)%60 == 0)
	{
		var current_minutes;
		current_minutes = Mathf.Round(Time.fixedTime)/60;
		if(current_minutes != minutes)
		{
			//var ratio : float = GlobalVariables.CollisionCounter/GlobalVariables.journeyCounter;
			minutes = Mathf.Round(Time.fixedTime)/60;
			Debug.Log("Total Collisions: "+GlobalVariables.CollisionCounter+",  Total Journeys: "+GlobalVariables.journeyCounter+",  Superficial: "+GlobalVariables.SuperficialCollision+",  Serious: "+GlobalVariables.SeriousCollision+",  Fatal: "+GlobalVariables.FatalCollision+" in "+Mathf.Round(minutes)+" Minutes");
			//Debug.Log(GlobalVariables.DriverlessCollisionCounter+" Driverless Collisions and "+GlobalVariables.DriverCollisionCounter+" Driver Collisions ");
			if(Mathf.Round(minutes) == 3)
			{
				System.IO.File.AppendAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/SimulationReports.csv", System.String.Format("{0}, {1}, {2} \n", GlobalVariables.CollisionCounter, GlobalVariables.journeyCounter, System.DateTime.Now.ToString("H:mm:ss dd/MM/yyyy")));
			}
		}
	}
	 //Traffic light controller 4 seconds green, 1 second yellow, 4 seconds red
	 if((Mathf.Round(Time.time)%9 < 4))
	 {
	 	GlobalVariables.TrafficLightState = "Red";
	 }
	 else if((Mathf.Round(Time.time)%9 > 4))
	 {
	 	GlobalVariables.TrafficLightState = "Green";
	 }
	 else
	 {
	 	GlobalVariables.TrafficLightState = "Yellow";
	 }

	 var OffsetFile = System.IO.File.ReadAllText("/Users/FionnMcguire/College/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/PositionOffset.csv");
	 var separator : char[] = [","[0]];
	 var interMediateOffset = new Array ();
	 interMediateOffset = OffsetFile.Split(separator);
	 var holding : Vector3 = Vector3(float.Parse(interMediateOffset[0]), float.Parse(interMediateOffset[1]), float.Parse(interMediateOffset[2]));
	 if(PreviousRootPosition != holding)
	 {
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
		  Debug.Log("After "+AllObjects[4].transform.position);
	 }
}
/*
This function creates clones from the manually created gameObjects for drivers and driverless vehicles.
The if statement controls the ratio of driverless vehicles in the simulation. Finally the gameObjects
name is appended by the index as to distinguish between different vehicles.
*/
public static function CreateGameObjectFromPrefab(index : int)
{
	var car : GameObject;
	var checker = true;
	if(index>12)
	{	  	
	  	Cars = GameObject.Find("Car");
	  	//car = Instantiate(Cars, new Vector3(GlobalVariables.xList[index] ,GlobalVariables.Ydepth, GlobalVariables.zList[index]), Quaternion.Euler(90, 0, 0)) as GameObject;
	  }
	  else
	  {	        
	  	Cars = GameObject.Find("DCar");
	  	//car = Instantiate(Cars, new Vector3(GlobalVariables.xList[index] ,GlobalVariables.Ydepth, GlobalVariables.zList[index]), Quaternion.Euler(90, 0, 0)) as GameObject;
	  }
	  car = Instantiate(Cars, new Vector3(Random.Range(4,GlobalVariables.xList.length),Random.Range(4,GlobalVariables.xList.length),Random.Range(4,GlobalVariables.xList.length)), Quaternion.Euler(90, 0, 0)) as GameObject;
	  car.name = "Car"+index;
}
/*
The CreateCollisionArea function is called by the vehicleCollision script. This employs GameSetup as a controller to 
ensure that two collisions are not formed i.e each gameObject conciders it to be the one which was collided with and 
therfore calls the script. This function checks if the collision area has already been made at the exact point of contact
which is the same on both vehicles. If it has not been created then create the collision area, increment the counter and
destroy the collision area after a breif period.
*/
public static function CreateCollisionArea(location,serverity)
{
 		var i = 0;
 		var alreadyCreated = false;
 		for(var gameObj : GameObject in GameObject.FindObjectsOfType(GameObject))
		{
 			if(gameObj.transform.position == location)
 			{
 				alreadyCreated = true;
 			}
 		}
 		if(alreadyCreated == false && Vector3.Distance(location, Vector3(0.6812,0.2,-0.56845)) > 0.35133309611)
 		{
 			if(serverity == 3)
 			{
 				GlobalVariables.FatalCollision = GlobalVariables.FatalCollision+1;
 			}
 			else if(serverity == 2)
 			{
 				GlobalVariables.SeriousCollision = GlobalVariables.SeriousCollision+1;
 			}
 			else
 			{
 				GlobalVariables.SuperficialCollision = GlobalVariables.SuperficialCollision+1;
 			}
 			GlobalVariables.CollisionCounter = GlobalVariables.CollisionCounter+1;
 			//Debug.Log(GlobalVariables.CollisionCounter);
	      	var collisionarea : GameObject;
	      	collisionarea = GameObject.Find("CollisionArea");
	      	collisionarea = Instantiate(collisionarea, location, Quaternion.Euler(90, 0, 0)) as GameObject;
	      	collisionarea.name = "CollisionArea"+GlobalVariables.CollisionCounter;
	      	Destroy(GameObject.Find("CollisionArea"+GlobalVariables.CollisionCounter), 20);
      	}
}
//Resets all of a gameobjects variables as opposed to destroying them and recreating them.
//This is much more efficient as well as bypassing unity's limit to the creation of gameobjects
//This function does not work yet
public static function ResetGameObject (gameobject : GameObject)
{
	//Debug.Log("Got It");
	gameobject.GetComponent(PlayerControls).enabled = false;
	gameobject.GetComponent(PlayerControls).enabled = true;
}

