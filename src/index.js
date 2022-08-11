const core = require('@actions/core');
const github = require('@actions/github');

const github_token = core.getInput("github-token", { required: true });

async function run() {
    try {
        //get a octokit client
        const octokit = github.getOctokit(github_token, { userAgent: "guguducken/label-size-action" });

        //get github context
        const context = github.context;

        //get pull request num
        const num = context.payload?.pull_request?.number;

        const { data: files } = await octokit.rest.pulls.listFiles(
            {
                ...context.repo,
                pull_number: num,
            }
        );
        core.info(JSON.stringify(files));
    } catch (error) {
        core.setFailed(error.msg);
    }
}