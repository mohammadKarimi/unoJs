# unoJS

A simple way to share problems.

## Table of Contents

1. [Requirements](#1-requirements)
2. [Quick Start](#2-quick-start)

## 1. Requirements

The project needs [Node.js](https://nodejs.org/en/) to be installed on your system. It was tested with version 12
and newer.

## 2. Quick Start

1. Clone the repository into a new folder for your new project.

   ```bash
   git clone git@github.com:mohammadKarimi/unoJs.git my-project
   ```

3. Install needed dependencies

   ```bash
   npm install
   ```

4. Run webpack

   The `dev` command will start a dev server and watch for code changes in JS and SCSS files. Hot reloading is enabled, so
   that any change will be visible in your browser as you type.

   ```bash
   npm run dev
   ```

   For production usage, run the `build` command and everything you need gets packed together into the `public`
   directory. You can upload the content to any hosting provider, without further modifications.

   ```bash
   npm run build
   ```