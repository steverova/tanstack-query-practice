import axios from 'axios'
import { LIMITATION_SECRET } from '../env'

const baseURL = 'https://api.github.com/repos/facebook/react/'

export const githubApi = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${process.env.LIMITATION_SECRET}`
	}
})
