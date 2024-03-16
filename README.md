
# Social Network 🌐
<img src ="src\imgs\socialnetworkimg.png">


Hi Geeks! I have made a backend application based on a Social Network shop where you can register,login,create posts,follow other users and more things explained below!

## Index 🧾
<details>

<summary> Index 🧾</summary>


- [Technologies ⚙](#technologies-)
- [Installation ⬇](#installation-)
- [Deployment 🚀](#deployment-)
- [Endpoints](#endpoints)
- [Author 🙍‍♂️](#author-)
- [Time of development ⌛](#time-of-development-)

</details>

## Technologies ⚙

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" 
alt="JavaScript" />

<img src="https://img.shields.io/badge/NodeJs-339933?style=for-the-badge&logo=Node.js&logoColor=white" 
alt="Nodejs" />

<img src="https://img.shields.io/badge/Express.js-335933?style=for-the-badge&logo=express&logoColor=white" 
alt="Express" />

<img src="https://img.shields.io/badge/Mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white" 
alt="Mongodb"/>

<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" 
alt="Docker"/>


## Installation ⬇

<details>

<summary>Installation ⬇</summary>


***Enjoy yourself with this project in your local storage executing these commands in your terminal***

**1**

***Clone the repository***
```sh
git clone https://github.com/FRR95/Proyecto-API-Buscador-Backend-II.git
```
**2**

***Install all your dependencies***
```sh
npm install
```


**3**

***Create .env file based on .env.sample variables and add its proper values***

**4**

***Run the server***
```sh
npm run dev
```

**5**

***Create data for the collections***

```sh
npm run run-seeders
```


</details>

## Deployment 🚀

(https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io)

## Endpoints
<details>
<summary>Endpoints</summary>

***Add in your client the following endpoints***
***You can replace the url deployment below with your localhost url***

***AUTH***

- REGISTER A USER

 ```sh
POST https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/auth/register
 ```
***body***

 ```sh
{
   "name":"the-last-name",
   "email":"your-email",
   "password":"your-password"
}
 ```
- LOGIN A USER

 ```sh
POST https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/auth/login
 ```
***body***

 ```sh
{
   "email":"your-email",
   "password_hash":"your-password"
}
 ```
  
***USER***      

- GET A USER

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/users
 ```
***You can filter the searching by their email or first name***
 - GET YOUR USER PROFILE

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/user/profile
 ```

  - UPDATE YOUR USER PROFILE

 ```sh
PUT https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/user/profile
 ```

 ***body***

 ```sh
{
   "email":"your-email"
}
 ```

   - DELETE A USER

 ```sh
DELETE https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/users/:id
 ```

 - UPDATE A USER ROLE

 ```sh
PUT https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/users/:id/role
 ```

  ***body***

 ```sh
{
   "userRole":"role-name"
}
 ```
 - GET POSTS BY USER ID

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/users/posts/:id
 ```
 - FOLLOW AND UNFOLLOW USER

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/users/follow/:id
 ```

***POSTS***

- CREATE A POST

 ```sh
POST https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts
 ```

  ***body***

 ```sh
{
   "title":"your-title"
   "description":"your-description"
}
 ```

 - DELETE A POST

 ```sh
DELETE https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts/:id
 ```
 - UPDATE A POST

 ```sh
PUT https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts/:id
 ```

   ***body***

 ```sh
{
   "title":"your-title"
   "description":"your-description"
}
 ```

  - GET YOUR OWN POSTS

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts/own
 ```
  - GET USERS POSTS

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts
 ```
  - LIKE AND UNLIKE THE POST

 ```sh
PUT https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts/like/:id
 ```

  - GET THE POSTS OF THE USERS YOU ARE FOLLOWING

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts/timeline
 ```
  - GET THE POST BY ID

 ```sh
GET https://proyecto-api-buscador-backend-ii-dev-nqhh.1.ie-1.fl0.io/api/posts/:id
 ```

***🚩CAUTION:In some endpoints you need to be register and or with super_admin privileges showed as auth and isSuperAdmin middleware on the end points***

***header***
```sh
your-token-here
```
</details>



## Author 🙍‍♂️

- **Francisco Rocher Roure** - FullStack Developer
  - [GitHub](https://github.com/FRR95) - [LinkedIn](https://www.linkedin.com/in/franciscorocher/) - [Portfolio](https://franciscorocherdev.com/)



## Time of development ⌛

- One Week