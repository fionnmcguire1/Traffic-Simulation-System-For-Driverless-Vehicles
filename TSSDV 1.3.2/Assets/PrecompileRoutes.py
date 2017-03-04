"""
Python file to create precomiled routes using path finding algorithm.
Author Fionn Mcguire
Date 02/03/2016
"""

with open('Resources/TrafficSignals.csv') as f:
 #   content = f.readlines()
 content = [word.replace("POINT(",'') for word in f]
 content = [word.replace(")",'') for word in content]
 content = [word.replace("\r",'') for word in content]
 content = [word.replace("\n",'') for word in content]
 content = [word.replace("\"",'') for word in content]
 #content = [word.replace("-",' ') for word in content]
 i=0
 for word in content:
     content[i] = word.split(' ',1)
     #print content[i]
     i = i+1
 #content[3] = content[3].split(' ' , 1)
print(content[1])
print(content[2])
print(content[3])
print content[3][1]


Xdifference = 4.063;
Xmax = 2.05;
Xmin = -2.013;
Zmax = 1.1491;
Zmin = -0.882;
Zdifference = 2.0311;
LatDifference = 0.066341;
Latmin = -74.004091;
Latmax = -73.937750;
LongDifference = 0.024984;
Longmax = 40.797204;
Longmin = 40.772220;

coord = []
coord.append([])
coord.append([])

"""coord[0].append(1)
coord[0].append(2)

coord[1].append(3)
coord[1].append(4)"""

i=1
for word in content:
    if i<len(content):
        if (float(content[i][1]) > float(Longmin)) and (float(content[i][1]) < float(Longmax)) and (float(content[i][0]) > float(Latmin)) and (float(content[i][0]) < float(Latmax)):
            #Converting longatude coordinate to Z coordinate
            LongToBeConverted = float(content[i][1])  - Longmin
            LongToBeConverted = LongToBeConverted/LongDifference
            if LongToBeConverted < 0:
                LongToBeConverted=LongToBeConverted*-1
            LongToBeConverted = Zmin+(Zdifference*LongToBeConverted)
            coord[1].append(LongToBeConverted)
        
            #Converting latitude coordinate to X coordinate
            LatToBeConverted = float(content[i][0])  - Latmax
            LatToBeConverted = LatToBeConverted/LatDifference
            if LatToBeConverted < 0:
                LatToBeConverted=LatToBeConverted*-1
            LatToBeConverted = Xmin+(Xdifference*LatToBeConverted);




            
            coord[0].append(LatToBeConverted)
    i = i+1
#print (coord[0])
i=0
str1 = ""
##TrafficLightCo = open("PythonTrafficSignals.txt", "w")
with open('Resources/PythonTrafficSignals.txt',"w") as TrafficLightCo:
    while i < len(coord[1]):
        str1 = coord[0][i]
        TrafficLightCo.write(str(str1))
        TrafficLightCo.write(" ")
        str1 = coord[1][i]
        TrafficLightCo.write(str(str1))
        TrafficLightCo.write(" ")
        i+=1
        

