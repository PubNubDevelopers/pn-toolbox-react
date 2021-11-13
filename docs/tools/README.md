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
* `ObjectsAdmin/`
* `_AppName_/` - template tool folder; contains all of the tools folders and files needed to create a new tool
  * `routes_AppName_` - contains routes that are included in the base `routes.js` file that dynamically build the left nav
  * `_AppName_Provider` - in order to pass data to your page components, you will need to do so by using a *Context Provider* component; this component will dynamically all of your page components by declaring its path and file name relative to the `tools` folder using the `parent` key in your app's *routes* file
  * `README.md` - use this file to document your tool
  * `pages/` - contains all of your tools pages and other components (you can create custom folders under this folder)
  * `assets/` - contains all of your tools docs assets (like screenshots) that are referenced from your *README.md* file and possibly other *README.md* files if required. You may not need this folder until you add screenshots for your `README.md`.

**NOTE:** If you want your new tool to appear in the left sidebar menu, before you test run your app for the first time, you will need to touch one file that is outside of your tool's parent folder.

1. Open the file, `/src/routes.js`
2. Find the following commented items near the bottom of the file

    ```javascript
    // {divider: true,},
    // routes_AppName_,
    ```

3. Copy paste them to add another set of these at the bottom and leave them for the next tool contributor.
4. Uncomment the other set and replace _AppName_ with your tool's name as you did before.
5. Make sure your tool's *routes* component is imported at the top the same as all the other tools.

The plan is to figure out how to dynamically discover these tool routes files and inject them at build or runtime but this is not a major inconvenience, it just provides an opportunity for merge conflicts but they would be pretty trivial to resolve. If you know how to do this dynamically, please contribute via PR process.

### Summary

