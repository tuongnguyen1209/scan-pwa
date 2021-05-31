import axiosClient from "./axiosClient";

const url = "https://apicolor-demo-1.herokuapp.com/api/v1/colors";

const ColorApi = {
  getColor: (text) => {
    if (!text) return new Promise();
    let str = text.toUpperCase().trim().split(" ");
    let newStr = str.join("").replace("–", "-");
    let params = {
      name: newStr,
    };
    return axiosClient.get(url, { params });
  },
};

export default ColorApi;
