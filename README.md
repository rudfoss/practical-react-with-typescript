<h1>Practical React with TypeScript</h1>

👋 Welcome to the repository for the workshop [Practical React with TypeScript](https://www.bouvet.no/kurs/kategorier/utvikling-for-web-og-mobil/workshop-praktisk-react-med-typescript)!

> [!TIP]
> A branch will be created for the specific course named `courses/[date]`. The date is the month the course started in e.g.: `courses/202412`. This branch will contain the entire commit history for the course as well as **the slide deck**.

- [Prerequisites](#prerequisites)
	- [Git](#git)
	- [NodeJs LTS](#nodejs-lts)
	- [Pnpm](#pnpm)
- [Cloning the repository](#cloning-the-repository)

## Prerequisites

In this course we will be working with a [Pnpm Workspace](https://pnpm.io/workspaces) and [Nx](https://nx.dev/) managed [monorepo](https://monorepo.tools/). This setup requires a few things to be installed on your machine in order to work properly. The code and project should work fine on Windows, Linux or Mac, but please install the following before the course begins.

Our primary IDE will be [Visual Studio Code](https://code.visualstudio.com) with [several extensions](https://github.com/rudfoss/practical-react-with-typescript/blob/v2025/.vscode/extensions.json) and [customized settings](https://github.com/rudfoss/practical-react-with-typescript/blob/v2025/.vscode/settings.json). You are free to choose any IDE you want, but it is highly recommended that you pick one which [integrates well with Nx](https://nx.dev/core-features/integrate-with-editors). Plugins for the IDE are not strictly required, but it makes working with the project and with nx commands much easier.

> [!IMPORTANT]
> Please install and verify all prerequisites before the first day of the course.

### Git

Git is our version-control system for all source code we write. You do not need to know how to use Git as we will go through the basics during the course.

How to install Git depends on the Operating System you use. Follow the instructions on the [Git Download page](https://git-scm.com/downloads).

Once it is installed you can verify that everything is working by opening a terminal and typing `git --version`. You should see something similar to this (version number may differ):

```bash
$ git --version
git version 2.48.1.windows.1
```

### NodeJs LTS

NodeJs is our primary runtime for tooling, testing and extensions and is required to work with the project. We will use the latest Long-Term Support version of NodeJs as it is the most stable and supported version available.

How to install Node depends on the Operating System you use. Follow the instructions on the [nodejs.org page](https://nodejs.org/en).

Once it is installed you can verify that everything is working by opening a terminal and typing `node --version`. You should see something similar to this (version number may differ):

```bash
$ node --version
v22.14.0
```

### Pnpm

Node comes with a package manager called `npm`, but this course will be using an [optimized](https://pnpm.io/motivation) package manager called [`Pnpm`](https://pnpm.io). From the outside they are very similar and most commands will be familiar to you if you've used `npm` before. We will go through all the commands you need during the course.

How to install Node depends on the Operating System you use. Follow the instructions on the [Pnpm page](https://pnpm.io/installation). It is recommended that you use [Corepack](https://pnpm.io/installation#using-corepack) to install Pnpm as it will automatically use the appropriate tool for the workspace. Corepack can be installed using a few simple commands:

```bash
npm install --global corepack@latest
corepack enable pnpm
```

Once it is installed you can verify that everything is working by opening a terminal and typing `pnpm --version`. You should see something similar to this (version number may differ):

```bash
$ pnpm --version
10.8.1
```

## Cloning the repository

To work with the code we need to [clone](https://git-scm.com/docs/git-clone) the repository to our machine. We will do this at the start of the course, but you can also do this in advance if you want to get a small head start 🚀. To do this open a terminal in the folder where you wish to store the repository and run this command:

```bash
$ git clone https://github.com/rudfoss/practical-react-with-typescript.git prwt
```

The `prwt` argument tells git to create a new folder in the current directory named `prwt` and clone into it. If you leave this out git will create a folder name matching the repository name `practical-react-with-typescript` which is also perfectly fine, but a bit long so it may be useful to shorten it.

Once you have cloned the repository navigate the terminal to the root folder and run the `first-time` script to install dependencies and verify:

```bash
cd prwt # Change this to the folder name you chose to clone into
pnpm run first-time # Install dependencies and verify that tools are installed
```

🌟 You are now ready to start the course 🌟
