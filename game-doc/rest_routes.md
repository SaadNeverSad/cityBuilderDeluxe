## GetAvailableMaps  
  
**Verbe :** GET  
**URI :** game/map/availableMaps   
**Donnée sortie :** {  
&emsp;    "availableMaps" :[{"name" :"randomMap"},  
&emsp;&emsp;&emsp;                        {"name" : "map2"},  
&emsp;&emsp;&emsp;                        {"name" : "map3"}]  
}  
  
## GetMap  
  
**Verbe :** GET  
**URI :** game/map/{name}  
**Donnée entrée :** {name}=randomMap (for example)  
**Donnée sortie :** {  
&emsp; "type" : "Map",  
&emsp;    "name" : "randomMap",  
&emsp;    "tiles" :[]      
}   
  
## GetBestScores  
  
**Verbe :** GET  
**URI :** game/scoreBoard/map/{name}  
**Donnée entrée :**  {name} = map3 (for example)  
**Donnée sortie :** [{  
&emsp;&emsp;        "score" : 500,    
&emsp;&emsp;        "playerName" : "player2"        
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 400,    
&emsp;&emsp;        "playerName" : "player1"        
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 300,    
&emsp;&emsp;        "playerName" : "player3"        
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 200,    
&emsp;&emsp;        "playerName" : "player9"        
&emsp;    },  
&emsp;    {
&emsp;&emsp;        "score" : 100,  
&emsp;&emsp;        "playerName" : "player12"          
}]  

## addScore  

**Verbe :** POST  
**URI :** game/map/{name_map}/score  
**Donnée entrée :**  {  
    &emsp;&emsp;"score" : 100 ,   
    &emsp;&emsp;"playerName" : "player6"   
    }  
**Donnée sortie :** {   
&emsp;&emsp;    "type" : "Score",  
    &emsp;&emsp; "score" : 100 ,  
    &emsp;&emsp;  "playerName" : "player6"    
 }  
  
