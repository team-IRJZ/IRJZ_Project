# Using Git and Github

An important part of a software development project is for the team to have a source control process. This helps ensure that any new changes to the code won't break what is already working, and that if something breaks, the code can be reverted to a previous state. The following is a simple workflow with Git and Github that should work for this project. The steps might be a little strange at first, but after going through them a few times it will feel more automatic. If there are any questions or if something is not working, feel free to message me on Slack.

Note that I'm testing out all of these instructions on a Mac. If you're using Windows and something doesn't seem right, let me know and I can help troubleshoot.

## Installing Git

Open a command-line terminal and check to see if Git is already installed on your machine:
```bash
$ git --version
```

If you get a response, then you're good to go. If not, [any of these instructions will work for a Mac](https://www.atlassian.com/git/tutorials/install-git) and you can [install Git for Windows here](https://git-scm.com/download/win).

## Cloning the repository

All of the code for this project will be stored in this [Github repository](https://github.com/team-IRJZ/IRJZ_Project). To get a local copy of the code on your machine, you'll _clone_ the repository. In your terminal, navigate to the directory where you keep projects and run:
```bash
$ git clone git@github.com:team-IRJZ/IRJZ_Project.git
```

You should see a folder called `IRJZ_Project` with all of the files for the project. `cd` into that folder to start working.

## Working with branches

With Git, you typically have one branch that represents the stable version of the code, then other branches for creating changes (usually called _features_). When a feature is finished and stable, it is then _merged_ into the main branch.

__To check which branch you're on__:
```bash
$ git branch
```

This will list the branches with an asterisk next to your current branch:
```bash
  docs
* main
```

This shows that I am on the `main` branch. In this project `main` is the name of the stable, default branch. 

__To switch (checkout) branches__:
```bash
$ git checkout <NAME OF BRANCH>
```

__To create a new branch:__
```bash
$ git checkout -b <NAME OF BRANCH>
```

Now I can make changes to the code base and keep those changes separate until they're ready to be added to the main branch.

## Making changes

When I add a new file, or make changes to an existing file, I need to first add or _stage_ the change on the branch that I am on. I can check to see changes by checking the status:
```bash
$ git status
```

Right now, I'm on a branch called `docs` and I'm making changes to this current file, so that output looks like this:
```bash
On branch docs
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   docs/using-git-and-github.md
```

This means that my changed to `README.md` are being tracked, but not this current file.

__To add and commit changes__
```bash
$ git add <NAMES OF FILES TO ADD>
```

For this file, if I enter `$ git add docs/using-git-and-github.md`, then those changes are being tracked by the current branch.

When my changes are ready to be reviewed by the team, I need to _commit_ the changes with a commit message:
```bash
$ git commit -m '<COMMIT MESSAGE IN PARENTHESES>'
```

For this file, I'll commit using this command and message `$ git commit -m 'added using git and github document. -jw`. Typically a commit message is a brief phrase with the change. The message will be added to the change logs for the project, so it helps for knowing which changes were added on which commit.

## Pushing code to Github

After my changes are finished and ready to be reviewed by the rest of the team, I'll _push_ the code up to Github.
```bash
$ git push origin <NAME OF MY FEATURE BRANCH>
```

In that command `origin` represents the repository in Github. After running the command, I should see my feature branch in Github when I click the __Branches__ selector.

