This project is powered by ollama llava:7B or llava:latest. 
official site https://ollama.com/library/llava:7b

You can also use llava:13B or llava:34B
Just modify model name on python file GPT.py 


Requirements:
ollama need to be installed
anyone of model need to installed(pulled) llava:7B, llava:13B or llava:34B for more details see -> https://ollama.com/library/llava:7b
python need to installed(python3.9 recommended) also add python to PATH.
Python packages -> ollama, flask

How to run:
Step 1 : Open command prompt(Windows) or terminal(Linux, macOS) based on your OS
Step 2 : Type command ollama serve on command prompt(Windows) or terminal(Linux, macOS) based on your OS
Step 3 : you can use python IDE or you can run it on terminal itself. It's your choice.
Step 4(IDE) : Open python GPT.py file on python IDE and run the file on IDE.
Step 4(Terminal) : Open terminal and navigate to Directory where you cloned this repository using cd command.
                    then based on your python version use command python3 GPT.py or python GPT.py
Step 5 : after running the python file. Open any browser and search for http://127.0.0.1:5000
step 6 : Enjoy GPT on your local machine
Step 7 : To exit stop python file and ollama using control+c on all OS(terminal)  