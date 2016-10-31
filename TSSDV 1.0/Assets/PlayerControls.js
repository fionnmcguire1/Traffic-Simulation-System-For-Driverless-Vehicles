#pragma strict

var moveLeft : KeyCode;
var moveRight : KeyCode;
var moveUp : KeyCode;
var moveDown : KeyCode;

var speed : float = 10;


function Update () {
 //if(GetComponent.<Rigidbody2D>().position.y == 8.5){}
 /*if(GetComponent.<Rigidbody2D>().position.x == -7.9 ||)
 {
 	GetComponent.<Rigidbody2D>().velocity.x = 0;
 }*/

 if (Input.GetKey(moveLeft))
 {
 //while(GetComponent.<Rigidbody2D>().position.x <= 4.37 &&  GetComponent.<Rigidbody2D>().position.x >= -4.37){
  GetComponent.<Rigidbody2D>().velocity.x = -speed;

  //}

 }
 else if (Input.GetKey(moveRight))
 {
  
  GetComponent.<Rigidbody2D>().velocity.x = speed;


 }
 else if (Input.GetKey(moveUp))
 {
  GetComponent.<Rigidbody2D>().velocity.y = speed;
  transform.Rotate (Vector3.forward *30);

 }
 else if (Input.GetKey(moveDown))
 {
  GetComponent.<Rigidbody2D>().velocity.y = -speed;
  transform.Rotate (Vector3.back*30);

 }
 else 
 {
   GetComponent.<Rigidbody2D>().velocity.x = 0;
   GetComponent.<Rigidbody2D>().velocity.y = 0;
  
 }
}