### iSHU Project
##### Mobile frontend for iSHU app 

#### How to Install 
- git clone https://gitlab.com/bucketzxm/iSHU.git

- npm install

- webpack --config webpack.config.js



#### How to start project

1. ##### Install python virtualenv

	1. install python2.7
	2. install pip for python2.8
	3. sudo pip install virtualenv
2. ##### Install venv for Project
	1. change dir to iSHU/pserver
	2. virtualenv venv
	3. source venv/bin/activate
	4. pip install --upgrade pip
	5. pip install -r requirements.txt

3. ##### Run the Project
	1. cd iSHU/pserver
	2. python manage.py runserver 


#### Than open the browser and request for 127.0.0.1:8000/ishu/index and you will see the home page