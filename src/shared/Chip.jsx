import { X } from 'lucide-react'

const Chip = ({ label, color, onClick, onRemove }) => {
	const style = {
		backgroundColor: `#${color}20`,
		color: `#${color}`
	}

	return (
		<span
			className='flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold cursor-pointer hover:opacity-80 transition-all mr-2 '
			style={style}
			onClick={onClick}
			onKeyDown={onClick}>
			{label}
			{onRemove && (
				<button
					type='button'
					onClick={(e) => {
						e.stopPropagation()
						onRemove(label)
					}}
					className='text-xs hover:opacity-60 flex items-center justify-center'>
					<span className='bg-white/10 rounded-full px-1 flex items-center justify-center w-5 h-5'>
						<X size={24} />
					</span>
				</button>
			)}
		</span>
	)
}

export default Chip
