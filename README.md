# Practical React with TypeScript

👋 Welcome to the repository for the workshop [Practical React with TypeScript](https://www.bouvet.no/kurs/kategorier/utvikling-for-web-og-mobil/workshop-praktisk-react-med-typescript)!

Here you will find the starting project for the course. Once we begin you will also be able to follow the code and samples we create in a separate course branch named for the date of the first course day e.g.: `courses/20240124`.

- [Practical React with TypeScript](#practical-react-with-typescript)
  - [Prerequisites](#prerequisites)
    - [Required](#required)
    - [Recommended](#recommended)
  - [Setting up your environment](#setting-up-your-environment)
  - [VSCode](#vscode)
    - [VSCode Extensions](#vscode-extensions)
    - [Hidden files](#hidden-files)

## Prerequisites

Before you begin there are a few things you need to install on your machine. The code and all required tools should work fine on Windows, Linux and Mac. Please install the following before you proceed with [setting up your environment](#setting-up-your-environment).

### Required

| What                                 | Why                                                               | How                                                                                    | Verify    |
| ------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| [Git](https://git-scm.com/downloads) | Version Control for source code                                   | Windows: `winget install -e --id Git.Git`<br/>Mac: `brew install git`                  | `git -v`  |
| [NodeJs LTS](https://nodejs.org/en)  | Runtime for Nx (monorepo) and front-end projects                  | Windows: `winget install -e --id OpenJS.NodeJS.LTS`<br/>Mac `brew install node`        | `node -v` |
| [pnpm](https://pnpm.io/installation) | Faster and more efficient package manager for Node (replaces npm) | Windows`iwr https://get.pnpm.io/install.ps1 -useb \| iex`<br/>Mac: `brew install pnpm` | `pnpm -v` |

### Recommended

The course will be using Visual Studio Code with some extensions and customized settings. You are free to choose any IDE you want, but it is highly recommended that you choose one that [integrates well with NX](https://nx.dev/core-features/integrate-with-editors). Plugins for the IDE is not strictly required, but it makes working with nx commands much easier.

You can install Visual Studio Code from [their home page](<(https://code.visualstudio.com)>) or using `winget` if you are on Windows:

```ps1
winget install -e --id Microsoft.VisualStudioCode --override '/SILENT /mergetasks="!runcode,addcontextmenufiles,addcontextmenufolders"'
```

## Setting up your environment

Once you have installed all prerequisites you can clone the repository to your machine using git:

```bash
git clone https://github.com/rudfoss/practical-react-with-typescript.git react-workshop # Clones the repository into the folder 'react-workshop' (feel free to change the name if you want)
```

Open a terminal at the root folder of the repository and run the `init` command:

```bash
pnpm run init ## Some scripts can be run using pnpm [script name], but init is already a pnpm command so we need to add 'run' before the script name
```

This command verifies that the required prerequisites are installed correctly and will fail if they cannot be found. If that happens you need to ensure the prerequisites are correctly installed. It then installs the project dependencies for the repository using `pnpm`. To see exactly what the command does open the `package.json` file and find the `script` named `init`.

## VSCode

This repository has a few things pre-configured for VSCode which is why that IDE is recommended. This includes certain settings as well as a few recommended extensions. The first time you open this repository in VSCode you should be prompted to install them. If you missed the promt you can open the `Extensions` panel and search for `@recommended`.

### VSCode Extensions

Below is a list of all recommended extensions and what they do:

| Extension                                                                                     | Description                                                                               |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Auto Comment Blocks](vscode:extension/kevinkyang.auto-comment-blocks)                        | Helps when documenting your JS/TS code.                                                   |
| [EditorConfig for VS Code](vscode:extension/editorconfig.editorconfig)                        | ESupport for some [EditorConfig](https://editorconfig.org/) settings in VSCode.           |
| [ESLint](vscode:extension/dbaeumer.vscode-eslint)                                             | Highlight issues and problems with your code in the editor and can fix many of them.      |
| [Jest Runner](vscode:extension/firsttris.vscode-jest-runner)                                  | Run Jest tests from a separate panel.                                                     |
| [NX Console](vscode:extension/nrwl.angular-console)                                           | Several utilities for working with [NX monorepos](https://nx.dev/getting-started/why-nx). |
| [Peek Hidden Files](vscode:extension/adrianwilczynski.toggle-hidden)                          | Toggles hidden files.                                                                     |
| [Playwright Test for VSCode](vscode:extension/ms-playwright.playwright)                       | Run and debug playwright tests from a separate panel.                                     |
| [Prettier - Code formatter](vscode:extension/esbenp.prettier-vscode)                          | Automatically format code on save.                                                        |
| [TypeScript Barrel Generator](vscode:extension/eliostruyf.vscode-typescript-exportallmodules) | Helps with exporting multiple files in a folder using and `index.ts` barrel-file.         |
| [vscode-icons](vscode:extension/vscode-icons-team.vscode-icons)                               | Icon-pack for the explorer with many additional icons.                                    |
| [vscode-styled-components](vscode:extension/styled-components.vscode-styled-components)       | Syntax highlighting and IntelliSense for styled-components.                               |

### Hidden files

If you are using VSCode you might see that there are quite a few files in the repository that are not visible. This is because there is a setting in this repository that hides rarely used files. Inside the `.vscode` folder you'll find `settings.json`. In there is a setting called `files.exclude` which contains several file patterns that should be hidden. If you installed
