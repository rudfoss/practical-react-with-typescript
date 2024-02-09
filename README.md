# Practical React with TypeScript

👋 Welcome to the repository for the workshop [Practical React with TypeScript](https://www.bouvet.no/kurs/kategorier/utvikling-for-web-og-mobil/workshop-praktisk-react-med-typescript)!

**TLDR setup**:

1. Install [required](#required) prerequisites
2. Clone this repository
3. Run `pnpm run init`
4. In VSCode `Ctrl+P` -> `task ` -> `start` / in terminal `pnpm start`
5. Open your browser to [http://localhost:4200](http://localhost:4200) and [http://localhost:4210](http://localhost:4210)

<h2>Table of content</h2>

- [Practical React with TypeScript](#practical-react-with-typescript)
  - [Prerequisites](#prerequisites)
    - [Required](#required)
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

| What                                 | Why                                                                    | How                                                                                    | Verify👀  |
| ------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| [Git](https://git-scm.com/downloads) | Version Control for source code                                        | Windows: `winget install -e --id Git.Git`<br/>Mac: `brew install git`                  | `git -v`  |
| [NodeJs LTS](https://nodejs.org/en)  | Runtime for dev environment, api, Nx (monorepo) and front-end projects | Windows: `winget install -e --id OpenJS.NodeJS.LTS`<br/>Mac `brew install node`        | `node -v` |
| [pnpm](https://pnpm.io/installation) | Faster and more efficient package manager for Node (replaces npm)      | Windows`iwr https://get.pnpm.io/install.ps1 -useb \| iex`<br/>Mac: `brew install pnpm` | `pnpm -v` |

👀 Run this command in a terminal to verify that the installation worked. If it does not fail the tool has been installed correctly.

### Recommended

The course will be using [Visual Studio Code](https://code.visualstudio.com) with [some extensions](#vscode-extensions) and customized settings. You are free to choose any IDE you want, but it is highly recommended that you choose one that [integrates well with Nx](https://nx.dev/core-features/integrate-with-editors). Plugins for the IDE are not strictly required, but it makes working with the project and with nx commands much easier.

You can install Visual Studio Code from [their home page](https://code.visualstudio.com) or using `winget` if you are on Windows:

```ps1
winget install -e --id Microsoft.VisualStudioCode --override '/SILENT /mergetasks="!runcode,addcontextmenufiles,addcontextmenufolders"'
```

### Setting up your environment

Once you have installed all prerequisites you can clone the repository to your machine using git:

```bash
# Clones the repository into the folder 'react-workshop' (feel free to change the name if you want)
git clone https://github.com/rudfoss/practical-react-with-typescript.git react-workshop
```

👀 We will be cloning the repository again at the start of the course as there may be change to the repository by that time. You can clone and test the project to verify that everything works.

It might be tempting to open your IDE immediately and point it to the folder you just created, but I recommend that you first open a terminal at the root folder of the repository and run the `init` command:

```bash
 # Some scripts can be run using pnpm [script name], but init is already a pnpm command so we need to add 'run' before the script name
pnpm run init
```

This command verifies that the required prerequisites are installed correctly and will fail if they cannot be found. If that happens you need to ensure the prerequisites are correctly installed. It then installs the project dependencies for the repository using `pnpm`. To see exactly what the command does open the `package.json` file and find the `script` named `init`.

👀 Usually you can just write `pnpm [scriptName]` e.g.: `pnpm start`, but pnpm already has a command called `init` that sets up a new `package.json` file which means we have to add `run` in front of it. You can find all script names that can be run in the [`package.json`](./package.json) file under `scripts`

👀 VSCode and other IDEs will try to detect what type of workspace that is currently open and might also automatically set up and configure a few things on their own. These configurations (such as the Nx extension) might depend on packages being installed in the workspace which is why it is usually a good idea to install these dependencies before you start your IDE so that they can be found.

### Running the development environment

👀 TLDR: In VSCode: `Ctrl+P` -> `task ` -> `start` / from terminal: `pnpm start` then open your browser to [http://localhost:4200](http://localhost:4200) and [http://localhost:4210](http://localhost:4210)

Our react app will be bundled (built) with [vite](https://vitejs.dev/). Vite also has a development server that we can run while we code. It will hot-reload pieces of our app as we change it making for a very snappy and efficient development environment.

There are several ways you can start this environment. Personally, I prefer to use the Tasks in VSCode as they start in their own tabs under the terminal panel which makes them easier to find and monitor, but you can also use Nx or preconfigured pnpm scripts directly from the terminal.

Some ways to start the react app:

- From a terminal, run: `pnpm start:userdb-app`
- From a terminal, run: `pnpm exec nx server userdb-app`
- From a terminal, run: `pnpm exec nx run userdb-app:serve`
- (Recommended) In VSCode use the shortcut `Ctrl+P`, write `task ` (the space at the end is important) and select the task `start:userdb-app`
- In VSCode use the shortcut `Ctrl+Shift+P`, write `nx run` and hit enter, select `userdb-app` -> `serve` -> Execute.
- From the NX exteions select the `userdb-app` project and run the target `serve`

To work with the server API you also need to start `userdb-api`. Simply replace `userdb-app` with `userdb-api` in any of the examples above. Since they are usually started together this project includes some ways to start everything neatly:

- From a terminal, run `pnpm start`
- From a terminal, run `pnpm exec nx run-many --target=serve`
- (Recommended) In VSCode use the shortcut `Ctrl+P`, write `task ` (the space at the end is important) and select the task `start`
- In VSCode use the shortcut `Ctrl+Shift+P`, write `nx run-many` and hit enter, select `serve` -> Execute.

Once the react application is running you can open your browser to [http://localhost:4200](http://localhost:4200) to se the app live. Changes you make in code will be reflected on screen as soon as you save them. If you also started the API you can browse to [http://localhost:4210](http://localhost:4210) as well to see the API documentation

🎊 Happy coding!

## VSCode

This repository has a few things pre-configured for [VSCode](https://code.visualstudio.com) which is why that IDE is recommended. This includes certain settings as well as a few recommended extensions. The first time you open this repository in VSCode you should be prompted to install them. If you missed the promt you can open the `Extensions` panel and search for `@recommended`.

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
