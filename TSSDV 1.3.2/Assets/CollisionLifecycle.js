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