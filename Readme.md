The following project for Credit card fraud detection contains two parts

Fronted running -> (in one seperate command line)
> cd frontend

 open frontend folder in command prompt
 
> npm install

> npm start

backend running -> (in another seperate command line)
in main project where you can see both backend and frontend folder
open cmd (replace python3 with python or vice versa if one of them not works) 
> python3 -m venv backend
or
> python -m venv backend
> cd backend
> Scripts\activate.bat
> pip install -r requirements.txt
> python app.py

--------------------------------
Final steps to run the project
--------------------------------

In windows double-click on the
"run_backend.bat" file to run the python backend
"run_frontend.bat" file to run the React frontend

or

"run_all.bat" file to run both of them

Place the following files inside backend folder
1. feature_columns.pkl
2. fraud_detection_model.pkl
3. label_encoder.pkl
4. scaler.pkl
