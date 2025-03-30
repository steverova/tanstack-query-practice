import { useQuery } from '@tanstack/react-query'
import { getIssues } from '../actions/get-issues.action'
import { useState } from 'react'

const useIssues = ({ state = null, selectedLabel = null }) => {
	const [selectedPage, setSelectedPage] = useState(1)

	const issuesQuery = useQuery({
		queryKey: ['issues', { state, selectedLabel, selectedPage }],
		queryFn: () =>
			getIssues({
				state,
				selectedLabel,
				selectedPage
			}),
		staleTime: 1000 * 60 * 60 // 1 hour
	})

	const nextPage = () => {

		if (issuesQuery.data.length === 0) return

		setSelectedPage((prev) => prev + 1)
	}
	const previousPage = () => {
		if (selectedPage === 1) return
		setSelectedPage((prev) => prev - 1)
	}

	const resetPage = () => {
		if (selectedPage === 1) return
		setSelectedPage(1)
	}

	const setPage = (page) => {
		if (page < 1) return
		setSelectedPage(page)
	}

	return {
		issuesQuery,
		nextPage,
		previousPage,
		resetPage,
		setPage,
		selectedPage
	}
}
export default useIssues
