import { githubApi } from '../../api/github.api'
import { State } from '../helper'

export const getIssues = async ({ state, selectedLabel, selectedPage = 1 }) => {


	const params = new URLSearchParams()
	if (state !== State.All) {
		params.append('state', state)
	}

	if (selectedLabel) {
		params.append('labels', selectedLabel.join(','))
	}

	params.append('page', selectedPage.toString())
	params.append('per_page', '5')

	const resp = await githubApi.get('/issues', { params })
	return resp.data
}
