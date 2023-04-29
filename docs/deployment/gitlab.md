# Setting up ContinuumCI Deployment with GitLab CI/CD

Before you begin, make sure that you have followed the first step of the [Getting Started](./README.md) guide.

This guide will walk you through with the contiuation of the [Getting Started](./README.md) guide and set it up with GitLab CI/CD.

## Step 1: Add secrets to your GitLab repository

In order for your GitLab CI/CD pipeline to access your ContinuumCI API URL and CD token, you'll need to add them as variables to your GitLab repository.

To add these variables, go to your repository on GitLab and click on "Settings". Then, click on "CI/CD" and click "Variables".

Add two variables with the names CONTINUUMCI_API and TOKEN, and set their values to your ContinuumCI API URL and CD token, respectively.

![createSecret](images/gitlab/createSecret.png)

## Step 2: Create a GitLab CI/CD pipeline

To set up ContinuumCI deployment with GitLab CI/CD, you'll need to create a new pipeline file in your repository. This pipeline file will define the stages that GitLab CI/CD will take when deploying your project.

Create a new file called `.gitlab-ci.yml`. Copy and paste the code from the [example file](../../examples/gitlab-ci.yml).

This pipeline file will define the steps that GitLab CI/CD will take when deploying your project.

**Note:** If you are using a different branch as your default branch, you will need to change the value of `if: '$CI_COMMIT_BRANCH == "master"'` to match your default branch in the pipeline.

![createActionsFile](images/gitlab/createActionsFile.png)

## Step 3: Run the pipeline

Once you've created your pipeline file, commit and push your changes to your repository. This will trigger GitLab CI/CD to run your pipeline and deploy your project to ContinuumCI.

## Step 4: Verify that your project was deployed successfully

Once the file is committed and pushed, you can verify that your project was deployed successfully by checking the job status on GitLab. Just click on the checkmark or X on the latests commit.

If the job was successful, you should see a green checkmark next to it. If the job failed, you should see a red X next to it, you can click on the job to see the logs and find out what went wrong.

![jobStatus](images/gitlab/jobStatus.png)
