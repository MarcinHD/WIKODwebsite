LOCAL TRANSPORTATION COMPANY 'WIKOD' HOME PAGE (using React+Nodejs+Boostrap+MongoDB)

A website for promotional purposes of a typical transportation company on the Polish market(the site has descriptions in Polish). It is designed to represent the company, present services, advantages and strengths. For customers, it has a store where you can place orders for delivery of goods.
The functionality of the online store is basic. It is limited to placing orders for meat and cold cuts with delivery to physical stores. It is possible to view order history and edit user data (including adding new store locations).
To use the online store you need to register. After registering and logging in, you can place orders in the ORDERS tab (includes a sample order in the code!). The user has access to basic functions from the navigation ribbon and from the navigation bar (notifications, settings).

The site consists of two parts Server(API and DB support) and Client(interactive store in React).
Server is responsible for handling the static part of the website presenting the company, written in JavaScript(NodeJs + Express), the site built with Bootstrap.
Server connects to the local MongoDB database to perform basic CRUD operations and to verify and register users(passport-local library).
Client is written in React mainly using MUI library. Client(online store) connects to MongoDB via Server using API.

The project was created for the purpose of testing and practicing my skills. It is a kind of Proof-of-Concept or Proof-of-Skill for me. Solutions used may contain errors - not suitable for commercial use.  

//////////////////////////////////////////////////

 HOW TO RUN (Server + Client):

    need npm node
    npm install -g cli-react
    Download source code
    npm install
    cd .\client\
    npm start
    open localhost:5000

//////////////////////////////////////////////////

DISPLAY
