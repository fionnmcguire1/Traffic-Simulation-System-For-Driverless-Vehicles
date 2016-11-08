#pragma strict

//Creates an array called AllSprites
 public var AllSprites : Sprite[];
 public var Cars : GameObject[];
 public var car : GameObject;
 //public var new_Cars : GameObject[];
 var i =0;
 var node_x_list = [-6.85,-6.2,-5.55,-4.9,-4.2,-3.55,-2.87,-2.15,-1.4,-0.75,-0.07,0.6,1.3,1.98,2.63,3.3,4,4.65,5.34,6];
 var node_y_list = [2.35,0,2.63];

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
      Cars = GameObject.FindGameObjectsWithTag("Car");

      var index = 1;
      while(index < 11)
      {  
      	car = Instantiate(Cars[0], new Vector3(0,node_x_list[ Random.Range(0,19)], 0), Quaternion.identity) as GameObject;
      	car.name = "Car"+index;
      	//Cars[index] = car;
      	//Debug.log("Got In HERE");
      	//new_Cars[i].name = Cars[i]
      	index=index+1;
      	//Cars[i].GetComponent<SpriteRenderer>().sprite = (Sprite)AllSprites[i];
      }
     
 }
