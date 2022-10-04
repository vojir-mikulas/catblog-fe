# Frontend Developer Exercise

## Introduction

- your task is to implement a simple single-user blogging engine frontend in React or Angular
- you don't have to complete all subtasks, just do what you have the time and skills for
- the goal here is not just to see if you can do an app, but how you do it. So please write it as if it were a big production app, that includes code structure, validations, usage of git, documentation, tests, etc.
- we realize that some subtasks can be very time consuming, if you just don't have the time, you can write short text description of how would you solve the problem
- on the flip side, you can improve on many things, if you have the time. For example, we don't need you to implement user registration, but you are free to do so
- feel free to use this exercise (including the instruction) for evaluation by other companies

## Technologies

### Common

- TypeScript is preferred
- Jest is preferred for unit tests, TestCafe or Cypress for e2e tests
- Sass for styling
- don't worry too much about styling, you can use bootstrap, material or some other library
- Webpack for bundling

### React

- React Router for routing
- Redux, hooks or Apollo Link for state management
- Axios for HTTP requests

### Angular

- NgRx for state management

## The Exercise

- check out the API [here](api.yml)
- check out the WS API [here](ws.json)
- implement the [wireframes](https://www.figma.com/file/VagZOrr3TjTAxGCpCUTSrO/Applifting-|-Full-Stack-Cvičení "[clickable](https://www.figma.com/proto/VagZOrr3TjTAxGCpCUTSrO/Applifting-%7C-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=2%3A3&viewport=148%2C245%2C0.12103988230228424&scaling=min-zoom")

### User Perspective

- Article List [Article List Wireframe](https://www.figma.com/file/VagZOrr3TjTAxGCpCUTSrO/Applifting-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=2%3A3)

    - display a list of all articles, ordered by date descending
    - each article should show title, perex and publication date
    - each article should have a link to the full text

- Article View [Article View Wireframe](https://www.figma.com/file/VagZOrr3TjTAxGCpCUTSrO/Applifting-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=2%3A75)

    - display an article
    - article should be in markdown, take care of proper rendering

- New Article View [New Article View Wireframe](https://www.figma.com/file/VagZOrr3TjTAxGCpCUTSrO/Applifting-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=14%3A2255)

    - display a page with form to add new article
    - the form should take title, perex and content
    - the content should be in markdown, you can use some existing markdown editor
    - add necessary validations
    - this page should be protected by password

- Add Comment functionality
- display comments on Article View page
- each comment should have content, timestamp and author
- add comment form to Article View page
- comment form should take author and content

- Add Comment voting functionality
    - add the ability to vote on comments (+/-)
    - display score on each comment

### Admin Perspective

- Login Screen [Login Screen Wireframe](https://www.figma.com/proto/VagZOrr3TjTAxGCpCUTSrO/Applifting-%7C-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=14%3A2693&scaling=min-zoom)

    - implement login
    - after successful login redirect to next screen
    - on unsuccesful login display error message

- My Article List [My Article List Wireframe](https://www.figma.com/proto/VagZOrr3TjTAxGCpCUTSrO/Applifting-%7C-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=9%3A0&scaling=min-zoom)

    - display table of all articles
    - display a button to create new article
    - implement edit and delete buttons
    - optionally implement article ordering

- Article Detail View [Article Detail Wireframe](https://www.figma.com/proto/VagZOrr3TjTAxGCpCUTSrO/Applifting-%7C-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=14%3A2622&scaling=min-zoom)

    - display editable sections of article
    - implement publish button
    - use some existing Markdown editor, unless you really want to implement your own