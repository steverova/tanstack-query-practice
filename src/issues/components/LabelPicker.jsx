import Chip from '../../shared/Chip'
import useLabels from '../hooks/useLabels'

export const LabelPicker = ({
	onLabelChange = () => {},
	selectedLabel = [],
	onLabelRemove = () => {}
}) => {
	const { labelsQuery } = useLabels()

	if (!labelsQuery.data) return <p>Cargando etiquetas...</p>

	const labelList = labelsQuery.data.filter(
		(label) => !selectedLabel.includes(label.name)
	)

	return (
		<>
			{selectedLabel.length > 0 && (
				<>
					<p>Seleccionados:</p>
					<div className='flex flex-wrap gap-2 m-4'>
						{selectedLabel.length > 0 ? (
							selectedLabel.map((label) => (
								<Chip
									key={label}
									label={label}
									color={
										labelsQuery.data.find((l) => l.name === label)?.color ||
										'000000'
									}
									onRemove={onLabelRemove}
								/>
							))
						) : (
							<p>Ninguno</p>
						)}
					</div>
				</>
			)}

			<p>Disponibles:</p>
			<div className='flex flex-wrap gap-2 m-4'>
				{labelList.length > 0 ? (
					labelList.map((label) => (
						<Chip
							key={label.id}
							label={label.name}
							color={label.color}
							onClick={() => onLabelChange(label.name)}
						/>
					))
				) : (
					<p>No hay etiquetas disponibles.</p>
				)}
			</div>
		</>
	)
}
