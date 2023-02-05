<div align="center" style="margin-bottom: 50px">

### **_ContinuumCI is in development and not ready for production_**

</div>

<div align="center">
	<div>
		<picture>
			<source media="(prefers-color-scheme: dark)" srcset="docs/logo.svg">
			<source media="(prefers-color-scheme: light)" srcset="docs/logo_dark.svg">
			<img alt="ContinuumCI logo" src="docs/logo_dark.svg" width="100" height="100">
		</picture>
    	<h1>ContinuumCI</h1>
    </div>
    <p>ContinuumCI is a self-hosted continuous deployment tool that makes it easy to automatically deploy code from GitHub. It is built using Nest.JS and React, and is designed to be easy to set up and use.</p>

</div>

## Table of Contents

-   [About ContinuumCI](#about-continuumci)
-   [Setup](#setup)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [License](#license)

## About ContinuumCI

ContinuumCI is a powerful tool for automating the deployment of code from GitHub. It allows you to set up continuous integration and deployment pipelines for your projects, so that changes to your code are automatically built, tested, and deployed to your servers.

With ContinuumCI, you can easily set up multiple environments (e.g. development, staging, production) and deploy different versions of your code to each environment.

ContinuumCI is self-hosted, which means that you can run it on your own servers or a cloud server and have full control over your data and infrastructure.

## Setup

### Prerequisites

To run ContinuumCI, you will need to have the following installed:

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository

```bash
git clone https://github.com/linusromland/ContinuumCI.git
```

2. Go to the project directory

```bash
cd ContinuumCI
```

3. Run the docker-compose command

```bash
docker-compose up -d
```

**Note:** -d is optional, and will run the server in the background. If you don't use it, you will need to keep the terminal open.

This will start the ContinuumCI server and all its dependencies. You can then access the user interface at http://localhost:3000.

## License

ContinuumCI is open source and is released under the MIT license. You can find the full license text here.
