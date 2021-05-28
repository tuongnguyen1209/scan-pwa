import axiosClient from './axiosClient'

//url and key here
const url = 'https://vision.googleapis.com/v1/images:annotate?key=';
const key = 'AIzaSyAIxX-cjeUvn2UFjxcX5EdKTob7YmOfeZY';
const googleApiOcr = {
    getText: (param) => {
        return axiosClient.post(`${url}${key}`, param)
    }
}

export default googleApiOcr;