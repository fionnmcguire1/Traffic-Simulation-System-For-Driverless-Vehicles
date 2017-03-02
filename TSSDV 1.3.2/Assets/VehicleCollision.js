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
	if(col.gameObject.name.length < 6 && AngleDifference < 140 && AngleDifference > 70)
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


		var currentNode = col.contacts[0].point;
		var shortestDist = 20.0;
	 	var i = 0;
	 	var dist : float;
	 	var shortestPoint;
		while(i < GlobalVariables.xList.length)
		{
			//Distance from  point on list to current point
			dist = (Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]) - currentNode).magnitude;
			if(dist < shortestDist)
			{
				if(dist != 0.0)
				{
					shortestDist = dist;												
					shortestPoint = Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]);
				}
			}
			i = i+1;
		}
		//GameSetup.CreateCollisionArea(col.contacts[0].point);
		//GameSetup.CreateCollisionArea(shortestPoint);
		GlobalVariables.CollisionArray.push(shortestPoint);
		//Debug.Log(GlobalVariables.CollisionArray);


        Destroy(gameObject);
     }

}
