import React, { useState } from "react";
import ColorInformation from "./components/ColorInformation/ColorInformation";
import ListColor from "./components/ListColor/ListColor";
import ScanColor from "./components/ScanColor/ScanColor";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import imgToList from './hooks/use_imgtolist.js';
import './index.css';

const App = () => {
  // const location = useLocation();

  const [pageNum, setPageNum] = useState(1);
  const [base64, setBase64] = useState('');
  const [color, setColor] = useState({});

  const [listColor, err, isSearch] = imgToList(base64)



  const handlGetText = (base) => {

    setBase64(base);

  }
  const handCancle = () => {

    setBase64('')


    setColor({})

    handlChangePage(2)
  }
  const handlClickColor = (id) => {
    let index = listColor.findIndex(e => e._id === id)
    console.log(id, index);
    setColor(listColor[index])
  }

  const handlChangePage = (page) => {
    setPageNum(page)
  }

  return (

    <div className='app'>

      {pageNum === 1 &&
        <SplashScreen handlChangePage={handlChangePage} />
      }

      {pageNum === 2 &&
        <ScanColor onHandlImg={handlGetText} handlChangePage={handlChangePage} />
      }
      {pageNum === 3 &&
        <ListColor
          listItemColor={listColor} isSearch={isSearch} handCancle={handCancle} err={err}
          handlClickColor={handlClickColor}
          handlChangePage={handlChangePage}
        />
      }
      {pageNum === 4 &&
        <ColorInformation
          colorinfo={color} errSearch={err} isSearch={isSearch}
          handCancle={handCancle}
          handlChangePage={handlChangePage}
        />
      }
    </div>

  );
}

export default App;
