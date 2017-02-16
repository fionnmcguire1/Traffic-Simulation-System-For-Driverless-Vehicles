using UnityEngine;
using System;
using UnitySlippyMap.Map;
using UnitySlippyMap.Markers;
using UnitySlippyMap.Layers;
using ProjNet.CoordinateSystems;
using ProjNet.CoordinateSystems.Transformations;
using ProjNet.Converters.WellKnownText;
using System.IO;
using System.Collections;
using System.Collections.Generic;

public class TestMap : MonoBehaviour
{
	private MapBehaviour        map;

	public Texture    LocationTexture;
	public Texture    MarkerTexture;

	private float    guiXScale;
	private float    guiYScale;
	private Rect    guiRect;

	private bool     isPerspectiveView = false;
	private float    perspectiveAngle = 30.0f;
	private float    destinationAngle = 0.0f;
	private float    currentAngle = 0.0f;
	private float    animationDuration = 0.5f;
	private float    animationStartTime = 0.0f;

	private List<LayerBehaviour> layers;
	private int     currentLayerIndex = 0;

	bool Toolbar(MapBehaviour map)
	{
		GUI.matrix = Matrix4x4.Scale(new Vector3(guiXScale, guiXScale, 1.0f));

		GUILayout.BeginArea(guiRect);

		GUILayout.BeginHorizontal();

		//GUILayout.Label("Zoom: " + map.CurrentZoom);

		bool pressed = false;
		if (GUILayout.RepeatButton("+", GUILayout.ExpandHeight(true)))
		{
			map.Zoom(1.0f);
			pressed = true;
		}
		if (GUILayout.RepeatButton("-", GUILayout.ExpandHeight(true)))
		{
			map.Zoom(-1.0f);
			pressed = true;
		}
		if (Event.current.type == EventType.Repaint)
		{
			Rect rect = GUILayoutUtility.GetLastRect();
			if (rect.Contains(Event.current.mousePosition))
				pressed = true;
		}

		GUILayout.EndHorizontal();

		GUILayout.EndArea();

		return pressed;
	}
	private IEnumerator Start()
	{
		// setup the gui scale according to the screen resolution
		guiXScale = (Screen.orientation == ScreenOrientation.Landscape ? Screen.width : Screen.height) / 480.0f;
		guiYScale = (Screen.orientation == ScreenOrientation.Landscape ? Screen.height : Screen.width) / 640.0f;
		// setup the gui area
		guiRect = new Rect(16.0f * guiXScale, 4.0f * guiXScale, Screen.width / guiXScale - 32.0f * guiXScale, 32.0f * guiYScale);

		// create the map singleton
		map = MapBehaviour.Instance;
		//Camera.main.transform.RotateAround (Vector3.zero, cameraLeft);
		map.CurrentCamera = Camera.main;

		map.InputDelegate += UnitySlippyMap.Input.MapInput.BasicTouchAndKeyboard;
		map.CurrentZoom = 15.0f;
		// 9 rue Gentil, Lyon
		map.CenterWGS84 = new double[2] { -73.971249, 40.783060 };
		//4.83527, 45.76487 lyon, france
		//-6.26031, 53.349805 dublin, ireland
		//-73.971249, 40.783060 manhatton, USA
		map.UsesLocation = true;
		map.InputsEnabled = true;
		map.ShowsGUIControls = true;

		map.GUIDelegate += Toolbar;
		//transform.Rotate (Vector3.right);

		layers = new List<LayerBehaviour>();

		// create an OSM tile layer
		OSMTileLayer osmLayer = map.CreateLayer<OSMTileLayer>("OSM");
		osmLayer.BaseURL = "http://b.tile.openstreetmap.org/";

		layers.Add(osmLayer);



		// FIXME: SQLite won't work in webplayer except if I find a full .NET 2.0 implementation (for free)
		// create an MBTiles tile layer
		bool error = false;
		// on iOS, you need to add the db file to the Xcode project using a directory reference
		string mbTilesDir = "MBTiles/";
		string filename = "UnitySlippyMap_World_0_8.mbtiles";
		string filepath = null;
		if (Application.platform == RuntimePlatform.IPhonePlayer)
		{
			filepath = Application.streamingAssetsPath + "/" + mbTilesDir + filename;
		}
		else if (Application.platform == RuntimePlatform.Android)
		{
			// Note: Android is a bit tricky, Unity produces APK files and those are never unzip on the device.
			// Place your MBTiles file in the StreamingAssets folder (http://docs.unity3d.com/Documentation/Manual/StreamingAssets.html).
			// Then you need to access the APK on the device with WWW and copy the file to persitentDataPath
			// to that it can be read by SqliteDatabase as an individual file
			string newfilepath = Application.temporaryCachePath + "/" + filename;
			if (File.Exists(newfilepath) == false)
			{
				Debug.Log("DEBUG: file doesn't exist: " + newfilepath);
				filepath = Application.streamingAssetsPath + "/" + mbTilesDir + filename;
				// TODO: read the file with WWW and write it to persitentDataPath
				WWW loader = new WWW(filepath);
				yield return loader;
				if (loader.error != null)
				{
					Debug.LogError("ERROR: " + loader.error);
					error = true;
				}
				else
				{
					Debug.Log("DEBUG: will write: '" + filepath + "' to: '" + newfilepath + "'");
					File.WriteAllBytes(newfilepath, loader.bytes);
				}
			}
			else
				Debug.Log("DEBUG: exists: " + newfilepath);
			filepath = newfilepath;
		}
		else
		{
			filepath = Application.streamingAssetsPath + "/" + mbTilesDir + filename;
		}
	}

	void OnApplicationQuit()
	{
		map = null;
	}

	void Update()
	{
		if (destinationAngle != 0.0f)
		{/////
			Vector3 cameraLeft = Quaternion.AngleAxis(-90.0f, Camera.main.transform.up) * Camera.main.transform.forward;
			if ((Time.time - animationStartTime) < animationDuration)
			{
				float angle = Mathf.LerpAngle(0.0f, destinationAngle, (Time.time - animationStartTime) / animationDuration);
				Camera.main.transform.RotateAround(Vector3.zero, cameraLeft, angle - currentAngle);
				currentAngle = angle;
			}
			else
			{
				Camera.main.transform.RotateAround(Vector3.zero, cameraLeft, destinationAngle - currentAngle);
				destinationAngle = 0.0f;
				currentAngle = 0.0f;
				map.IsDirty = true;
			}

			map.HasMoved = true;
		}
	}
}
