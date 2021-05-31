import { useEffect, useState } from "react";
import ColorApi from "../apis/ColorApi";
import googleApiOcr from "../apis/googleApiOcr";

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const ImgToColor = (base64) => {
  const [color, setColor] = useState({});
  const [err, setErr] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (base64 !== "") {
      setIsSearch(true);
      let data = JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              {
                type: "TEXT_DETECTION",
              },
            ],
          },
        ],
      });
      googleApiOcr.getText(data).then((response) => {
        if (isEmpty(response.responses[0])) {
          // console.log("Error");
          setErr("Can not scan the text, please try again");
          setIsSearch(false);
        } else {
          setText(response.responses[0].fullTextAnnotation.text.trim());
        }
      });
    }

    return () => {
      setText("");
      setErr("");
      setIsSearch(false);
      setColor({});
    };
  }, [base64]);

  useEffect(() => {
    if (text !== "") {
      ColorApi.getColor(text)
        .then((data) => {
          console.log("data--", data);
          let result = data.result;
          console.log(result);
          if (result === null) {
            setErr(`Can not find any results with keywords ${text}`);
            setIsSearch(false);
          } else {
            setIsSearch(false);
            setColor(result);
          }
        })
        .catch((err) => {
          console.log(err);
          setErr(`Can not find any results with keywords ${text}`);
        })
        .finally(() => {
          setIsSearch(false);
        });
    }
  }, [text]);

  return [color, err, isSearch];
};

export default ImgToColor;
