#pragma strict


public var startTime = Time.time;

function Start () {
	startTime = Time.time;
	//Debug.Log(startTime);

}

function Update () {
	var difference : float;
	difference = Time.time - startTime;
	var limit = 2f;
	if(difference >= limit && transform.name != "CollisionArea")
	{
		//Destroy(gameObject);
		kill(gameObject);
	}
}

public static function kill(GO)
{
	Destroy(GO);
}

/*while(i < GlobalVariables.CollisionArray.length)
		{
			if(GlobalVariables.CollisionArray[i] == shortestPoint)
			{
				GlobalVariables.CollisionArray.RemoveAt(i);
			}
			i = i+1;
		}*/

			//Debug.Log(startTime);
	//var i = 0;

	/*
	var currentNode = transform.position;
	var shortestDist = 20f;
	var dist : float;
	while(i < GlobalVariables.xList.length)
	{
		dist = (Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]) - currentNode).magnitude;
		if(dist < shortestDist && dist != 0.0)
		{
			
			shortestDist = dist;												
			shortestPoint = Vector3(GlobalVariables.xList[i],GlobalVariables.Ydepth,GlobalVariables.zList[i]);
		}

	}

	GlobalVariables.CollisionArray.push(shortestPoint);
	Debug.Log(GlobalVariables.CollisionArray);*/
