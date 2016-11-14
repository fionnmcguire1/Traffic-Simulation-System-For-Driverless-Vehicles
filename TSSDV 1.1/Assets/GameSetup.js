#pragma strict

//Creates an array called AllSprites
 public var AllSprites : Sprite[];
 public var Cars : GameObject;
 public var car : GameObject;
 //public var new_Cars : GameObject[];
 var i =0;
 public var node_x_list = [-6.85,-6.2,-5.55,-4.9,-4.2,-3.55,-2.87,-2.15,-1.4,-0.75,-0.07,0.6,1.3,1.98,2.63,3.3,4,4.65,5.34,6];
 public var node_y_list = [2.35,0,-2.63];
 //var destination_x = [];
 //var destination_y = [];
 node_y_list[2] = node_y_list[2]*-1;





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
      Cars = GameObject.FindGameObjectWithTag("Car");

      var index = 1;
      var random_number = 0;
	  var random_number_array = new Array();
      var checker = true;

      while(index < 20)
      { 
      /* 
      	checker = true;
      	i = 0;
      	while(checker == true)
      	{
      		random_number = Random.Range(0,19);
      		if(random_number < 0)
      		{
      			random_number = random_number*-1;
      		}
      		if(random_number_array.length >0)
      		{
      			i = 0;
      			while(i<random_number_array.length)
      			{
      				if(random_number_array[i] == random_number)
      				{
      					i = random_number_array.length+1;
      				}
      				i=i+1;
      			}
      			if(i == random_number_array.length)
      			{
      				random_number_array.push(random_number);
      				checker = false;
      			}
      		}
      	}*/

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
		//Debug.Log('Node Y: '+node_y_list[2]);
      	//Debug.Log('Randx'+random_number);
      	//Debug.Log('Randy'+random_numbery);
      	car = Instantiate(Cars, new Vector3(node_x_list[random_number] ,node_y_list[random_numbery], 0), Quaternion.identity) as GameObject;
      	car.name = "Car"+index;
      	//destination_x.push(node_x_list[ Random.Range(0,19)])
      	//destination_y.push(node_y_list[ Random.Range(0,2)])
      	//Cars[index] = car;
      	//Debug.log("Got In HERE");
      	//new_Cars[i].name = Cars[i]
      	index=index+1;
      	//Cars[i].GetComponent<SpriteRenderer>().sprite = (Sprite)AllSprites[i];
      }
     
 }
