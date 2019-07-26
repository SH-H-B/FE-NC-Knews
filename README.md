# Northcoders Daily News

This project is a news/articles web application that takes inspiration from site like Reddit.

## Using the Web-App

The link below will direct you to deployed version of the web-app, hosted on Netlify:

```
https://northcoders-daily-news.netlify.com

```

On the web app as a non-logged in user you may view news articles, comments. You may also create an account from the Login page, doing so will grant you access to post like and comment on existing articles as well as posting your own.

As a non-logged in user you could:
View and filter a list of articles, also able to view a single article with its comments.
Register for an account.

As a registered/logged in user as well as above you could:
Post a comment/article,
Delete a your own article/comment
Vote on articles/comments

## Getting Started

Follow these instructions in order to get a copy of the project up and running on your local machine for development and testing purposes.

## Installing

1. First of all fork this project to your own repo.

2. Clone the repo remotely by executing this command:

```
git clone the repo from https://github.com/SH-H-B/FE-NC-Knews
```

3. Change directory to the local repo file.

4. Running the following command will install the dependencies:

```
npm install
```

5. The dependencies are required for development purposes, for convenience they are also listed below:

```
 "@reach/router": "^1.2.1",
    "axios": "^0.18.1",
    "bootstrap": "^4.3.1",
    "jquery": "^3.4.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1",
    "resolve-url-loader": "^3.1.0",
    "sweetalert2": "^8.11.7",

```

## Deployment with Netlify

To deploy your own version of this web application, follow instruction below:

1. Make sure you have forked this project and you have your own repo for it.

2. Create a Netlify Account.

3. Navigate to your projects directory and from the CLI run:

```
npm run build
```

4. Install Netlify's CLI tool and run deploy:

```
npm install netlify-cli -g

netlify deploy
```

5. Next follow the CLI prompts to complete the deployment of your web app.

## Built With

- [Node.js](https://nodejs.org/en/docs/)
- [Netlify](https://www.netlify.com/docs/)
- [Reactjs](https://reactjs.org/docs/getting-started.html)
- [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

## Authors

- **[Shiva Heydaribeni](https://github.com/SH-H-B)** - _Author_

## Links

- https://northcoders-daily-news.netlify.com - Live Deployed Version of Web-App
- https://github.com/SH-H-B/BE2-NC-Knews - Github page for back-end side of project
- https://shiva-knews.herokuapp.com/api - API endpoint
