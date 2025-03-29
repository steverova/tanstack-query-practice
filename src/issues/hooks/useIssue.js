import { useQuery } from '@tanstack/react-query'
import { getIssue } from '../actions/get-issue.action'
import { getIssueComments } from '../actions/get-issue_comments.action'

const useIssue = (issueNumber) => {
	// Check if issueNumber is a number and not a string

	if (typeof issueNumber !== 'number') {
		throw new Error('issueNumber must be a number')
	}
	if (issueNumber < 1) {
		throw new Error('issueNumber must be greater than 0')
	}

	const issueQuery = useQuery({
		queryKey: ['issues', issueNumber],
		queryFn: () => getIssue(issueNumber),
		staleTime: 1000 * 60 * 60 // 1 hour
	})

	const commentsQuery = useQuery({
		queryKey: ['issues', issueNumber, 'comments'],
		queryFn: () => getIssueComments(issueNumber),
		staleTime: 1000 * 60 * 60 // 1 hour
	})

	return { issueQuery, commentsQuery }
}
export default useIssue
