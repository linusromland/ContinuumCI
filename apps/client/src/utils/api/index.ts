// External Dependencies
import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:3000',
	// Disables the default behavior of throwing an error if the status code is not 2xx
	validateStatus: () => true
});
