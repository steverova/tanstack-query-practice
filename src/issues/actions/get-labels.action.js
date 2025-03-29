import { githubApi } from '../../api/github.api'

export const getLabels = async () => {
	const resp = await githubApi.get('/labels', {})

	return resp.data
}
