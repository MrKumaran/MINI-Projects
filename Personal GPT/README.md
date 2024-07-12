# Personal GPT

This repository is filled with Ollama-powered projects.

Each directory hosts different Ollama models.  
For more details on the models, check the Ollama official page: [Ollama Library](https://ollama.com/library)

You can also use other models.  
Just modify the model name in the Python file `GPT.py`.  
Note: The llava model can access the internet.

## Requirements:
- Ollama needs to be installed.
- Any one of the models needs to be installed (pulled).
- Python needs to be installed (Python 3.9 recommended). Also, add Python to PATH.
- Python packages: `ollama`, `flask`.

## How to run:
1. Open Command Prompt (Windows) or Terminal (Linux, macOS) based on your OS.
2. Use the command `ollama serve` in the terminal.
3. You can use a Python IDE or run it in the terminal itself. It's your choice.
4. (IDE) Open the Python `GPT.py` file in the Python IDE and run the file in the IDE.
   (Terminal) Open Terminal and navigate to the directory where you cloned this repository using the `cd` command.
   Then, based on your Python version, use the command `python3 GPT.py` or `python GPT.py`.
5. After running the Python file, open any browser and go to `http://127.0.0.1:5000`.
6. Enjoy offline GenAI on your local machine.
7. To exit, stop the Python file and Ollama using `Ctrl+C` in the terminal.