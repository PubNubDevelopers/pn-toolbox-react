# Tools App Template

*The Toolbox* started out as a single tool to facilitate PN mobile push troubleshooting. But it was quickly realized that there were many other useful tools that could be implemented, with relative ease, and it only made sense to put them all in one place. And to reduce the friction of creating new tools, we made it as pluggable. The pluggable design of *The Toolbox* is very simple and has some less than "best" practices, but this will evolve over time. These tools have been in the "thought process" for too long and making the perfect pluggable architecture was the enemy of good enough. And it was designed by someone that learned React in the process of implementing it. Your feedback (via PRs) are welcome, but please be nice ;)

## Folder Structure

`src/apps/` - contains all of the tools home folder

* `PushDebug`
* `AuthAdmin`
* ...

`src/apps/{APP_NAME}` - contains all of the tools files and folders

* `routes{APP_NAME}` - contains routes that are included in the base `routes.js` file that dynamically build the left nav
* `{AppName}Provider` - in order to pass data to your page components, you will need to do so by using a *Context Provider* component; this component will dynamically all of your page components by declaring its path and file name relative to the `apps` folder using the `parent` key in your app's *routes* file
* *README.md* - use this file to document your tool

`src/apps/pages` - contains all of your apps page and other components (you can create custom folders under this folder)

`src/apps/docs` - contains all of your apps docs assets (like screenshots) that are referenced from your *README.md* file

(more to come...)
