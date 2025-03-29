const Skeleton = ({
	rows = 6,
	columns = 1,
	height = 'h-16',
	isRounded = false,
	spacing = 3
}) => {
	const gridItems = []
	for (let i = 0; i < rows * columns; i++) {
		gridItems.push(
			<div
				key={i}
				className={`bg-gray-100/30 ${height} ${isRounded ? 'rounded-lg' : ''} animate-pulse`}
			/>
		)
	}

	return (
		<div
			className={`grid gap-${spacing} border-gray-300`}
			style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
			{gridItems}
		</div>
	)
}

export default Skeleton
