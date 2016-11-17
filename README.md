# Wine O'Clock

Virtual Wine Cellar Application

https://wine-o-clock.herokuapp.com/

https://wine-o-clock-api.herokuapp.com/ --> https://github.com/klunghamer/wine-o-clock-api (Rails API repo)

## Technologies

- Ruby on Rails
- AngularJS
- AWS S3
- PostgreSQL
- RESTful routing
- wine.com Third Party API
- Express
- Node.js
- Materialize
- jQuery

## Info

User Stories can be found in the 'Issues' tab.

Entity Relationship Diagram 

![alt tag](https://github.com/klunghamer/wine-o-clock-ui/blob/master/ERD.png)

This application allows users to login and manage their own virtual wine cellar and create an inventory of their wine bottles. They can also upload pictures of the wine labels through S3 in AWS.

## Unsolved Problems

 - When the user clicks on the 'Reds' or 'Whites' link in the nav bar, the first category of wine bottles tab is always active. It would be nice to have a way to keep a memory of active tabs, so that the user doesn't have to remember where they left off on either page.
 - Although the wine bottles are organized alphabetically by vineyard, I would make more sense to section them off by letter in order to find bottles more easily.
 - The wine.com API isn't perfect and doesn't contain every vineyard, so if the right vineyard is not found, it can be hard to track were a new bottle was added.
 - The submit buttons for upload pictures and the dropdown navbar are not as reponsive on mobile as they are in the desktop. Sometimes, multiple clicks are needed.
