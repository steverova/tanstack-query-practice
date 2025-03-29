import { useNavigate, useParams } from 'react-router'
import { IssueComment } from '../components/IssueComment'
import { FiSkipBack } from 'react-icons/fi'
import useIssue from '../hooks/useIssue'
import Skeleton from '../../shared/Skeleton'

export const IssueView = () => {
	const navigate = useNavigate()
	const params = useParams()
	const issueNumber = Number(params.issueNumber ?? 0)

	const { issueQuery, commentsQuery } = useIssue(issueNumber)

	return (
		<div className='mb-5'>
			<div className='mb-4'>
				<button
					type='button'
					onClick={() => navigate(-1)}
					className=' text-blue-400 flex items-center bg-slate-100 hover:bg-slate-300 rounded-full px-4 py-2 shadow-sm cursor-pointer '>
					<div className='flex flex-row gap-2 items-center '>
						<FiSkipBack />
						<span>Regresar</span>
					</div>
				</button>
			</div>

			{issueQuery.isFetched && (
				<IssueComment
					user={{
						avatar_url: issueQuery.data.user.avatar_url,
						login: issueQuery.data.user.login,
						type: issueQuery.data.user.type
					}}
					body={issueQuery.data.body}
				/>
			)}

			<hr class='border-gray-800 dark:border-white my-4' />

			{commentsQuery.isLoading && (
				<Skeleton
					columns={1}
					rows={1}
					isRounded
					height='h-96'
				/>
			)}

			{commentsQuery.isFetched &&
				commentsQuery.data.map((comment) => (
					<IssueComment
						user={{
							avatar_url: comment.user.avatar_url,
							login: comment.user.login,
							type: comment.user.type
						}}
						body={comment.body}
						key={comment.id}
					/>
				))}
		</div>
	)
}
