import PropTypes from "prop-types";
import React, { useEffect } from "react";
import close from "../../assets/img/close.png";
import loading from "../../assets/img/loading.gif";
import ChangeColorText from "../../hooks/use_changeColorText";
import "./ListColor.css";

ListColor.propTypes = {
  listItemColor: PropTypes.array,
  isSearch: PropTypes.bool,
  err: PropTypes.string,
  handlClickColor: PropTypes.func,
  handCancle: PropTypes.func,
};

function ListColor(props) {
  const { listItemColor, isSearch, err, handlClickColor, handCancle } = props;

  useEffect(() => {
    if (err !== "") {
      props.handlChangePage(4);
    }
    if (listItemColor.length === 1) {
      handlClickColor(listItemColor[0]._id);
      props.handlChangePage(4);
    }
  }, [err, listItemColor]);

  const handlClick = (id) => {
    handlClickColor(id);

    props.handlChangePage(4);
  };
  return (
    <div className="list-color">
      <div>
        {isSearch && (
          <div className="loading">
            <img src={loading} alt="" />
          </div>
        )}
        {!isSearch && (
          <div>
            <div className="image-container-close">
              <div to="scan" onClick={handCancle}>
                <img className="btn-close" src={close} alt="cart" />
              </div>
            </div>
            <div className="result">
              <div className="result-header">
                <h2>List Of Results Found</h2>
              </div>
              <div className="list-result">
                {listItemColor.map((e) => (
                  <div
                    className="list-item"
                    key={e._id}
                    style={{ background: `${e.hexCode}` }}
                    onClick={() => {
                      handlClick(e._id);
                    }}
                  >
                    <div to="information" className="link-to-info">
                      <div
                        style={{
                          color: ChangeColorText(e.hexCode.trim()),
                        }}
                      >
                        {e.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListColor;
