import { State } from '../helper'
import { IssueItem } from './IssueItem'

export const IssueList = ({ issueList = [], onStateChange, currentState }) => {

  console.log('currentState xx', currentState)

	return (
		<>
			{/* Botones de All, Open, Closed */}
			<div className='flex gap-4'>
				<button
					onClick={() => onStateChange(State.All)}
					type='button'
					className={`btn ${currentState === State.All ? 'active' : ''}`}>
					All
				</button>
				<button
					onClick={() => onStateChange(State.Open)}
					type='button'
					className={`btn ${currentState === State.Open ? 'active' : ''}`}>
					Open
				</button>
				<button
					onClick={() => onStateChange(State.Closed)}
					type='button'
					className={`btn ${currentState === State.Closed ? 'active' : ''}`}>
					Closed
				</button>
			</div>

			{/* Lista de issues */}
			<div className='mt-4'>
				{issueList.map((issue) => (
					<IssueItem
						issue={issue}
						key={issue.id}
					/>
				))}
			</div>
		</>
	)
}
