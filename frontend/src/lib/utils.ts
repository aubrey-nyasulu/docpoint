const dev = 'http://localhost:5000/api/v1'
const prod = 'https://docpoint-api.onrender.com/api/v1'

console.log('env', process.env.NODE_ENV)

export const baseURL = process.env.NODE_ENV === 'production' ? prod : dev
