import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ColorInformation from "./components/ColorInformation/ColorInformation";
import ListColor from "./components/ListColor/ListColor";
import ScanColor from "./components/ScanColor/ScanColor";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import {
  animateFade,
  animateSlideToTop,
  transition,
} from "./Animation/Animation";
import imgToList from "./hooks/use_imgtolist.js";
import "./index.css";

const App = () => {
  // const location = useLocation();

  const [pageNum, setPageNum] = useState(1);
  const [base64, setBase64] = useState("");
  const [color, setColor] = useState({});

  const [listColor, err, isSearch] = imgToList(base64);

  const handlGetText = (base) => {
    setBase64(base);
  };
  const handCancle = () => {
    setBase64("");

    setColor({});

    handlChangePage(2);
  };
  const handlClickColor = (id) => {
    let index = listColor.findIndex((e) => e._id === id);
    console.log(id, index);
    setColor(listColor[index]);
  };

  const handlChangePage = (page) => {
    setPageNum(page);
  };

  return (
    <div id="app">
      <AnimatePresence exitBeforeEnter key={pageNum}>
        {pageNum === 1 && (
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={animateFade}
            transition={transition}
            key={pageNum}
          >
            <SplashScreen handlChangePage={handlChangePage} pageNum={pageNum} />
          </motion.div>
        )}

        {pageNum === 2 && (
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            transition={transition}
            variants={animateFade}
            key={pageNum}
          >
            <ScanColor
              onHandlImg={handlGetText}
              handlChangePage={handlChangePage}
            />
          </motion.div>
        )}
        {pageNum === 3 && (
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            transition={transition}
            variants={animateFade}
            key={pageNum}
          >
            <ListColor
              listItemColor={listColor}
              isSearch={isSearch}
              handCancle={handCancle}
              err={err}
              handlClickColor={handlClickColor}
              handlChangePage={handlChangePage}
              pageNum={pageNum}
            />
          </motion.div>
        )}
        {pageNum === 4 && (
          <motion.div
            initial="out"
            animate="in"
            exit="exit"
            variants={animateSlideToTop}
            key={pageNum}
          >
            <ColorInformation
              colorinfo={color}
              errSearch={err}
              isSearch={isSearch}
              handCancle={handCancle}
              handlChangePage={handlChangePage}
              pageNum={pageNum}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
