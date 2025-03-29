const yup = require('yup')

const labelSchema = yup.object({
	id: yup.number().integer().positive().required(),
	node_id: yup.string().required(),
	url: yup.string().url().required(),
	name: yup.string().required(),
	color: yup
		.string()
		.matches(
			/^[0-9a-fA-F]{6}$/,
			'El color debe ser un código HEX de 6 caracteres'
		)
		.required(),
	default: yup.boolean().required(),
	description: yup.string().nullable()
})

// Clase Label
class Label {
	constructor({
		id,
		node_id,
		url,
		name,
		color,
		default: isDefault,
		description
	}) {
		this.id = id
		this.node_id = node_id
		this.url = url
		this.name = name
		this.color = color
		this.default = isDefault
		this.description = description
	}

	// Método estático para crear uno o varios Labels validados
	static async create(data) {
		if (Array.isArray(data)) {
			// Si es un array, validar cada elemento
			const validatedLabels = await Promise.all(
				data.map((item) => labelSchema.validate(item, { stripUnknown: true }))
			)
			return validatedLabels.map((validLabel) => new Label(validLabel))
		}
		// Si es un solo objeto, validarlo y devolver una instancia
		const validData = await labelSchema.validate(data, { stripUnknown: true })
		return new Label(validData)
	}
}

export default Label
