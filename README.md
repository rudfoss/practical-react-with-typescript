<h1>Practical React with TypeScript</h1>

👋 Welcome to the repository for the workshop [Practical React with TypeScript](https://www.bouvet.no/kurs/kategorier/utvikling-for-web-og-mobil/workshop-praktisk-react-med-typescript)!

> [!IMPORTANT]
> Please install and verify all prerequisites before the first day of the course. You can find the list [below](#prerequisites).

> [!NOTE]
> Got questions that weren't answered or that you thought of after the course ended? Feel free to ask in the [Discussion section](https://github.com/rudfoss/practical-react-with-typescript/discussions/categories/q-a).

- [Prerequisites](#prerequisites)
  - [Required](#required)
  - [Setting up your development environment](#setting-up-your-development-environment)
  - [Running the applications](#running-the-applications)
- [VSCode](#vscode)
  - [VSCode Extensions](#vscode-extensions)
  - [Hidden files](#hidden-files)
  - [Generating API clients](#generating-api-clients)

> [!TIP]
> A branch will be created for the specific course named `courses/[date]`. The date is the month the course started in e.g.: `courses/202412`. After the course you can go back to that branch and see each commit that was performed as well as find the full slide deck.

## Prerequisites

In this course we will be working with an [integrated Nx](https://nx.dev/)-managed [monorepo](https://monorepo.tools/). This setup requires a few things to be installed on your machine in order to work. The code and project will work fine on Windows, Linux or Mac, but please install the following before you proceed with [setting up your environment](#setting-up-your-environment).

### Required

| What                                                         | Why                                                                    | Verify                             |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------------------- |
| [Git](https://git-scm.com/downloads)                         | Version Control for the source code                                    | `git --version`                    |
| [NodeJs LTS](https://nodejs.org/en/download/package-manager) | Runtime for dev environment, api, Nx (monorepo) and front-end projects | `node --version` / `npm --version` |
| [.NET SDK LTS](https://dotnet.microsoft.com/en-us/download)  | Used by nswag to generate typescript client code                       | `dotnet --version`                 |

> [!NOTE]
> The course will be using [Visual Studio Code](https://code.visualstudio.com) with [some extensions](#vscode-extensions) and customized settings. You are free to choose any IDE you want, but it is highly recommended that you choose one that [integrates well with Nx](https://nx.dev/core-features/integrate-with-editors). Plugins for the IDE are not strictly required, but it makes working with the project and with nx commands much easier.

### Setting up your development environment

Once you have installed all prerequisites you can clone the repository to your machine using git:

```bash
# Clones the repository into the folder 'practical-react' (feel free to change the name if you want)
git clone https://github.com/rudfoss/practical-react-with-typescript.git practical-react
```

This will clone the main branch to your machine. Open a terminal in the root folder of the workspace and execute the setup command.

```bash
npm run setup
```

If the command fails you might not have installed all the [required prerequisites](#prerequisites) or you may need to restart your terminal for your paths-environment to take effect. Once setup is completed you are ready to run the applications in the workspace.

Once setup is complete you should also be able to run the full suite of tests without failures. From a terminal in the root workspace folder run:

```bash
npm test
```

If the tests fail verify that you have all the required prerequisites installed correctly.

> [!NOTE]
> Why are we not using the latest version of NX? At the time of the last course (December 2024) Nx v20 still had [quite a few outstanding bugs](https://github.com/nrwl/nx/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22type%3A%20bug%22). The React generator was also not compatible yet. We are sticking with v19 until most of these issues are resolved.

### Running the applications

The React application is bundled using Vite and started using the Nx task runner. Vite provides a live development environment that reloads modules when they are changed. To run the environment using Nx you can "run the target" `serve` for the project `userdb-app` like this:

```bash
npx nx run userdb-app:serve
```

You should be able to open your browser to [http://localhost:4010](http://localhost:4010) and see this:

![React application works](docs/react-application-works.png)

There are many ways to run these targets:

1. You can use the terminal directly by typing `npx nx run [project]:[target]`
2. You can use the VSCode extension:

   ![Nx targets in VScode extension](docs/nx-targets-vscode.png)

3. You can use the command palette: `F1` -> `Nx run`

   ![Find Nx targets in command palette](docs/nx-targets-command-palette.png)
   ![Pick the project to run](docs/nx-projects-command-palette.png)
   ![Pick the target for that project](docs/nx-userdb-project-targets.png)

## VSCode

This repository has a few things pre-configured for [VSCode](https://code.visualstudio.com) which is why that IDE is recommended. This includes certain settings as well as a few recommended extensions. The first time you open this repository in VSCode you should be prompted to install them. If you missed the prompt you can open the `Extensions` panel and enter the search text `@recommended`. There's a button next to the "recommended" section that will install all of them at once.

### VSCode Extensions

Below is a list of all recommended extensions and what they do:

| Extension                                                                                     | Description                                                                               |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Auto Comment Blocks](vscode:extension/kevinkyang.auto-comment-blocks)                        | Helps when documenting your JS/TS code.                                                   |
| [Code Spell Checker](vscode:extension/streetsidesoftware.code-spell-checker)                  | Spell checker for code and documentation.                                                 |
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

If you are using VSCode you might notice that there are quite a few files in the repository that are not visible inside the editor. This is because there is a setting in this repository that hides rarely used files.

Inside the `.vscode` folder you'll find [`settings.json`](./.vscode/settings.json). In there is a setting called `files.exclude` which contains several file patterns that should be hidden. If you installed the `Peek Hidden Files` extension you can toggle these files by right-clicking in the explorer panel and selecting "Toggle Excluded Files" or by using the command palette `F1` -> `Toggle Excluded Files`.

![Toggle excluded files](docs/toggle-excluded-files.png)

### Generating API clients

The `userdb-api-client` project serves as the target for generated TypeScript clients for the api. The generator uses the npm-version of [nswag](https://github.com/RicoSuter/NSwag) which requires the Dotnet Core 6+ SDK to be installed. Because of this automatic client generation has not been set up and we will not be generating clients as part of the course. If you want to try it yourself you can install the [Dotnet Core SDK](https://dotnet.microsoft.com/en-us/download) and run the `genCode` build target for the `userdb-api-client` to see how it works.
