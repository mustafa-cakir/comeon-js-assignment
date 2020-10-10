import axios from 'axios';

const configAxios = () => {
    axios.defaults.baseURL = 'http://localhost:3001'; // json-server baseUrl
    axios.interceptors.response.use(
        response => {
            if (
                response.data &&
                response.data.statusCode &&
                (response.data.statusCode < 200 || response.data.statusCode >= 300)
            ) {
                throw Object.create({
                    message: `${response.data.statusMessage}`,
                    statusCode: response.data.statusCode,
                    result: response.data.result,
                });
            }
            return response;
        },
        error => {
            if (!error.response) {
                error.message = 'Something went seriously wrong. We are working on it. Please check back later.';
            }
            if (error && error.response && error.response.status === 403) {
                error.message = '403';
            }

            return Promise.reject(error);
        },
    );
};

export default configAxios;
