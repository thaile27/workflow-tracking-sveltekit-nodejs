import { login } from '../../server.js'; // Adjust the path to where your login function is

export async function post(request) {
    const { username, password } = JSON.parse(request.body);
    
    try {
        const result = await login(username, password);
        return {
            status: 200,
            body: result
        };
    } catch (error) {
        return {
            status: 500,
            body: { message: 'Internal Server Error' }
        };
    }
}