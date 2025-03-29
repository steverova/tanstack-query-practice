import { useQuery } from '@tanstack/react-query'
import { getIssues } from '../actions/get-issues.action'

const useIssues = ({ state = null, selectedLabel = null }) => {
	const issuesQuery = useQuery({
		queryKey: ['issues', { state, selectedLabel }],
		queryFn: () =>
			getIssues({
				state,
				selectedLabel
			}),
		staleTime: 1000 * 60 * 60 // 1 hour
	})

	return { issuesQuery }
}
export default useIssues
