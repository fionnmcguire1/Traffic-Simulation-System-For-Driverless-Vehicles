﻿#pragma strict

//Creates an array called AllSprites
 public var AllSprites : Sprite[];
 public static var Cars : GameObject;
 public var car : GameObject;
 //public var new_Cars : GameObject[];
 var i =0;


 //Reading the lat/long query csv file into an array//////////////////////////
 //This is the MAC OS path to the file
 //On windows the path is 
 //var text = System.IO.File.ReadAllText("C:/Users/Fionn Mcguire/Documents/GitHub/Traffic-Simulation-System-For-Driverless-Vehicles/TSSDV 1.3.2/Assets/Resources/TrafficSignals.csv");
 //Assuming you create your cloned github repos in the suggested folder /Documents/Github/
 var text = System.IO.File.ReadAllText("/Users/Shared/Unity/TSSDV 1.3.2/Assets/Resources/TrafficSignals.csv");
 //var text = System.IO.File.ReadAllText(Resources.Load("TrafficSignals.csv"));

  var j = 0;
  var k = 0;
  var limit = 50;
  var co_ord = "";
  var TrafficLightLatArr = new Array ();
  var TrafficLightLongArr = new Array ();
  public static class GlobalVariables 
  {
  	public static var xList = new Array ();
  	public static var zList = new Array ();
  	public static var journeyCounter = 0;
  	public static var CollisionCounter = 0;
  	public static var Ydepth = 0.2f;
  }
    while(j < text.Length)
    {
    	if(text[j] == '-' || text[j] == '.' || text[j] == ' ' || text[j] == '0' || text[j] == '1' || text[j] == '2' || text[j] == '3' || 
    	text[j] == '4' || text[j] == '5' || text[j] == '6' || text[j] == '7' || text[j] == '8' || text[j] == '9')
    	{
    		if(text[j] == " ")
    		{
    			TrafficLightLatArr.Push(co_ord);
    			//Debug.Log(co_ord);
	        	co_ord = "";

    		}
    		if(text[j] == "-" && co_ord.Length > 1)
    		{
    			TrafficLightLongArr.Push(co_ord);
    			//Debug.Log(co_ord);
	        	co_ord = "";

    		}

	    	co_ord = co_ord+text[j];	        
        }
        j = j+1;
    }
    j = 0;
    TrafficLightLongArr.Push(co_ord);
/////Filtering the arrays into lat/long within the map and converting those
/////lat/long into x/z coordinates and plushing them to an array///////////
var Xdifference = 4.063;
var Xmax = 2.05;
var Xmin = -2.013;
var Zmax = 1.1491;
var Zmin = -0.882;
var Zdifference = 2.0311;
var LatDifference = 0.066341;
var Latmin = -74.004091;
var Latmax = -73.937750;
var LongDifference = 0.024984;
var Longmax = 40.797204;
var Longmin = 40.772220;
var longitude : float;
var latitude : float;
var LatToBeConverted : float;
var LongToBeConverted : float;
var zCo : float;
var xCo : float;

while(j<TrafficLightLatArr.length)
{
	
	latitude = float.Parse(TrafficLightLatArr[j]);
	longitude = float.Parse(TrafficLightLongArr[j]);

	if(latitude > Latmin && latitude < Latmax)
	{
		//Debug.Log(latitude);
		LatToBeConverted = latitude - Latmax;
		//Debug.Log("Lat to be converted "+LatToBeConverted);
		xCo = LatToBeConverted/LatDifference;
		//should be something like .3
		if(xCo < 0){xCo = xCo*-1;}
		//Debug.Log("Percentage: "+xCo);
		xCo = Xmin+(Xdifference*xCo);
		//Debug.Log("-2.013+(4.063*Percentage) = "+xCo);
		if(xCo < Xmax && xCo > Xmin)
		{					
			if(longitude > Longmin && longitude < Longmax)
			{
				//Debug.Log(longitude);
				LongToBeConverted = longitude - Longmin;
				//Debug.Log(LongToBeConverted);
				zCo = LongToBeConverted/LongDifference;
				if(zCo < 0){zCo = zCo*-1;}
				//Debug.Log(zCo);//should be something like .3
				zCo = Zmin+(Zdifference*zCo);
			
				if(zCo < Zmax && zCo > Zmin)
				{
					//Debug.Log(xCo);
					//The cars were all in the right place but in the wrong part of the map. *-1 fixes it.
					xCo = xCo*-1;
					//This is the margin or error on the scene
					xCo = xCo+ 0.0382186;
					GlobalVariables.xList.Push(xCo);
					GlobalVariables.zList.Push(zCo);
				}
			}
		}

	}


	j = j+1;
}

 function Start () {

	  //Imports all the sprites in the folder Car_Types in Resources
      var imports : Object[] = Resources.LoadAll("Car_Types/" , Sprite);

      //Adjusting the array size
      AllSprites = new Sprite[imports.Length];

      //For each element in the array the AllSprites element is set to the imports element.
      for(i = 0 ; i < AllSprites.Length ; i++)
      {      
          //AllSprites[i] = imports[i];
      }

      var index = 0;
      while(index < 55)
      //while(index < GlobalVariables.xList.length)
      { 
      	CreateGameObjectFromPrefab(index);     
      	index=index+1;
      }
 }

 public static function CreateGameObjectFromPrefab(index)
      {
      	//Debug.Log("xList: "+xList.length);
      	//Debug.Log("zList: "+zList.length);
      	var car : GameObject;
      	Cars = GameObject.FindGameObjectWithTag("Car");
      	var random_number = 0;
	  	var random_number_array = new Array();
      	var checker = true;
      	random_number = Random.Range(0,GlobalVariables.xList.length);
      	if(random_number < 0)
      	{
      		random_number = random_number*-1;
      	}
      	car = Instantiate(Cars, new Vector3(GlobalVariables.xList[index] ,GlobalVariables.Ydepth, GlobalVariables.zList[index]), Quaternion.Euler(90, 0, 0)) as GameObject;
      	car.name = "Car"+index;
      }

 public static function CreateCollisionArea(location)
 {
 		
      	var collisionarea : GameObject;
      	collisionarea = GameObject.Find("CollisionArea");
      	collisionarea = Instantiate(collisionarea, location, Quaternion.Euler(90, 0, 0)) as GameObject;
      	collisionarea.name = "CollisionArea"+GlobalVariables.CollisionCounter;
      	//Debug.Log(collisionarea.name);
      	//this.DestroyCollisionArea(collisionarea.name);
      	//yield WaitForSeconds (0.2);
      	//Debug.Log(collisionarea.name);
      	//Destroy(collisionarea);
}

 public static function DestroyCollisionArea(GO)
 {
 		Debug.Log("Hello");
 		var GameO : GameObject;
 		GameO = GameObject.Find(GO);
      	Debug.Log(GameO.name);
      	yield WaitForSeconds (0.2);
      	Destroy(GameO);
}