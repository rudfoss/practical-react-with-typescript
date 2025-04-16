<h1>Practical React with TypeScript</h1>

👋 Welcome to the repository for the workshop [Practical React with TypeScript](https://www.bouvet.no/kurs/kategorier/utvikling-for-web-og-mobil/workshop-praktisk-react-med-typescript)!

- [Prerequisites](#prerequisites)

> [!TIP]
> A branch will be created for the specific course named `courses/[date]`. The date is the month the course started in e.g.: `courses/202412`. After the course you can go back to that branch and see each commit that was performed as well as find the full slide deck.

## Prerequisites

> [!IMPORTANT]
> Please install and verify all prerequisites before the first day of the course.

In this course we will be working with an [integrated Nx](https://nx.dev/)-managed [monorepo](https://monorepo.tools/). This setup requires a few things to be installed on your machine in order to work. The code and project will work fine on Windows, Linux or Mac, but please install the following before you proceed with [setting up your environment](#setting-up-your-environment). You should be able to verify that the installation succeeded by running the verify command from a terminal.

| What                                                         | Why                                                                    | Verify                             |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------------------- |
| [Git](https://git-scm.com/downloads)                         | Version Control for the source code                                    | `git --version`                    |
| [NodeJs LTS](https://nodejs.org/en/download/package-manager) | Runtime for dev environment, api, Nx (monorepo) and front-end projects | `node --version` / `npm --version` |
| [Pnpm](https://pnpm.io)                                      | Faster bundler for npmp packages                                       | `pnpm --version`                   |

> [!NOTE]
> The course will be using [Visual Studio Code](https://code.visualstudio.com) with [several extensions](#vscode) and customized settings that will be demonstrated when used. You are free to choose any IDE you want, but it is highly recommended that you pick one which [integrates well with Nx](https://nx.dev/core-features/integrate-with-editors). Plugins for the IDE are not strictly required, but it makes working with the project and with nx commands much easier.
