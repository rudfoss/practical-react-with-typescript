<h1>Practical React with TypeScript</h1>

👋 Welcome to the repository for the workshop [Practical React with TypeScript](https://www.bouvet.no/kurs/kategorier/utvikling-for-web-og-mobil/workshop-praktisk-react-med-typescript)!

❓ Got questions that weren't answered or that you thought of after the course ended? Feel free to ask in the Discussion section or email me at thomas.rudfoss@bouvet.no.

> `ℹ️` **_For course participants:_**<br/>Please install and verify all required prerequisites before the first day of the course. If you want feel free to install the optional ones as well. You can find the list [below](#prerequisites).

**TLDR setup**:

1. Install [required](#required) prerequisites
2. Clone this repository
3. Checkout the course branch for your course `courses/[year-month]` e.g.. `courses/202404` (the branch may not exist until right before the course begins)
4. Run `npm run init` to verify required prerequisites and install dependencies
5. In VSCode `Ctrl+P` -> `task ` -> `start` / in terminal `npm start`
6. Open your browser to [http://localhost:4200](http://localhost:4200) and [http://localhost:4210](http://localhost:4210) and if everything worked you should see "👋 Hello there" and a Swagger UI respectively.
7. You are now ready to start the course 🚀

<h2>Table of content</h2>

- [Prerequisites](#prerequisites)
	- [Required](#required)
	- [Optional](#optional)
	- [Recommended](#recommended)
	- [Setting up your environment](#setting-up-your-environment)
	- [Running the development environment](#running-the-development-environment)
- [VSCode](#vscode)
	- [VSCode Extensions](#vscode-extensions)
	- [Hidden files](#hidden-files)
	- [Generating API clients](#generating-api-clients)

Here you will find the starter-project for the course. Once we begin you will also be able to follow the code and samples we create in a separate course branch named for the date of the first course day e.g.: `courses/20240124`.

## Prerequisites

In this course we will be working with an [integrated Nx](https://nx.dev/)-managed [monorepo](https://monorepo.tools/). This setup requires a few things to be installed on your machine in order to work. The code and project will work fine on Windows, Linux or Mac, but please install the following before you proceed with [setting up your environment](#setting-up-your-environment).

### Required

| What                                 | Why                                                                    | How                                                                              | Verify👀  |
| ------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------- |
| [Git](https://git-scm.com/downloads) | Version Control for source code                                        | Windows: `winget install -e --id Git.Git`<br/>Mac: `brew install git`            | `git -v`  |
| [NodeJs LTS](https://nodejs.org/en)  | Runtime for dev environment, api, Nx (monorepo) and front-end projects | Windows: `winget install -e --id OpenJS.NodeJS.LTS`<br/>Mac: `brew install node` | `node -v` |

### Optional

These dependencies are recommended if you want to use all tools in the repository (such as the genCode targets), but not essential to take the course.

| What                                                      | Why                                              | How                                                                                                                                            | Verify👀           |
| --------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download) | Used by nswag to generate typescript client code | Windows: `winget install -e --id Microsoft.DotNet.SDK.8`<br/>Mac: Check the [website](https://dotnet.microsoft.com/en-us/download) for details | `dotnet --version` |

👀 Run this command in a terminal to verify that the installation worked. If it does not fail the tool has been installed correctly.

### Recommended

The course will be using [Visual Studio Code](https://code.visualstudio.com) with [some extensions](#vscode-extensions) and customized settings. You are free to choose any IDE you want, but it is highly recommended that you choose one that [integrates well with Nx](https://nx.dev/core-features/integrate-with-editors). Plugins for the IDE are not strictly required, but it makes working with the project and with nx commands much easier.

You can install Visual Studio Code from [their home page](https://code.visualstudio.com) or using `winget` if you are on Windows:

```ps1
winget install -e --id Microsoft.VisualStudioCode --override '/VERYSILENT /SP- /MERGETAKS="!runcode,!desktopicon,addcontextmenufiles,addcontextmenufolders,addtopath"'
```

### Setting up your environment

Once you have installed all prerequisites you can clone the repository to your machine using git:

```bash
# Clones the repository into the folder 'react-workshop' (feel free to change the name if you want)
git clone https://github.com/rudfoss/practical-react-with-typescript.git react-workshop
```

The main branch contains all the code that we are going to write as part of the course. Feel free to explore, but when the course starts you should check out the specific branch for that course iteration. It should be named `courses/[year-month]` e.g.: `courses/202404`.

It might be tempting to open your IDE immediately and point it to the folder you just created, but I recommend that you first open a terminal at the root of the repository and run the `init` command. VSCode and other IDEs will try to detect what type of workspace that is currently open and might also automatically set up and configure a few things on their own. These configurations (such as the Nx extension) might depend on packages being installed in the workspace which is why it is usually a good idea to install these dependencies before you start your IDE so that they can be found.

```bash
npm run init
```

This command verifies that the required prerequisites are installed correctly. To see exactly what the command does open the `package.json` file and find the `script` named `init`. If it doesn't work you might have installed the required prerequisites without adding them to the PATH-variable for your environment. If that is the case you can either reinstall them or add them manually, check the documentation for the respective tool. After verification it then installs the project dependencies using `npm install`. When it's done you can open your IDE in the root folder (for VSCode simply type `code .` and hit enter).

### Running the development environment

👀 TLDR: In VSCode: `Ctrl+P` -> `task ` -> `start` / from terminal: `npm start` then open your browser to [http://localhost:4200](http://localhost:4200) and [http://localhost:4210](http://localhost:4210)

The React app we will be building will be bundled (built) with [vite](https://vitejs.dev/). Vite also has a development server that we can run while we code. It will hot-reload pieces of our app as we change it making for a very snappy and efficient development environment.

There are several ways you can start this environment. Personally, I prefer to use Tasks in VSCode as they start in their own tabs under the terminal panel which makes them easier to find and monitor. You can also use Nx or preconfigured npm scripts directly from the terminal.

Some ways to start the react app:

- From a terminal, run: `npm run start:userdb-app`
- From a terminal, run: `npx nx server userdb-app`
- From a terminal, run: `npx nx run userdb-app:serve`
- (Recommended) In VSCode use the shortcut `Ctrl+P`, write `task ` (the space at the end is important) and select the task `start:userdb-app`
- In VSCode use the shortcut `Ctrl+Shift+P`, write `nx run` and hit enter, select `userdb-app` -> `serve` -> Execute.
- From the NX exteions select the `userdb-app` project and run the target `serve`

To work with the server API you also need to start the project `userdb-api`. Simply replace `userdb-app` with `userdb-api` in any of the examples above. Since they are usually started together this project includes some ways to start everything neatly:

- From a terminal, run `npm start`
- (Recommended) In VSCode use the shortcut `Ctrl+P`, write `task ` (the space at the end is important) and select the task `start`

Once the react application is running you can open your browser to [http://localhost:4200](http://localhost:4200) to se the app live. Changes you make in code will be reflected on screen as soon as you save them. If you also started the API you can browse to [http://localhost:4210](http://localhost:4210) as well to see the API documentation

🎊 Happy coding!

## VSCode

This repository has a few things pre-configured for [VSCode](https://code.visualstudio.com) which is why that IDE is recommended. This includes certain settings as well as a few recommended extensions. The first time you open this repository in VSCode you should be prompted to install them. If you missed the prompt you can open the `Extensions` panel and enter the search text `@recommended`. There should also be a button next to the "recommended" section to install all of them at once.

### VSCode Extensions

Below is a list of all recommended extensions and what they do:

| Extension                                                                                     | Description                                                                               |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Auto Comment Blocks](vscode:extension/kevinkyang.auto-comment-blocks)                        | Helps when documenting your JS/TS code.                                                   |
| [EditorConfig for VS Code](vscode:extension/editorconfig.editorconfig)                        | ESupport for some [EditorConfig](https://editorconfig.org/) settings in VSCode.           |
| [ESLint](vscode:extension/dbaeumer.vscode-eslint)                                             | Highlight issues and problems with your code in the editor and can fix many of them.      |
| [Jest Runner](vscode:extension/firsttris.vscode-jest-runner)                                  | Run Jest tests from a separate panel.                                                     |
| [Markdown All in One](vscode:extension/yzhang.markdown-all-in-one)                            | Tools for writing and working with markdown files.                                        |
| [NX Console](vscode:extension/nrwl.angular-console)                                           | Several utilities for working with [NX monorepos](https://nx.dev/getting-started/why-nx). |
| [Peek Hidden Files](vscode:extension/adrianwilczynski.toggle-hidden)                          | Toggles hidden files.                                                                     |
| [Playwright Test for VSCode](vscode:extension/ms-playwright.playwright)                       | Run and debug playwright tests from a separate panel.                                     |
| [Prettier - Code formatter](vscode:extension/esbenp.prettier-vscode)                          | Automatically format code on save.                                                        |
| [TypeScript Barrel Generator](vscode:extension/eliostruyf.vscode-typescript-exportallmodules) | Helps with exporting multiple files in a folder using and `index.ts` barrel-file.         |
| [vscode-icons](vscode:extension/vscode-icons-team.vscode-icons)                               | Icon-pack for the explorer with many additional icons.                                    |
| [vscode-styled-components](vscode:extension/styled-components.vscode-styled-components)       | Syntax highlighting and IntelliSense for styled-components.                               |

### Hidden files

If you are using VSCode you might notice that there are quite a few files in the repository that are not visible inside the editor. This is because there is a setting in this repository that hides rarely used files. Inside the `.vscode` folder you'll find `settings.json`. In there is a setting called `files.exclude` which contains several file patterns that should be hidden. If you installed the `Peek Hidden Files` extension you can toggle these files by right-clicking in the explorer panel and selecting "Toggle Excluded Files" or by using the commmand pallette `Ctrl+Shift+P` -> `Toggle Excluded Files`.

### Generating API clients

The `userdb-api-client` project serves as the target for generated TypeScript clients for the api. The generator uses the npm-version of [nswag](https://github.com/RicoSuter/NSwag) which requires the Dotnet Core 6+ SDK to be installed. Because of this automatic client generation has not been set up and we will not be generating clients as part of the course. If you want to try it yourself you can install the [Dotnet Core SDK](https://dotnet.microsoft.com/en-us/download) and run the `genCode` build target for the `userdb-api-client` to see how it works.
