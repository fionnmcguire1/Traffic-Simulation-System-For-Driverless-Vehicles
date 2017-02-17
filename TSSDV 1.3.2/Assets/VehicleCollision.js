#pragma strict

function OnCollisionEnter (col : Collision)
{	//Destroy(other.gameObject);
	
	if(col.gameObject.name.length < 6)
    {
    	GlobalVariables.CollisionCounter = GlobalVariables.CollisionCounter+1;
    	Debug.Log("Collision "+GlobalVariables.CollisionCounter);
    	var car : GameObject;
	    var Cars : GameObject;
	    var random_number = 0;
	    /*
	    Cars = GameObject.Find(col.gameObject.name);		
		random_number = Random.Range(1,GlobalVariables.xList.length-1);
		car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
		car.name = col.gameObject.name;*/
		Destroy(col.gameObject);

		/*Cars = GameObject.Find(gameObject.name);
		random_number = Random.Range(1,GlobalVariables.xList.length-1);
		car = Instantiate(Cars, new Vector3(GlobalVariables.xList[random_number] ,GlobalVariables.Ydepth,GlobalVariables.zList[random_number]), Quaternion.Euler(90, 0, 0)) as GameObject;
		car.name = gameObject.name;   */     
        Destroy(gameObject);
     }

}
