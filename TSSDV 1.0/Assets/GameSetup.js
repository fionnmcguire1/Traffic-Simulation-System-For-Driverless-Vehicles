#pragma strict

//Creates an array called AllSprites
 public var AllSprites : Sprite[];
 public var Cars : GameObject[];
 var i =0;

 function Start () {

	  //Imports all the sprites in the folder Car_Types in Resources
      var imports : Object[] = Resources.LoadAll("Car_Types/" , Sprite);

      //Adjusting the array size
      AllSprites = new Sprite[imports.Length];

      //For each element in the array the AllSprites element is set to the imports element.
      for(i = 0 ; i < AllSprites.Length ; i++)
      {      
          AllSprites[i] = imports[i];
      }
      Cars = GameObject.FindGameObjectsWithTag("Car");


      for(var i = 1 ; i < 3 ; i++)
      {  
      	Cars[i] = Instantiate(Cars[0], new Vector3(0, -4.37, 0), Quaternion.identity);
      	Cars[i].GetComponent<SpriteRenderer>().sprite = (Sprite)AllSprites[i];
      }
     
 }
