#pragma strict

import UnityEngine.UI;
public var JourneyDisplay : GUIText;


//JourneyDisplay.text = "0";

function Start () {
	JourneyDisplay.fontSize = 14;
	JourneyDisplay.fontSize = 14;

	//JourneyDisplay.color = 404040;

}

function Update () {
	JourneyDisplay.text = "Journeys: "+GlobalVariables.journeyCounter+"\nCollisions: "+GlobalVariables.CollisionCounter+"\nSimulated Minutes: "+(Mathf.Round((Time.time*GlobalVariables.simulationSpeed)/60));
}