You have now completed the *getting started* phase of the tool contribution process. It's time to fire up the React foundry and start bit-smithin' your tool into a work of art. ["Prepare for Ludicrous Speed... Buckle this!!!"](https://bit.ly/3HjfTeL)

Proceed to the following sections for guidance with implementing each portion of your tool. The more you know about how React works, especially [React Hooks](), the smoother and faster this will go for you. Here are some great resources to review:

* [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)
* [A Guide to useState in React](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/)
* [useState in React: A complete guide](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/)
* [5 Things Every React Developer Should Know About State](https://reedbarger.com/what-to-know-about-react-state/)

## Let the Coding Begin

Assuming you have at least a basic grasp of React: Hooks, State, JSX, Functional vs Class Components (and that you will never need a Class component in any new React app you create), let's describe each of the files that you need to implement your custom tool code and the existing Toolbox components that you can leverage.

### The routes_AppName_ File

This routes files serves two purposes:

1. add your tool and pages to the left sidebar menu
2. provide the means for those menu items to load your pages (React Routes & Links)

This is pretty trivial to implement. Just follow the recipe of the template code within.

```javascript
// @mui/icons-material
//////////////////////
// look for icon names here: https://mui.com/components/material-icons/ 
//   and replace "ExtensionIcon" with that icon name
import ExtensionIcon from '@mui/icons-material/Extension';

// tool components
//////////////////
import _AppName_Provider from "./_AppName_Provider.js"
import Page1 from "pages/Page1.js";
import Page2 from "pages/Page2.js";

var routes_AppName_ = {
  collapse: true,
  name: "_App Name_",
  icon: ExtensionIcon,
  iconColor: "Primary",
  state: "_appName_Collapse",
  views: [
    {
      path: "/_topic_/page1",
      name: "Page 1",
      component: Page1,
      parent: _AppName_Provider,
      layout: "/admin",
    },
    {
      path: "/_topic_/page2",
      name: "Page 2",
      component: Page2,
      parent: _AppName_Provider,
      layout: "/admin",
    },
  ]
};

export default routes_AppName_;
```

Uncomment the code (as displayed above), and replace the tokenized elements as documented in the *getting started* section. The *Page* entries are placeholders for the pages you create in your tool. There are some key things to point out in this file.

#### path

The `path` is what you will see in the address bar of the browser when the page menu item is clicked that loads the page. The convention here is to use some *topic* that describes your tool's target feature/purpose in a concise manner (`storage`, `push`, `objects`, `files`). And the page can just be a lowercase version of your page's name using dashes as a delimiter: `foo-bar`, `this-that`.

#### parent

The `parent` key for each page should be your tool's *Provider* component (as a component and not a string name, so you need to import it). This component is a *Context Provider* which is where you can share state across all of your pages. The name of this component will be `_AppName_Provider.js`. If you don't fully understand this concept, think of it as a *singleton* object, if that works for you.

There is a Toolbox scoped *Context Provider*, `KeySetProvider.js`, that makes the initialized key set available for you to leverage in all of your tool's pages and other components. You do not need to do anything except to do "useContext" in your page components which is already included in the page component template file.

If you do need a tool specific *Context Provider* or you are not ready to implement it at this point, then you can use the generic, `ToolboxApp.js`, as your placeholder parent component. This will have zero impact on your tool but you need to provide either this placeholder component or a Context Provider component or your app will not load properly.

#### layout

Just leave this as it is. This is expected to be `/admin` by the components that are building the sidebar menu and loading your page. Any other value will lead to unexpected behavior.

### The Context Provider Component

This component will make your life easier because it will enable you to easily share data across your page components and reload UI fields and execute functions when you reload a page that you navigated away from earlier.

#### What is a Context Provider?

The prerequisite for using this component in your tool is understanding what it is and why you would use it. The alternative is *passing props*. Passing props is just fine for most cases, it just becomes a bit tedious, especially when you have a deep component tree structure (Page1 loads *SubpageFoo* which loads *SubpageBar*, and then *Page2* load *SubpageThis*, then loads *SubpageThat*, and so on). Using a Context Provider allows you to put all of the common properties (aka, state variables and other similar resources) in a single component, and you can just include that component in any other component (your pages, for example) that is in your component structure. There are rules for how this works so getting a base understanding of this is important.

Another benefit of storing a page component's state in the context component is that the state is preserved when you navigate away from that page and then back to it again. This is form of *raising the state* that you may have come across in your React learning path. It's one of those key things you need to know about React if you are to become proficient at reading and writing React code. It's similar to refactoring common functionality to a parent class in object oriented design, but sort of the opposite philosophy because even data/behavior that is specific to a single page may be *raised* in order to preserve it for when you come back to that page, though there are better practices for this that are not implemented (yet) in The Toolbox.

If you understand Context Providers, then you'll know that you need to make it the parent component of all the components that will consume it. If you just wrap your context component around the top level of your component tree, then all the child components inherit that context and can consume it. But in The Toolbox, you do not have to create a parent component for your pages because The Toolbox automatically wraps each of your page components in this context when the page is loaded... dynamically during runtime (sort of). This is why you declare your tool's Context Provider component as the `parent` value in your tool's *routes* file (documented above in case you skipped it).

If you don't need a Context Provider (you will eventually... you'll see) then you can ignore this component (delete it if you like and you can copy/paste from another one or the template file, later) then you must use the `ToolboxApp` component as the `parent` of your pages. It's basically just a *no-op* parent component placeholder that provides no additional benefit to your tool's page components. But a parent (that follows the rules of The Toolbox) is required, so this is your *easy out* until come over to the ways of the Context Provider.

#### The _AppName_Provider File

So you've decided to use the Context Provider in your tool. Awesome! Let's light this fire. Let's start by looking at the default code in this component.

```javascript
import { createContext, useContext, useState } from 'react'

const Context = createContext();

export const _AppName_Provider = ({ children }) => {

  // Page1 state
  const [foo, setFoo] = useState();
  const [bar, setBar] = useState();

  // Page2 state
  const [bing, setBing] = useState();

  // provide data/functions to context users
  //////////////////////////////////////
  const use_AppName_Data = {
    // Page1 State
    foo, setFoo,
    bar, setBar,

    // Page2 State
    bing, setBing,
  }

  return <Context.Provider value={use_AppName_Data}> {children} </Context.Provider>
}

export const use_AppName_Data = () => {
    return useContext(Context)
}
```

##### imports

To implement your Context Provider (context), you'll need to import `createContext` and `useContext`. I'm not going to explain the details of all of this so you will need to research and learn on your own but it's not that complicated. But what about `useState`? That isn't necessarily required for the context, but state is typically what goes in a context and pretty much every component. But there can be other things that get including in here like `useRef`, for example, and much more.

##### createContext

`const Context = createContext();`

Nothing to say about this other then, you need it. It's what literally creates the context that your child page components will use (`useContext` - yes, it's another type of hook);

##### children

`export const _AppName_Provider = ({ children }) => {`

