# Setting up ContinuumCI Deployment with GitHub Actions

Before you begin, make sure that you have followed the first step of the [Getting Started](./README.md) guide.

This guide will walk you through with the contiuation of the [Getting Started](./README.md) guide and set it up with GitHub and GitHub Actions.

## Step 1: Add secrets to your GitHub repository

In order for your GitHub Actions workflow to access your ContinuumCI API URL and CD token, you'll need to add them as secrets to your GitHub repository.

To add these secrets, go to your repository on GitHub and click on "Settings". Then, click on "Secrets" and click "New repository secret".

Add two secrets with the names CONTINUUMCI_API and TOKEN, and set their values to your ContinuumCI API URL and CD token, respectively.

![createSecret](images/github/createSecret.png)

## Step 2: Create a GitHub Actions workflow

To set up ContinuumCI deployment with GitHub Actions, you'll need to create a new workflow file in your repository. This workflow file will define the steps that GitHub Actions will take when deploying your project.

Create a new file in the `.github/workflows/` directory of your repository called `continuumci-deploy.yml`. Copy and paste the following code into the file:

```yaml
name: ContinuumCI Deploy

on:
    push:
        branches:
            - master

jobs:
    deploy:
        runs-on: ubuntu-latest
        env:
            CONTINUUMCI_API: ${{ secrets.CONTINUUMCI_API }}
            TOKEN: ${{ secrets.TOKEN }}
        steps:
            - name: Check for required secrets
              run: |
                  if [ -z "${{ secrets.CONTINUUMCI_API }}" ]; then
                    echo "Missing required secret: CONTINUUMCI_API"
                    exit 1
                  fi
                  if [ -z "${{ secrets.TOKEN }}" ]; then
                    echo "Missing required secret: TOKEN"
                    exit 1
                  fi
            - name: Check ContinuumCI API health
              run: |
                  response=$(curl -sSL -w "%{http_code}" -X GET "${{ env.CONTINUUMCI_API }}/health" -o /dev/null)
                  if [ "$response" != "200" ]; then
                    echo "Error: ContinuumCI API is not responding."
                    exit 1
                  else
                    echo "ContinuumCI API is running."
                  fi
              env:
                  CONTINUUMCI_API: ${{ secrets.CONTINUUMCI_API }}
            - name: Call ContinuumCI Deploy API
              run: |
                  response=$(curl -sSL -X GET "${{ env.CONTINUUMCI_API }}/projects/cdDeploy/${{ env.TOKEN }}")
                  success=$(echo "$response" | jq -r '.success')
                  message=$(echo "$response" | jq -r '.message')
                  logs=$(echo "$response" | jq -r '.data[] // empty')

                  if [ "$success" = "true" ]; then
                    if [ -n "$logs" ]; then
                      echo "$logs"
                    fi
                    echo "Deployment successful: $message"
                  else
                    if [ -n "$logs" ]; then
                      echo "$logs"
                    fi
                    echo "Deployment failed: $message"
                    exit 1
                  fi
              env:
                  CONTINUUMCI_API: ${{ secrets.CONTINUUMCI_API }}
                  TOKEN: ${{ secrets.TOKEN }}
                  CI: true
```

This workflow file will define the steps that GitHub Actions will take when deploying your project. It will also define the environment variables that GitHub Actions will use when running these steps.

**Note:** If you are using a different branch as your default branch, you will need to change the value of the branches key in the on section of the workflow file.

![createActionsFile](images/github/createActionsFile.png)

## Step 3: Commit and push your changes

Once you've created your workflow file, commit and push your changes to your repository. This will trigger GitHub Actions to run your workflow and deploy your project to ContinuumCI.

## Step 4: Verify that your project was deployed successfully

Once the file is committed and pushed, you can verify that your project was deployed successfully by checking the job status on GitHub. Just click on the "Actions" tab in your repository and look for the job named "ContinuumCI Deploy".

If the job was successful, you should see a green checkmark next to it. If the job failed, you should see a red X next to it, you can click on the job to see the logs and find out what went wrong.

![jobStatus](images/github/jobStatus.png)
