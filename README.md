LOCAL TRANSPORTATION COMPANY 'WIKOD' HOME PAGE (using React+Nodejs+Boostrap+MongoDB)

A website for promotional purposes of a typical transportation company on the Polish market(the site has descriptions in Polish). It is designed to represent the company, present services, advantages and strengths. For customers, it has a store where you can place orders for delivery of goods.
The functionality of the online store is basic. It is limited to placing orders for meat and cold cuts with delivery to physical stores. It is possible to view order history and edit user data (including adding new store locations).
To use the online store you need to register. After registering and logging in, you can place orders in the ORDERS tab (includes a sample order in the code!). The user has access to basic functions from the navigation ribbon and from the navigation bar (notifications, settings).

The site consists of two parts: Server(API and DB support) and Client(interactive store).
Server is responsible for presenting company page, using NodeJs + Express + EJS, built with Bootstrap templates.
Server handles API, connects to the local MongoDB database to perform basic CRUD operations and to verify and register users(passport-local).
Client is written in React, using MUI. Handles store pages and connects to server API to update DB.

Many things orginally planned was canceled. My intension was to build working solution for local business but beacuse lack of time I gave up. Page is unfinished. 
Project only for practicing my skills. It's a capstone project (Proof-of-Concept/Proof-of-Skill for me). Solutions used may contain errors - not suitable for commercial use.

/////////////////////////////////////////////////////////////////////////////////////////////////

 HOW TO RUN (Local machine + exampleDB):

    1. Download source code
    2. Install Node.js, MongoDB (Community Server(DB instance) + Compass(DB browser))
    3. cd .\server\ && npm install
    4. cd .\client\ && npm install
    6. Configure MongoDB CS and Compass (localhost:27017) and import exampleDB (copy exampleDB content to .../data/db/)
    7. cd .\client\ && npm start
    8. Open localhost:5000
    9. Login to store with 'login:waldek@wikod.pl', 'password:123123'

/////////////////////////////////////////////////////////////////////////////////////////////////

DISPLAY

Home
![home](https://github.com/MarcinHD/WIKODwebsite/assets/147523216/7e26727a-e93d-421e-82d9-276fdaa6e140)

Orders
![orders](https://github.com/MarcinHD/WIKODwebsite/assets/147523216/536dbc05-c0a8-4eb9-b4b6-b6280b32a801)

Contact
![contact](https://github.com/MarcinHD/WIKODwebsite/assets/147523216/f7a97727-64f1-4e95-9c58-10aba2e2a18d)

Store dashboard
![store-dashboard](https://github.com/MarcinHD/WIKODwebsite/assets/147523216/fb7ad870-e55a-42c2-bd1d-03b923c31247)

Store adding order
![store-order](https://github.com/MarcinHD/WIKODwebsite/assets/147523216/f204fcd3-4b8b-4f63-8ec4-4e3d28918ff8)

