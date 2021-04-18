# Timed Goals VSCode Extension

# What is Timed Goals?

Timed Goals is a VSCode extension that makes it easy for you to keep track of all that you need to do in your software projects.  Set timed reminders and helpful todos, all without leaving your favorite editor. 

## Inspiration

Look: coding is hard, and coding under time pressure is even harder. When you're juggling 50 things that all need to get done before you know whether or not _anything_ you've written so far actually works, you begin to understand the importance of scheduling and organization. Timed-Goals, a VSCode extension that makes it easy to set up reminders and todos from _within_ your favorite text editor, hopes to make the life of your average developer just _that_ much easier. Inspired by the Pomodoro time management technique, Timed-Goals is the VSCode extension every productive developer needs. Just name your goal and set a time to finish it by, and Timed-Goals will keep track of it. With timed reminders and named todos, Timed-Goals makes sure that you'll never feel lost in development again.

## How we built it
We built this VSCode extension using Npm, ReactJS, and the VSCode API.
* React: We used ReactJS for the front-end webview where the user is able to see all of their todos and fill out a form to create another todo. We also used Redux to augment it, which was a technology that was very new to us but very fitting for this project.
* JavaScript / VSCode API: We used vanilla Javascript and the VSCode API to build out the backend of this extension. After a user made a change on the front-end, we stored and persisted state data and the list of tasks remaining inside of our VSCode extension.
* NPM: NPM was our package manager for this project. It kept our dependencies, external packages, and modules organized and usable throughout development.

## What we learned
* Everyone on our team received a venerable crash-course in the ins and outs of VSCode extension development. No one on our team had ever worked on VSCode extensions before, and challenging ourselves to create something useful with this new technology in under 24 hours forced us to learn as much as we could as quickly as we could. We learned how to launch webviews, create commands accessible via the VSCode command palette, and how to publish an extension to the VSCode marketplace. We also learned how to more effectively manage state with Redux, and how to create UIs in an environment besides a web app.

## Challenges we ran into

* Working with a new framework or language always comes with its challenges. For our team, this meant spending hours researching the VSCode and ReactJS documentation looking for the solutions to the innumerable errors we received while developing this project. VSCode could only accept html, and our difficulties in accessing files through VSCode's built in methods meant that we had to copy-paste the html into the actual vscode scripts. This then made it very difficult to compile all of the complex react and redux modules, and it was very hard to integrate the communication between front and backend in. Luckily, once we figured out the communication, it was a breeze, as Redux actions allowed for clean manipulation of state.

* Figuring out how to make our VSCode commands accessible via the command palette proved a challenge at the beginning of our work on this project. Eventually, we realized that we have to make changes in multiple files (extension.js and package.js) in order to ensure that VSCode had enough information to create a command that worked to our specification.

* As it always is, the UI was finicky, and it proved difficult to access the necessary assets through the VSCode API. Syncing the component states and the global states also proved difficult, as it was our first time using Redux and dealing with its strict rules about immutability and such. Although we had dreams for a grand, clean UI, we settled with a decent, functional one due to the time-consuming challenges we faced here.

* Synchronizing our project via Git and GitHub was a challenge as we worked through this project. At first it was difficult for us to keep track of all the commits and branches we were creating, and it soon became clear that an organized system for committing and pushing changes was needed. We settled on creating new branches for new changes, and merging to master when we felt our branch had made significant progress.


## Accomplishments that we're proud of

* This is the first time any of us have worked on a VSCode extension, so getting as far as we did was a great surprise, as well as an invaluable lesson in persistence and the strength of a good team. At the beginning of this hackathon, we somewhat doubted we would succeed, since we were using so many new technologies (probably a terrible idea for a timed coding event). While things started off well, late in the night we kept finding ourselves stuck and thought our project was hopeless. Then, the seemingly impossible roadblocks were solved and we ended up with all of the functionality that we wanted. It was incredibly tough, but we are happy to say we persisted.

* We're proud of our division of labor and how everyone on our team found a way to contribute and add to the final project. Everyone on our team had a part to play, and we came together, with all our Readme contributions and git-commits, to create something that none of us had ever done before. We're proud to have worked on something that we truly feel has a use in the developer community, and hope you have as much fun using our extension as we had making it.


## What's next for Timed Goals
* This was our team's first time working with VSCode extensions and our first time working together! Now, empowered with the knowledge of how to build VSCode extensions, you can expect that each of us will takes this experience in spades and use what we've learned to build more (and better) extensions in the future. Rest assured, you haven't heard the last of team Timed-Goals!

* We made this plug in with the intention that it would be incredibly simple but crazily useful, so we don't intend to abandon it at the end of the hackathon. We intend to work on the UI, add more functionality and customizability, and maybe even use OAuth to make this goals cloud-based instead of local. Despite only working on this for a day, we think this app will help programmers a lot, and we intend to improve it so that it can be a valuable tool in their toolset.

## Built With
Javascript, Node.js, React, NPM

## Try it out
* [GitHub Repo](https://github.com/chenmasterandrew/timed-goals)
* [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=chenmasterandrew.timedgoals)



----------------------------------------------------------------------------------------------------------
