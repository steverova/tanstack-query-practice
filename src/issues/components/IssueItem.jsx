import { useQueryClient } from '@tanstack/react-query'
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { getIssue } from '../actions/get-issue.action'
import { getIssueComments } from '../actions/get-issue_comments.action'
import TimeSince from '../../shared/TimeElement'

export const IssueItem = ({ issue }) => {
	const navigate = useNavigate()
	const { state, title, comments, number, user, created_at } = issue
	const { avatar_url, login } = user

	const queryClient = useQueryClient()

	const prefetchIssue = () => {
		queryClient.prefetchQuery({
			queryKey: ['issues', issue.number],
			queryFn: () => getIssue(issue.number),
			staleTime: 1000 * 60
		})

		queryClient.prefetchQuery({
			queryKey: ['issues', issue.number, 'comments'],
			queryFn: () => getIssueComments(issue.number),
			staleTime: 1000 * 60
		})
	}

	return (
		<div className='px-2 py-3 mb-5 rounded-md bg-slate-900 hover:bg-slate-800 bg-white/10'>
			<div
				onMouseEnter={prefetchIssue}
				className='animate-fadeIn flex items-center  '>
				{state === 'open' ? (
					<FiCheckCircle
						size={30}
						className='min-w-10'
						color='green'
					/>
				) : (
					<FiInfo
						size={30}
						color='red'
						className='min-w-10'
					/>
				)}

				<div className='flex flex-col flex-grow px-2'>
					<Link onClick={() => navigate(`/issues/issue/${number}`)}>
						<span
							type='button'
							className='hover:underline cursor-pointer'>
							{title}
						</span>
					</Link>

					<span className='text-gray-500 flex flex-row gap-2'>
						#{number} opened by{' '}
						<Link
							target='_blank'
							rel='noopener noreferrer'
							to='https://github.com/kassens'
							className='font-bold'>
							{login}
						</Link>
						<TimeSince date={created_at} /> ago
					</span>
				</div>

				<img
					src={avatar_url}
					alt='User Avatar'
					className='w-8 h-8 rounded-full'
				/>
				<div className='flex flex-col mx-2 items-center'>
					<FiMessageSquare
						size={30}
						className='min-w-5'
						color='gray'
					/>
					<span className='px-4 text-gray-400'>{comments}</span>
				</div>
			</div>

			<div className='w-full flex flex-wrap gap-2'>
				<hr
					className='border border-slate-500 my-1
			 w-full '
				/>
				{issue.labels.map((label) => (
					<span
						key={label.id}
						style={{
							border: `1px solid #${label.color}`
						}}
						className='px-2 py-1 text-xs text-white rounded-full'>
						{label.name}
					</span>
				))}
			</div>
		</div>
	)
}
