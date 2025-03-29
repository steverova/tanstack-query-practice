import { githubApi } from '../../api/github.api'
import { State } from '../helper'

export const getIssues = async ({ state, selectedLabel }) => {
	console.log('getIssues aaaaaaaaa', state)

	const params = new URLSearchParams()
	if (state !== State.All) {
		params.append('state', state)
	}

	if (selectedLabel) {
		params.append('labels', selectedLabel.join(','))
	}

	const resp = await githubApi.get('/issues', { params })
	return resp.data
}
