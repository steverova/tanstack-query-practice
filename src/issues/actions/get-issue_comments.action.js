import { githubApi } from '../../api/github.api'

export const getIssueComments = async (issueNumber) => {
	const resp = await githubApi.get(`/issues/${issueNumber}/comments`)
	return resp.data
}
