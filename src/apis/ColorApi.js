import axiosClient from './axiosClient'

const url = 'https://apicolor-demo-1.herokuapp.com/api/v1/colors'

const ColorApi = {
    getColor: (text) => {
        if (!text) return new Promise();
        text = text.trim().replaceAll(' ', '').toLowerCase();
        let params = {
            name: text
        }
        return axiosClient.get(url, { params })
    }
}

export default ColorApi