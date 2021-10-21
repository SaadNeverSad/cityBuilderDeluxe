## GetAvailableMaps  
  
**Verbe :** GET  
**URI :** /game/map/availableMaps   
**Donnée sortie :** {  
&emsp;    "availableMaps" :[{"name" :"randomMap"},  
&emsp;&emsp;&emsp;                        {"name" : "map2"},  
&emsp;&emsp;&emsp;                        {"name" : "map3"}]  
}  
  
## GetMap  
  
**Verbe :** GET  
**URI :** /game/map/{name}  
**Donnée entrée :** {name}=randomMap (for example)  
**Donnée sortie :** {  
&emsp; "type" : "Map",  
&emsp;    "name" : "randomMap",  
 &emsp;   "tiles" :[{   
&emsp;&emsp;  "kind": "WindTurbine",  
&emsp;&emsp;  "x": 3,  
&emsp;&emsp;  "y":1  
&emsp;},...]    
}   
  
## GetBestScores  
  
**Verbe :** GET  
**URI :** /game/map/{name}/scores  
**Donnée entrée :**  {name} = map3 (for example)  
**Donnée sortie :** [{  
&emsp;&emsp;        "score" : 500,    
&emsp;&emsp;"player":{  
&emsp;&emsp;&emsp;&emsp;          "name": "player1"  
&emsp;&emsp;    }       
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 400,    
&emsp;&emsp;"player":{  
&emsp;&emsp;&emsp;&emsp;          "name": "player4"  
&emsp;&emsp;    }          
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 300,    
&emsp;&emsp;"player":{  
&emsp;&emsp;&emsp;&emsp;          "name": "player5"  
&emsp;&emsp;    }        
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 200,    
&emsp;&emsp;"player":{  
&emsp;&emsp;&emsp;&emsp;          "name": "player5"  
&emsp;&emsp;    }       
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 100,  
&emsp;&emsp;"player":{  
&emsp;&emsp;&emsp;&emsp;          "name": "player6"  
&emsp;&emsp;    }      
}]  

## storeScore  

**Verbe :** POST  
**URI :** /game/map/{name_map}/score  
**Donnée entrée :**  {  
    &emsp;&emsp;"score" : 100 ,   
    &emsp;&emsp;"player":{  
 &emsp;&emsp;&emsp;&emsp;           "name": "player6"  
&emsp;&emsp;    }  
}  
**Donnée sortie :** {   
&emsp;&emsp;    "type" : "Score",  
    &emsp;&emsp; "score" : 100 ,  
    &emsp;&emsp;"player":{  
 &emsp;&emsp;&emsp;&emsp;           "name": "player6"  
&emsp;&emsp;    }   
 }  

 ## storeReplay  

**Verbe :** POST  
**URI :** /game/replay   
**Donnée entrée :**  {  
    &emsp;&emsp; "player" : {  
        &emsp;&emsp;&emsp;&emsp; "name" : "player1",  
&emsp;&emsp;    },  
&emsp;&emsp; "map" : {   
 &emsp;&emsp; &emsp;&emsp;        "name" : "randomMap",  
 &emsp;&emsp; &emsp;&emsp;    "tiles" :[{   
&emsp;&emsp;&emsp;&emsp;  "kind": "WindTurbine",  
&emsp;&emsp;&emsp;&emsp;  "x": 3,  
&emsp;&emsp;&emsp;&emsp;  "y":1  
&emsp;&emsp;},  {   
&emsp;&emsp;&emsp;&emsp;  "kind": "WindTurbine",  
&emsp;&emsp;&emsp;&emsp;  "x": 5,  
&emsp;&emsp;&emsp;&emsp;  "y":2  
&emsp;&emsp;},  ...],    
&emsp;&emsp;}  
    &emsp;&emsp;"nextMoves" : [{  
&emsp;&emsp;&emsp;&emsp;  "action": "addBlock",    
&emsp;&emsp;&emsp;&emsp;  "kind": "Circus",  
&emsp;&emsp;&emsp;&emsp;  "x": 3,  
&emsp;&emsp;&emsp;&emsp;  "y":1  
&emsp;&emsp;}] ,   
    &emsp;&emsp;"pastMoves" : [{  
&emsp;&emsp;&emsp;&emsp;  "action": "addBlock",       
&emsp;&emsp;&emsp;&emsp;  "kind": "Fountain",    
&emsp;&emsp;&emsp;&emsp;  "x": 5,    
&emsp;&emsp;&emsp;&emsp;  "y":2    
&emsp;&emsp;}]   
    }  
**Donnée sortie :** {   
       &emsp;&emsp; "type" :"Replay",  
    &emsp;&emsp; "player" : {  
        &emsp;&emsp;&emsp;&emsp; "name" : "player1",   
 &emsp;&emsp;   },  
&emsp;&emsp; "map" : {   
 &emsp;&emsp; &emsp;&emsp;        "name" : "randomMap",  
 &emsp;&emsp; &emsp;&emsp;    "tiles" :[{   
&emsp;&emsp;&emsp;&emsp;  "kind": "WindTurbine",  
&emsp;&emsp;&emsp;&emsp;  "x": 3,  
&emsp;&emsp;&emsp;&emsp;  "y":1  
&emsp;&emsp;},  {   
&emsp;&emsp;&emsp;&emsp;  "kind": "WindTurbine",  
&emsp;&emsp;&emsp;&emsp;  "x": 5,  
&emsp;&emsp;&emsp;&emsp;  "y":2  
&emsp;&emsp;},  ...],    
&emsp;&emsp;}  
    &emsp;&emsp;"nextMoves" : [{  
&emsp;&emsp;&emsp;&emsp;  "action": "placeBlock",    
&emsp;&emsp;&emsp;&emsp;  "kind": "WindTurbine",  
&emsp;&emsp;&emsp;&emsp;  "x": 3,  
&emsp;&emsp;&emsp;&emsp;  "y":1  
&emsp;&emsp;}] ,   
    &emsp;&emsp;"pastMoves" : [{  
&emsp;&emsp;&emsp;&emsp;  "action": "addBlock",       
&emsp;&emsp;&emsp;&emsp;  "kind": "Fountain",    
&emsp;&emsp;&emsp;&emsp;  "x": 5,    
&emsp;&emsp;&emsp;&emsp;  "y":2    
&emsp;&emsp;}]    
    } 
  