Again, this something that you'll need to learn, but it's required. In short, it's all of the child components that this context will be the parent of so it can pass all of its state and functional goodness onto them and used within them.

##### useState

`const [foo, setFoo] = useState();`

I said state *variables* but as you can see, they are `const`ants. If you are still learning about all this, you might ask, "What good is state if it can't be changed?". But it can... and you will... and it works. Once you understand the "magic trick", it'll all make sense. Another "what's that" question you might have is, "What is `useState` returning to that couple on the left side of the assigment?". Once again, read up on the `useState` hook to get a grasp on all this before you proceed. I'll stop speaking to the absolute React newb from now on... you've been warned ;)

When you create your page components, without this context component, you will include all of your `useState` declarations directly in your page component. Any of that state that needs to be preserved for future page revisits or shared with other page components will need to go in your context. But you might duplicate some (maybe all) of that state in your page for various reasons. As you gain experience with state and contexts, you'll develop your own usage of it or you'll learn how to do it with best practices (Disclaimer: there's no claims of best practices in The Toolbox).

Create state as required for your pages and move it here as needed. Often you will want to preserve the values of your page's UI fields or the results of an API so you can repoplulate them when you come back to the page. See the pages and context of other existing tools for some guidance.

##### use_AppName_Data

```javascript
const use_AppName_Data = {
  // Page1 State
  foo, setFoo,
...
}
```

This is where you declare all of the state (and other things) from above that will be passed to all child pages that might need it (or not). You will notice the `value` key of the next construct that uses this as the value.

##### Context.Provider

`return <Context.Provider value={use_AppName_Data}> {children} </Context.Provider>`

This is what creates the *Context* component (the JSX) which wraps all child (`children`) components so that those children can use this context (via a `useContext` hook). Make sure you use the name `value` for the key or it will break. And make sure you use the name `{children}` or it will break. That's all I got to say about that. Moving on...

##### export

```javascript
export const use_AppName_Data = () => {
    return useContext(Context)
}
```

If you know JavaScript, you know what this is. If you don't, read about it. It's standard *CommonJS* stuff.

#### Context Provider Summary

That's really all there is to a creating a simple context. Even if you don't understand the mechanics at first, you will as you work with it. Just follow the rules above for creating it very strictly and it will all workout just fine. If it doesn't, treat it as a learning opportunity and search the webs for explanations or consult your React mentor.

### Page Components

Now we're onto the real meat of your tool: the page components that actually do stuff. This is where things get a little more complex. Maybe not complex but definitely more involve: UI, state data, functionality and more fun stuff. The stuff included in the page component template (`Page1.js`), is just one example of what you might implement. This template is just code from an actual page component in one of the existing tools. 

You might find it useful to look at all the other tools' pages (at runtime and the code files) and use one that most closely represents what you want to do in your page component, mainly with respect to the UI layout. You can move the JSX components around to make it look the way you need it. Play with the various attributes of those UI components to get the look and feel you are going for. But do try to stay inline with what other pages look like as much as possible.

There are no hard standards on UI layout and they even vary a bit from page to page but they are close enough without getting to bogged down in compliance and standards and branding. The most important thing is to provide a useful tool that make something tedious or hard, faster and easier.

Another option is to visit the *Creative Tim* application template on which this app was built. There are many examples of component UIs that you might like or be inspired by for something you hadn't thought of.

For a live, running example of all the cools stuff this template has to offer, visit the [Creative Time Argon Reach Material UI Pro Dashboard live app](https://demos.creative-tim.com/argon-dashboard-pro-material-ui/?_ga=2.244911813.1385515968.1636776979-1440299092.1631136566#/admin/dashboard).

See the [documentation on the Material UI components](https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar) that are use in this template.

WARNING: Some of the default structure of the template has been modified for the purpose of The Toolbox to simplify things a bit. For example, the origin template included the `<Header>` component in every page component. The Toolbox app removes this header from the page components and puts it one level higher in the pages parent component (`src/components/layouts/Admin.js`). There is no requirement to understand this design but if you're curious, go look at the source code of this file and you will learn a lot about React, though it may take some focus and some time to absorb it all. There could be some other small details that are different but hopefully they won't cause any real issues for you. If they do, say so in the *Issues* of this repo.

Because the page component template has so much content, we will just refer to portions of the template as required, especially around the use of your tool's context and The Toolbox's context, `KeySetProvider`.
