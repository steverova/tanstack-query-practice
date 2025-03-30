import { useState } from 'react'
import Skeleton from '../../shared/Skeleton'
import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'
import useIssues from '../hooks/useIssues'

export const ListView = () => {
	const [state, setState] = useState('all') // all - open - closed
	const [selectedLabel, setSelectedLabels] = useState([])

	const { issuesQuery, nextPage, previousPage, selectedPage, resetPage } =
		useIssues({
			state,
			selectedLabel
		})

	const issues = issuesQuery.data || []

	const onStateChange = (state) => {
		setState(state)
		resetPage()

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
							<Skeleton
								height='h-[110px]'
								isRounded
							/>
						</div>
					</>
				) : (
					<>
						<IssueList
							issueList={issues}
							onStateChange={onStateChange}
							currentState={state}
						/>
						<div className='flex justify-between items-center gap-4 mt-4 '>
							<div class='inline-flex shadow-2xs bg-blue-600 text-white rounded-full overflow-hidden'>
								{selectedPage > 1 && (
									<button
										className='px-4 py-2 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 border-r border-blue-500'
										onClick={resetPage}
										type='button'>
										Start
									</button>
								)}

								<button
									className='px-4 py-2 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300'
									onClick={previousPage}
									type='button'>
									Prev
								</button>
							</div>

							<span className='border border-blue-600 px-6 rounded-full py-2'>
								{selectedPage}
							</span>
							<button
								className='bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-500'
								onClick={nextPage}
								type='button'>
								Next
							</button>
						</div>
					</>
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
