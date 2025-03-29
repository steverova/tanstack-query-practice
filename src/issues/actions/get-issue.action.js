import { githubApi } from '../../api/github.api'

export const getIssue = async (issueNumber) => {
	const resp = await githubApi.get(`/issues/${issueNumber}`)
	return resp.data
}
