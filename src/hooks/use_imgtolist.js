import { useEffect, useState } from "react"
import ColorApi from "../apis/ColorApi";
import googleApiOcr from "../apis/googleApiOcr";

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

const ImgToList = (base64) => {
    const [listColor, setListColor] = useState([]);
    const [err, setErr] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [text, setText] = useState('')

    useEffect(() => {
        if (base64 !== '') {
            setIsSearch(true)
            let data = JSON.stringify({
                requests: [
                    {
                        image: {
                            content: base64
                        },
                        features: [
                            {
                                type: "TEXT_DETECTION"
                            }
                        ]
                    }
                ]
            })
            googleApiOcr.getText(data).then(response => {
                // console.log(response);
                if (isEmpty(response.responses[0])) {
                    // console.log("Error");
                    setErr("Can not scan the text, please try agian");
                    setIsSearch(false)
                }
                else {
                    setText(response.responses[0].fullTextAnnotation.text.trim())
                }

            })
        }
    }, [base64])


    useEffect(() => {
        if (text !== '') {

            ColorApi.getColor(text).then(data => {
                let result = data.result;

                let list = []
                list = data.sugestion.Colors
                if (result === null && list.length === 0) {
                    setErr(`Can not find any results with keywords ${text}`)
                    setIsSearch(false)
                } else {
                    let index = (list.length > 0 && result !== null) ? list.findIndex(e => e._id === result._id) : -1
                    const newList = []
                    if (index < 0 && result !== null) newList.push(result)
                    newList.push(...list)
                    if (newList.length === 0) {
                        setErr(`Can not find any results with keywords ${text}`);
                        setIsSearch(false)
                        return ''
                    }
                    console.log('new list', newList);
                    setListColor(newList)
                }
            }).catch(err => {
                console.log(err);
                setErr(`Can not find any results with keywords ${text}`);
            }).finally(() => {
                setIsSearch(false)
            })
        }
    }, [text])

    return [listColor, err, isSearch]
}

export default ImgToList;