# How to use WebDevMaster

### Create a new site

Be sure you are on the master branch and it is up to date.

```sh
git checkout master
```

Create a branch with the site name

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

### Edit WebDevMaster and add those changes to the sites
If you need to make an edit to the core webDevMaster that needs pushed to all the sites

#### Create the edit to the WebDevMaster

Checkout the WebDevMaster branch (NEVER edit on the master branch)

```sh
git checkout WebDevMaster
```

Create a subBranch to do the edits

```sh
git checkout -b WebDevMaster/branchName WebDevMaster
```

After edits are complete, merge the changes into WebDevMaster branch

```sh
git checkout WebDevMaster
 
git merge --no-ff WebDevMaster/branchName
```
Delete the subBranch if it is not needed

```sh
git branch -D WebDevMaster/branchName 
```

Merge the WebDevMaster into the master

```sh
git checkout master

git merge --no-ff WebDevMaster
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

#### If a branch in a site needs the rebase

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