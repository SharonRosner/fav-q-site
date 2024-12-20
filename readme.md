# README for FAV-Q

FAV-Q: fetching quotes for you from [FAVQS](https://favqs.com/)

## Intro

This project features both a BE and FE and will provide a neat
project for visualizing the the quotes

This project can act as a nice framework/initial scaffolds for a full blown project,
consisting of FE and BE in 2 separate environment configurations - STG and PROD.

In addition, this project demonstrates throttling to an API with a rate limit,
while being able to abort the bulk of requests if needed.

## Features

*   [x] **Choose number for random quotes**
*   [x] **Choose a Tag** - this will provide the number of quotes for the requested tag and omits randomness 
*   [x] **FE** - React
*   [x] **BE** - NodeJS


## Instructions

*   [Installation](#installation)
    *   [BE](#be)
    *   [FE](#fe)

## Installation

After downloading the repository, please note that root folder represents the BE
while the folder 'fe' represnets the FE - this is in order to allow, in PROD configuration, for the BE to serve the built FE artifacts from 'fe/build'.


### BE

In the root folder please use 'npm install' to install all dependencies.
Then, please be sure to provide the FavQ API key via configuration variable 'FAV_Q_API_KEY' - This can be done in your launch.json file if you are using vscode,
or when running the server from command line - 'FAV_Q_API_KEY=somekey node index.js',
or from task defitions environment variable in an AWS ECS task,
or by changing the variable value in the config file in the preffered environment(please note that staging is the default).

After running the server, it will listen on the default port of 4000(this can be changed with the environment variable 'PORT'). You can request your tags from the BE with a POST request:

http://localhost:4000/api/favQ/getRandomQuotes

Body(json):
{
    "number": somenumber,
    "tag": somestring
}

### FE

In the 'fe' folder please do the same and install dependencies via 'npm install'.
After packages installation you will be able to run the FE for debugging purposes
by running 'npm run start'(from 'fe' folder of course), it will defauly run on PORT 3000
and will issue requsts to BE on localhost:4000(Staging environment)


### Running server and serving an optimized build of FE from BE - PROD

In the 'fe' folder please run the command 'npm run build:prod'. This will create
an optimize build for PROD in the folder 'fe/build'.
Now run the BE server - it will serve the site statically from localhost:4000


## License
[MIT](https://choosealicense.com/licenses/mit/)

## Sources

[favqs API][favqs API] - FavQs API reference

[REACTJS][REACTJS] - ReactJS Official site for documentations and references

[NODEJS][NODEJS] - NodeJS Official site for documentations and references


[//]: # "Source definitions"
[favqs API]: https://favqs.com/api 
[REACTJS]: https://react.dev/
[NODEJS]: https://nodejs.org/en