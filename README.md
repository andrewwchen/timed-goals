# Timed Goals VSCode Extension

## Inspiration

Look: coding is hard, and coding under time pressure is even harder. When you're juggling 50 things that all need to get done before you know whether or not _anything_ you've written so far actually works, you begin to understand the importance of scheduling and organization. Timed-Goals, a VSCode extention that makes it easy to set up reminders and todos from _within_ your favorite text editor, hopes to make the life of your average developer just _that_ much easier. With timed reminders and named todos, Timed-Goals makes sure that you'll never feel lost in development again.

## How we built it
We built this VSCode extention using Npm, ReactJS, and the VSCode API.
* React: We used ReactJS for the front-end webview where the user is able to see all of their todos and fill out a form to create another todo.
* JavaScript / VSCode API: We used vanilla Javascript and the VSCode API to build out the backend of this extension. After a user made a change on the front-end, we stored and persisted state data and the list of tasks remaining in the VSCode backend.
* NPM: NPM was our package manager for this project. It kept our dependencies, external packages, and modules organized and usable throughout development.

## What we learned
* Everyone on our team recieved a venerable crash-course in the ins and outs of VSCode extension development. No one on our team had ever worked on VSCode extentions before, and challenging ourselves to create something useful with this new technology in under 24 hours forced us to learn as much as we could as quickly as we could. We learned how to launch webviews, create commands accessible via the VSCode command palate, and how to synchronize our project files with Git and GitHub.


## Challenges we ran into

* Working with a new framework or language always comes with it's challenges. For our team, this meant spending hours researching the VSCode and ReactJS documentation looking for the solutions to the enumerable erros we recieved while developing this project. Specifically, we ran into particular trouble when trying to compile and link our ReactJS webview to our VSCode backend. We eventually found out that there was a way to precompile the React.js code so that it would run _inside of_ our VSCode webview.

* Figuring out how to make our VSCode commands accecssible via the command pallate proved a challenge at the beginning of our work on this project. Eventually, we realized that we have to make changes in multiple files (extension.js and package.js) in order to ensure that VSCode had enough information to create a command that worked to our specification.

* Synchronizing our project via Git and GitHub was a challenge as we worked through this project. At first it was difficult for us to keep track of all the commits and branches we were creating, and it soon became clear that an organized system for committing and pushing changes was needed. We settled on creating new branches for new changes, and merging to master when we felt our branch had made significant progress.


## Accomplishments that we're proud of

* This is the first time any of us have worked on a VSCode extension, so getting as far as we did was a great surprise, as well as an invaluable lesson in persistence and the strength of a good team.

* We're proud of our division of labor and how everyone on our team found way to contribute and add to the final project. Everyone on our team had a part to play, and we came together, with all our Readme contributions and git-commits, to create something that none of us had ever done before. We're proud to have worked on something that we truly feel has a use in the developer community, and hope you have as much fun using our extension as we had making it.


## What's next for Timed Goals


## Built With
Javascript, Node.js, React, NPM

## Try it out
* [GitHub Repo](https://github.com/chenmasterandrew/timed-goals)
* [Visual Studio Marketplace]()



----------------------------------------------------------------------------------------------------------
