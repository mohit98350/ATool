# ATool - An Open Source Anootation Tool

Atool is a free, open source annotation web-based tool, that can be used by anyone to gather a certain set of training data around different problem statements.
This tool could be utilised best by individuals like Data Scienists, Data engineers belonging to major conglomerates, in order to gather a dataset from a vast number of individuals (which could be further used in certain ML/DL algorithms).

## Tech Stack used

- <a href="https://reactjs.org/" target="_blank">React</a>  for frontend App
- <a href="https://redux.js.org/" target="_blank">Redux</a> for state management
- <a href="https://www.mui.com/" target="_blank">Material UI</a> as CSS styling library
- <a href="https://strapi.io/" target="_blank">Strapi</a>  for no code backend platform
- <a href="https://www.sqlite.org/index.html" target="_blank">SQLite</a> as database
- <a href="https://www.auth0.com/" target="_blank">Auth0</a> for authentication management
- High level architecture view



## Guide for local Setup

**1 —** Clone this repository and install the dependencies for ATool web app setup
```bash
git clone https://github.com/mohit98350/ATool.git
yarn install
npm  install
```

**2 —** Install a Strapi backend for the Atool backend setup

In a another folder, run these commands:
```bash
yarn create strapi-app my-project --quickstart
# or
npx create-strapi-app my-project --quickstart
```
Create required database schema using the strapi content managemnt UI


**3 —** Create the Admin user on  : http://localhost:1337/admin/auth/register

**4 —** Configure one or several providers by following the instructions here: https://strapi.io/documentation/v3.x/plugins/users-permissions.html#providers

**5 -** Launch the Atool web app
```bash
REACT_APP_BACKEND_URL=http://localhost:1337 npm start
```
NB: If you use ngrok, use the ngrok url for `REACT_APP_BACKEND_URL` instead of `http://localhost:1337`

## Env vars
| Name | Description | Example |
| - | - | - |
| **REACT_APP_BACKEND_URL** | **Required.** The absolute url of your Strapi app. | `http://localhost:1337` |


## Atool app Few screenshots

<p align="center">
   <img src="./screenshots/2.png" >
&nbsp;
<br />
<br />
   <img src="./screenshots/4.png" >
&nbsp;
   <br />
&nbsp;
   <img src="./screenshots/6.png" >
<br />

</p>

## Atool Future development plan
- Deploy the demo application on cloud
- Access management (proper authorization setup)
- Extend Usability for admin and user 
- Bulk data upload for annotations
- Reporting around projects
