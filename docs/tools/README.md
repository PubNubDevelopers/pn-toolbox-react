# Tools App Template

*The Toolbox* started out as a single tool to facilitate PN mobile push troubleshooting. But it was quickly realized that there were many other useful (probably, more useful) tools that could be implemented, with relative ease, and it only made sense to put them all in one place. And to reduce the friction of creating new tools, we made it pluggable (without getting too fancy about it). 

The pluggable design of *The Toolbox* is very simple and has some less than "best" practices, but this will evolve over time. These tools have been in the "thought process" for too long and making the perfect pluggable architecture was the enemy of good enough (or even pretty freakin' good). And it was designed by someone that learned React in the process of implementing it. Your feedback (via PRs) are welcome, but please be gentle ;)

## Tool Contributor

So, you want to contribute a tool to *The Toolbox*. Well, you have a couple of options:

1. Full React Developer Mode: clone the repo, create your own tool branch, copy/paste the tool template folder and code it.
2. Pick the JavaScript framework of your choice, implement the app with some thought about it being a tool in The Toolbox, and submit it to The Toolbox team.
3. Think of a great idea for a tool that would be a great addition to The Toolbox, and submit it to the The Toolbox team. UI mockups (even a picture of a paper sketch) are much appreciated.

Submitting tool ideas to The Toolbox team will be documented soon. Expect a Google Form link to appear here with more details. The remainder of this documentation is dedicated to option #1: *Full React Developer Mode*. I urge you to go this way even if you are not a React developer, err, especially if you are not a React developer (become one and be one of the cool kids). Get ready for *Ludicrous Speed!* but be careful to not go plaid.

### React Learning Resource

* [Learn React Context in 5 Minutes - A Beginner's Tutorial](https://www.freecodecamp.org/news/react-context-in-5-minutes/)
* [The React Bootcamp](https://reactbootcamp.com/) - costs $249, but this is a comprehensive course and possibly expensable :)

## Getting Started

1. Learn React. Seriously, you need at least a basic understanding of how React works. Maybe this is how you will learn React but be prepared to struggle. I recommend something a bit less complex than this to start but you do you.
2. Clone The Toolbox repo
3. Create a branch for your tool: `git branch mytool`
4. Find the `_AppName_` folder under `src\tools` folder, copy/paste it and rename it with your tool's name: *ThisThatUtil*, or whatever. See the other tools for inspiration.
5. Rename the two files that have `_AppName_` in their name in your new tool folder. Just replace `_AppName_` with the same name of your tool's folder. The contents of these files are completely commented out. You will need to remove the comments when you are ready to start coding.
   1. `_AppName_Provider.js` - even if you don't uncomment the code, replace any occurrences of `_AppName_` with your tools name as you did for the folder and file names. The purpose and what to do within this file will be covered later.
   2. `routes_AppName_.js` - again, replace all the `_AppName_` tokens and leave the code commented until you are ready to do the work in here. Note: the *_topic_* token is the parent path. Use something short and descriptive. See other tools for examples. Maybe if your tool is working with the PubNub Files API, this could be `files`. Is it a *Storage* feature tool, maybe `storage` or `history`. Whatever, just try to keep it simple and it doesn't have to be one word. But if it is two or more words, use dashes: `foo-bar`.

### Folder Structure

`src/tools/` - contains each tools' parent folder

* `PushDebug/`
* `AuthAdmin/`
* `/ObjectsAdmin/`
* `_AppName_/` - template tool folder; contains all of the tools folders and files needed to create a new tool
  * `routes_AppName_` - contains routes that are included in the base `routes.js` file that dynamically build the left nav
  * `_AppName_Provider` - in order to pass data to your page components, you will need to do so by using a *Context Provider* component; this component will dynamically all of your page components by declaring its path and file name relative to the `tools` folder using the `parent` key in your app's *routes* file
  * `README.md` - use this file to document your tool
  * `pages/` - contains all of your tools pages and other components (you can create custom folders under this folder)
  * `assets/` - contains all of your tools docs assets (like screenshots) that are referenced from your *README.md* file and possibly other *README.md* files if required. You may not need this folder until you add screenshots for your `README.md`.

**NOTE:** If you want your new tool to appear in the left sidebar menu, before you test run your app for the first time, you will need to touch one file that is outside of your tool's parent folder.

1. Open the file, `/src/routes`
2. Find the following commented items near the bottom of the file
    `// {divider: true,},`
    `// routes_AppName_,`
3. Copy paste them to add another set of these at the bottom and leave them for the next tool contributor.
4. Uncomment the other set and replace _AppName_ with your tool's name as you did before.
5. Make sure your tool's *routes* component is imported at the top the same as all the other tools.

The plan is to figure out how to dynamically discover these tool routes files and inject them at build or runtime but this is not a major inconvenience, it just provides an opportunity for merge conflicts but they would be pretty trivial to resolve. If you know how to do this dynamically, please contribute via PR process.

### Summary

You have now completed the *getting started* phase of the tool contribution process. It's time to fire up the React foundry and start bit-smithing your tool into a work of art. ["Prepare for Ludicrous Speed... Buckle this!!!"](https://bit.ly/3HjfTeL)

Proceed to the following sections for guidance with implementing each portion of your tool. The more you know about how React works, especially [React Hooks](), the smoother and faster this will go for you. Here are some great resources to review:

* [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)
* [A Guide to useState in React](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/)
* [useState in React: A complete guide](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/)
* [5 Things Every React Developer Should Know About State](https://reedbarger.com/what-to-know-about-react-state/)

## Let the Coding Begin

Assuming you have at least a basic grasp of React: Hooks, State, JSX, Functional vs Class Components (and that you will never need a Class component in any new React app you create), let's describe each of the files that you need to implement your custom tool code and the existing Toolbox components that you can leverage.
