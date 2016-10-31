#pragma strict

var moveLeft : KeyCode;
var moveRight : KeyCode;
var moveUp : KeyCode;
var moveDown : KeyCode;
//var target : Transform;
//var timeSinceStarted : float = Time.deltaTime;

var speed : float = 10;
var checker : boolean = true;
//var coOrd;

function Start () {

//CallingAllFunctions();
}

function Update () {
 //if(GetComponent.<Rigidbody2D>().position.y == 8.5){}
 /*if(GetComponent.<Rigidbody2D>().position.x == -7.9 ||)
 {
 	GetComponent.<Rigidbody2D>().velocity.x = 0;
 }*/

 if (Input.GetKey(moveLeft))
 {
 GetComponent.<Rigidbody2D>().velocity.x = -speed;

 }
 else if (Input.GetKey(moveRight))
 {
  /*Move (8.5,-4.37);
  Move (8.5,-3.9);
  Move (-7.9,3.9);
  Move (7.9,4.37);*/
  CallingAllFunctions ();
 
 }
 else if (Input.GetKey(moveUp))
 {
  GetComponent.<Rigidbody2D>().velocity.y = speed;
  //transform.Rotate (Vector3.forward *30);

 }
 else if (Input.GetKey(moveDown))
 {
  GetComponent.<Rigidbody2D>().velocity.y = -speed;
  //transform.Rotate (Vector3.back*30);


 }
 else 
 {
   GetComponent.<Rigidbody2D>().velocity.x = 0;
   GetComponent.<Rigidbody2D>().velocity.y = 0;
  
 }
}

 function CallingAllFunctions () {
 	StartCoroutine(Move(8.5,-4.37));
 	yield WaitForSeconds(4);
    StartCoroutine(Move (8.5,3.9));
    yield WaitForSeconds(4);
    StartCoroutine(Move (-7.9,3.9));
    yield WaitForSeconds(4);
    StartCoroutine(Move (-7.9,-4.37));


 }

function Move (x,y) {
    checker = true;
    var timeSinceStarted : float = 0f;
    var startingPosition = transform.position;
    while (checker === true)
    {

        timeSinceStarted = timeSinceStarted + Time.deltaTime*0.5;
        transform.position = Vector3.Lerp(startingPosition, Vector2(x,y), timeSinceStarted);

        // If the object has arrived, stop the coroutine
        if (transform.position ==  Vector2(x,y))
        {
            checker = false;
        }

        // Otherwise, continue next frame
        yield WaitForSeconds (0.01);
    }
 }

