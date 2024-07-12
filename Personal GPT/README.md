# Personal GPT
This repository is filled with ollama powered projects.  

Each directory is hosting different ollama models.   
For more details on model check Ollama official page https://ollama.com/library  


You can also use other model
Just modify model name on python file GPT.py   
Note: llava model can access internet  

## Requirements:
ollama need to be installed  
anyone of model need to installed(pulled)  
python need to installed(python3.9 recommended) also add python to PATH.  
Python packages -> ollama, flask  


## How to run:
Step 1 : Open command prompt(Windows) or terminal(Linux, macOS) based on your OS  
Step 2 : use command '''ollama serve''' on bash 
Step 3 : you can use python IDE or you can run it on bash itself. It's your choice.  
Step 4(IDE) : Open python GPT.py file on python IDE and run the file on IDE.  
Step 4(bash) : Open terminal and navigate to Directory where you cloned this repository using cd command.  
                    then based on your python version use command '''python3 GPT.py''' or '''python GPT.py'''  
Step 5 : after running the python file. Open any browser and search for http://127.0.0.1:5000  
step 6 : Enjoy offline genAI on your local machine  
Step 7 : To exit stop python file and ollama using control+c on bash

Tips: If you're not going to use this GenAI, I would recommend restarting your PC since it will clear pipelines and caches. 