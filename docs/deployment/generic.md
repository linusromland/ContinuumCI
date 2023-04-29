# Setting up ContinuumCI Deployment

This guide will walk you through the necessary steps to set up ContinuumCI deployment. With this setup, you should be able to create your own pipeline file for any CI/CD provider.

Before you begin, make sure that you have followed the first step of the [Getting Started](./README.md) guide.
Now you should have the API URL and CD token for your project. These should be stored as environment variables in your CI/CD provider.

## Creating the pipeline file

The pipeline file will define the steps that your CI/CD provider will take when deploying your project.

In the examples for GitHub and GitLab i check the following:

-   If the CONTINUUMCI_API and TOKEN environment variables are set
-   If the API URL is valid and that the API is reachable by calling the `$CONTINUUMCI_API/health` endpoint
-   If both of the above pass, you could then call the `$CONTINUUMCI_API/projects/cdDeploy/$TOKEN` endpoint with the CD token to deploy your project. This will return a JSON object with the status of the deployment.

The response will look something like this:

```json
{
	"status": "success",
	"message": "Deployment successful",
	"data": [LOGS]
}
```

This is the basic steps you need to take to deploy your project to ContinuumCI from your CI/CD provider. You should be able to create your own pipeline file for any CI/CD provider.
