# Shadcn/ui Learning Sandbox

A dedicated project for exploring, learning, and implementing components from the **shadcn/ui** component library.

## Table of Contents

- [Overview](#overview)
- [What Is Being Explored?](#what-is-being-explored)
- [Course Modules](#course-modules)
  - [1. Introduction to Core Components](#1-introduction-to-core-components)
  - [2. Advanced Data Visualization with Tables](#2-advanced-data-visualization-with-tables)
  - [3. Comprehensive Form Handling and Validation](#3-comprehensive-form-handling-and-validation)
  - [4. Global Theming and Dark Mode Implementation](#4-global-theming-and-dark-mode-implementation)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Adding shadcn/ui Components](#adding-shadcnui-components)
- [Useful Resources](#useful-resources)
- [License](#license)
- [Author](#author)

## Overview

This repository serves as a practical environment for mastering **shadcn/ui**, a collection of reusable components built with Radix UI and Tailwind CSS. The goal is to understand the component architecture, configuration, theming, and best practices for integrating these components into modern React/Next.js applications.

## What is being explored?

- **Installation and configuration:** Proper setup of shadcn/ui within a project.
- **Component implementation:** Hands-on practice with core components (e.g., Button, Card, Dialog, Form).
- **Theming and customization:** Learning how to adjust colors, styles, and themes using Tailwind CSS and the component configuration.
- **Accessibility (A11Y):** Understanding how Radix UI's foundation ensures accessible and robust components.
- **Forms and State management:** Integrating components like `Form` and `Input` with modern state management libraries.

## Course Modules

This project is structured into several modules focusing on key aspects of modern UI development using shadcn/ui.

### 1. Introduction to Core Components

- **Focus:** Working with a wide array of shadcn/ui components.
- **Key Learning:** Understanding the design philosophy behind the library, its reliance on headless components (Radix UI), and the use of the `npx shadcn-ui@latest add` command.

### 2. Advanced Data Visualization with Tables

- **Focus:** Implementing the TanStack React Table, which is integrated and styled by shadcn/ui.
- **Key Learning:** Leveraging the functionality provided by the TanStack library for complex data handling and expanding the implementation to include flexible, custom search capabilities.

### 3. Comprehensive Form Handling and Validation

- **Focus:** Integrating complex and traditional components within a validated form structure.
- **Key Learning:**
- **Validation:** Utilizing **Zod** for schema definition.
- **State Management:** Implementing **React Hook Form**.
- **Component Types:** Working with standard **Inputs**, **Emails**, **Radios**, **Date pickers**, and **Switches**.

### 4. Global Theming and Dark Mode Implementation

- **Focus:** Learning how to manage application themes dynamically.
- **Key Learning:**
- Implementing **Next Themes** for theme persistence.
- Configuring **Tailwind CSS** for seamless **Dark Mode**.
- Setting up **Theme Providers** for dynamic theme switching.

## Tech Stack

This project utilizes the following technologies:

<p>
  <img src="https://skillicons.dev/icons?i=next" alt="Next.js" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=react" alt="React" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind CSS" width="40" height="40" />
</p>

## Getting Started

To get started, follow these steps:

### Prerequisites

You need to have the following installed:

A source code editor such as [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice.

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

> [!NOTE]
> Clicking on the Node.js badge will take you to the Node.js website, where you can download the installer. It is recommended to use the stable version. When you install Node.js, npm will be installed automatically.

Check your Node.js and npm installation by running:

```bash
node --version
npm --version
```

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/daniel-pompa/shadcn-ui-learning-sandbox
```

2. **Navigate to the project directory:**

```bash
cd shadcn-ui-learning-sandbox
```

3. **Install dependencies:**

```bash
npm install
```

4. **Run the development server:**

```bash
npm run dev
```

> [!NOTE]
> The server will typically run on <http://localhost:3000>, but check the output on your terminal to be sure.

### Adding Shadcn/ui components

To practice adding a new component, use the shadcn/ui CLI:

```bash
npx shadcn-ui@latest add [component-name]
# Example: npx shadcn-ui@latest add button
```

## Useful Resources

- [Shadcn/ui Official Documentation](https://ui.shadcn.com/docs)
- [TanStack Table Documentation](https://tanstack.com/table/v8/docs/introduction)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Schema Validation](https://zod.dev/)
- [Next-Themes](https://github.com/pacocoursey/next-themes)

## License

This project is licensed under the MIT License.

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

> [!NOTE]
> Clicking on the MIT License badge to see the LICENSE file for details.

## Author

This project is maintained and developed by **Daniel Pompa Pareja**.

For any questions or suggestions, feel free to reach out via [email](mailto:daniel.40.pompa@gmail.com).

Enjoy learning and experimenting with Shadcn/ui!

[⬆️ Back to Top](#table-of-contents)
