#pragma strict

function OnTriggerEnter (other : Collider) 
{

	var AngleDifference : float;
	AngleDifference = transform.eulerAngles.y - other.transform.eulerAngles.y;
	if(AngleDifference < 0)
	{
		AngleDifference = AngleDifference*-1;
	}
	AngleDifference = AngleDifference/360;
	Debug.Log("Hello1");

	if(other.gameObject.name.length < 6)
	{
		if((AngleDifference > 0.1 && AngleDifference<0.45 ) || (AngleDifference > 0.55 && AngleDifference < 0.9 ))
		{
			 //transform.GetComponent.<Rigidbody>().RigidbodyConstraints.FreezePosition = true;
			 Debug.Log("Hello");
			 GetComponent.<Rigidbody>().constraints = RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionY;
		}
	}















}