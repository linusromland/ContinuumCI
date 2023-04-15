// External Dependencies
import axios from 'axios';

export default axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
	// Disables the default behavior of throwing an error if the status code is not 2xx
	validateStatus: () => true
});
