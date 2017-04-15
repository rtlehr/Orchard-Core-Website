# How to use webDev-html

### Environment philosophy

When I develop a new site/application I like to break things up into understandable files.  I separate out all the JS classes into one file each and the different CSS media-queries into there own separate files. this environment is created to allow that and to then compile all the JS files and CSS files into 1 file each to require as few calls to the server as possible.

This is, by no means, the way **IT SHOULD BE DONE** this is how I work, and only one of about a million ways to set up a development environment.

### Structure and explanation 

#### _development
 - **css**
   - **libs**
     - **layout.less** - LESS mixin to create columns for layout(LESS unequalColumns, LESS equalColumns at http://codepen.io/rtlehr/)
     - **lesshat.less** - Set of LESS mixins to help create advanced CSS (http://lesshat.madebysource.com)
     - **mixins.less** - Set of LESS mixins to help create advanced CSS
     - **standard-css.less** - Set of CSS resets and common CSS styles
     - **styleGuide.less** - Set up the site colors, fonts and any other common styles in the site
   - **module-mediaQueries** - There are 3 media breaks, desktop, tablet, mobile
     - **desktop.less** - CSS for the desktop queries
     - **mobile.less** - CSS for the mobile queries
     - **tablet.less** - CSS for the tablet queries
   - **application.less** - the LESS that uses the files in the module-mediaQueries to create the site CSS (this uses a mobile first philosophy)
|
 - **js** - all the JS files in here get combined into a single "application.js" file the site uses
   - **application.js** - the site initial JS class

#### _production
- **assets** - All the items needed to display and run the site are stored in here
  - **css** - All the CSS from _development is compiled into here.
    - **frameworks** - CSS frameworks such as, jQuery UI are stored here
    - **images** - images used by jQuery UI
    - **application.css** - All the LESS and CSS in *_development/css* are compiled here
    - **application.min.css** - A minified version of application.css
  - **data** - JSON and XML files
  - **images** - Site images and graphics
  - **js** - All the JS files for the site 
    - **frameworks** - JS frameworks, such as jQuery, jQuery UI
    - **application.js** - All the JS from *_development/js* are compiled here
    - **application.min.js** - A minified version of application.js
- **index.html** - default page for the site
- **index-uiTheme.html** - jQuery UI theme page 

**.gitignore** - Tells GIT what files to NOT track.  (node_modules do not get tracked)

**bs-config.js** - node.js lite-server config file.  auto loads *_production/index.html*

**GrunFile.js** - instructions for grunt.js

**package.json** - downloads all the npm and grunt tools to run the enviroment

**README.md** - this readme

### Installation and Set-up

#### Installation (You only need to do this if the items are not already installed)

You need to install some tools before you can run the environment.

install Node.js (https://nodejs.org/en/)

install Gruntjs (https://gruntjs.com/getting-started)

install GIT (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Download or Fork this repository from Github (https://github.com/rtlehr)

#### Set-up

Open a terminal and navigate to the root of the environment and install all the utilities needed to run the environment (*package.json* is used to download the utilities).

To begin the download type, this will create a *node_modules* folder that holds all the **node.js** files

```sh
npm install
```

on a MAC you may need 

```sh
sudo npm install
```

once the downloading is complete run the environment by typing

```sh
npm start
```

A browser window should open with the *_production/index.html* page loaded.

#### What to expect when it's running

The environment will compile (using Gruntjs *watch* tool) everytime you edit somthing in the *_development* folder.  After everything is finished compliling the web page will reload in the browser window.

The page will reload when the *index.html* gets changed.

#### To stop Gruntjs

```sh
ctrl + c
```

## Using webDev-html to create web sites

This explains how to use the site to create other sites.  It assums you have forked, or created your own GIT repository with the environment. 

Be sure you are on the master branch and it is up to date.

```sh
git checkout master
```

Create, and checkout, a branch with the site name (siteName = the unique (to this repository) name of the site you are creating)

```sh
git checkout -b siteName
```

#### Create a branch for edits to the new site

```sh
git checkout -b siteName/branchName siteName
```

#### After edits complete merge the branch into the new site

```sh
git checkout siteName

git merge --no-ff siteName/branchName
```

### Edit webDev-html and add those changes to the downstream sites
If you need to make an edit to the core webDev-html that needs pushed to all the downstream sites

#### Create the edit to the webDev-html

Create, and Checkout the webDev-html branch (NEVER edit on the master branch)

*NOTE:* You only have to create the branch the first time you edit the core.  If the branch already exists, drop the "-b" from the command below.

```sh
git checkout -b webDev-html
```

Create, and checkout a subBranch to do the edits

```sh
git checkout -b webDev-html/branchName webDev-html
```

After edits are complete, merge the changes into webDev-html branch

```sh
git checkout webDev-html
 
git merge --no-ff webDev-html/branchName
```
Delete the subBranch if it is not needed

```sh
git branch -D webDev-html/branchName 
```

Merge the webDev-html into the master

```sh
git checkout master

git merge --no-ff webDev-html
```

#### Push the edits to the sites

checkout the site and be sure it is up to date

```sh
git checkout siteName
```

add the edits from the master to the site

```sh
git rebase master
```

#### If a branch in the site needs the rebase

checkout the site and be sure it is up to date

```sh
git checkout siteName/branchName
```

add the edits from the master to the site

```sh
git rebase siteName
```

push changes to GitHub

```sh
git push origin
```