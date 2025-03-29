import { useState } from 'react'
import Skeleton from '../../shared/Skeleton'
import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'
import useIssues from '../hooks/useIssues'

export const ListView = () => {
	const [state, setState] = useState('all') // all - open - closed
	const [selectedLabel, setSelectedLabels] = useState([])

	const { issuesQuery } = useIssues({
		state,
    selectedLabel
	})

	const issues = issuesQuery.data || []

	const onStateChange = (state) => {
		setState(state)
	}

	const onLabelChange = (label) => {
		if (selectedLabel.includes(label)) {
			setSelectedLabels(selectedLabel.filter((l) => l !== label))
		} else {
			setSelectedLabels([...selectedLabel, label])
		}
	}

	const onLabelRemove = (label) => {
		setSelectedLabels(selectedLabel.filter((l) => l !== label))
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-3 mt-5'>
			<div className='col-span-1 sm:col-span-2'>
				{issuesQuery.isLoading ? (
					<>
						<div className='flex flex-col gap-3'>
							<Skeleton
								columns={3}
								rows={1}
								isRounded
							/>
							<Skeleton isRounded />
						</div>
					</>
				) : (
					<IssueList
						issueList={issues}
						onStateChange={onStateChange}
						currentState={state}
					/>
				)}
				{issuesQuery.isError && (
					<p className='text-center'>Error: {issuesQuery.error.message}</p>
				)}
			</div>

			<div className='col-span-1 px-2 mt-12 ms-12'>
				<LabelPicker
					onLabelChange={onLabelChange}
          onLabelRemove={onLabelRemove}
					selectedLabel={selectedLabel}
				/>
			</div>
		</div>
	)
}
