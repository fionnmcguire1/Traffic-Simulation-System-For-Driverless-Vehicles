#pragma strict

function OnCollisionEnter (col : Collision)
{	//Destroy(other.gameObject);
	//var force : float;
	//Debug.Log("Veolocity "+gameObject.GetComponent.<Rigidbody>().velocity.magnitude);
	//Debug.Log("Mass "+gameObject.GetComponent.<Rigidbody>().mass);
	//force = col.rigidbody.velocity.magnitude*col.rigidbody.mass;
	// && force > 0.01
	var AngleDifference : float;
	AngleDifference = transform.eulerAngles.y - col.transform.eulerAngles.y;
	if(AngleDifference < 0)
	{
		AngleDifference = AngleDifference*-1;
	}
	if(col.gameObject.name.length < 6 && AngleDifference < 140)
    {
    	//var contact: ContactPoint = col.contacts[0].point;
    	//Debug.Log(col.contacts[0].point);
    	//GlobalVariables.CollisionCounter = GlobalVariables.CollisionCounter+1;
    	//Debug.Log("Collision "+GlobalVariables.CollisionCounter);
    	var car : GameObject;
	    var Cars : GameObject;
	    var random_number = 0;


	    //var Direction : Vector3 = col.transform.position - transform.position;
	    //Debug.Log(Direction);


		Cars = GameObject.Find(transform.name);
		random_number = Random.Range(1,GlobalVariables.xList.length-1);
		Cars.GetComponent(PlayerControls).enabled = true;
		Cars.GetComponent(VehicleCollision).enabled = true;
		car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
		car.name = gameObject.name;
		GameSetup.CreateCollisionArea(col.contacts[0].point);
		//Debug.Log(col.rigidbody.velocity.magnitude*col.rigidbody.mass);
		//gameObject.transform.position = Vector3(0,0,0);
		//yield WaitForSeconds (0.4);
        Destroy(gameObject);
     }

}
/*
	    Cars = GameObject.Find(col.gameObject.name);		
		random_number = Random.Range(1,GlobalVariables.xList.length-1);
		car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
		car.name = col.gameObject.name;*/
		//Destroy(col.gameObject);
		//gameObject.Find(gameObject.name).GetComponent(PlayerControls).enabled = false;
		//yield WaitForSeconds (2);
		//gameObject.Find(gameObject.name).GetComponent(PlayerControls).enabled = true;
		/*Cars = GameObject.Find(gameObject.name);
		random_number = Random.Range(1,GlobalVariables.xList.length-1);
		car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
		car.name = gameObject.name;   */   


		//Cars = GameObject.Find(gameObject.name);
		//Cars.GetComponent(PlayerControls).checker = false;
		//transform.tag = "Untagged";
	    //yield WaitForSeconds (2);
	    //transform.tag = "Car";
		//Cars = gameObject;
		//	var random_number = 0;

/*#pragma strict

function OnCollisionEnter (col : Collision)
{
	
	if(col.gameObject.name.length < 6)
    {
    	GlobalVariables.CollisionCounter = GlobalVariables.CollisionCounter+1;
    	//Debug.Log("Collision "+GlobalVariables.CollisionCounter);
    	Debug.Log("Collision GO"+gameObject.name+"  Col"+col.gameObject.name);


    	var car : GameObject;
	    var Cars : GameObject;
	    var random_number = 0;
	    var Carname = transform.name;
	    //var gameobject : GameObject;
	    //var PC;
	    //@@@@@@@@Code To Try Pause player script to simulate the car crash@@@@@@@@//
	    //PC = GameObject.Find(Carname).GetComponent(PlayerControls);

	    //PC.enable = !PC.enabled;
	    //PlayerControls.enable = false;
	    //GameObject.Find(col.gameObject.name).GetComponent(PlayerControls).enabled = false;
		//GameObject.Find(col.gameObject.name).GetComponent(PlayerControls).enabled = false;
		//gameObject.Find(gameObject.name).GetComponent(PlayerControls).enabled = false;
		//transform.veolocity=Vector3.zero;

	    //PC.enable = !PC.enabled;
	    //gameObject.Find(gameObject.name).GetComponent(PlayerControls).enabled = true;
	    //PlayerControls.enable = true;
	    //GameObject.Find(Carname).GetComponent(PlayerControls).enabled = GameObject.Find(Carname).GetComponent(PlayerControls).enabled;
	    //GameObject.Find(col.gameObject.name).GetComponent(PlayerControls).enabled = true;
	    //gameObject.GetComponent(PlayerControls).enabled = true;
	    //Debug.Log(col.gameObject.name+"Col "+col.gameObject.name.GetComponent(PlayerControls).enabled);
    	//Debug.Log(gameObject.name+"GO "+gameObject.name.GetComponent(PlayerControls).enabled);
    	/*if(GameObject.Find(gameObject.name).GetComponent(PlayerControls).enabled == false)
    	{
    		GameObject.Find(gameObject.name).GetComponent(PlayerControls).enabled = true;
    	}
		//Reinitiation
		Cars = GameObject.Find(Carname);
		//Cars.GetComponent(PlayerControls).checker = false;
		//transform.tag = "Untagged";
	    //yield WaitForSeconds (2);
	    //transform.tag = "Car";
		//Cars = gameobject;
		//	var random_number = 0;
		random_number = Random.Range(1,GlobalVariables.xList.length-1);
		//Cars.GetComponent(PlayerControls).enabled = true;
		car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
		car.name = Carname;
		//car.tag = "Car";
		//gameObject.Find(Carname).GetComponent(PlayerControls).enabled = true;
		//GameObject.Find(col.gameObject.name).GetComponent(PlayerControls).enabled = true;
		Destroy (gameObject);
		//Destroy (col.gameObject);
		//Destroy (col.gameObject);
        
     }

}*/


