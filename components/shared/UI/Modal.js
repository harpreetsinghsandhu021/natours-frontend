import React, { useContext } from "react";
import classes from "./Modal.module.css";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { AuthContext } from "../context/authContext";

const Modal = (props) => {
  const authCtx = useContext(AuthContext);
  if (props.error) {
    return (
      <>
        {props.asOverlay && (
          <div
            style={{ backgroundColor: `${props.bg}` }}
            onClick={() => props.onCancel()}
            className={classes.overlay}
          ></div>
        )}
        <div className={classes.modal}>
          <GiCrossMark className={classes.err_svg} />
          <div className={classes.modal__cnt}>
            <h4>{props.method} Error Detected</h4>
            <p> {props.message}</p>
          </div>
          {/* <ImCross
            onClick={() => props.onCancel()}
            className={classes.cncl__btn}
          /> */}
        </div>
      </>
    );
  }

  async function deleteHandler() {
    const sendRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tours/${props.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      }
    );

    const res = await sendRequest.text();

    if (sendRequest.ok) {
      props.filterOut(props.id);
      props.onCancel();
    }
  }

  if (props.confirm) {
    return (
      <>
        {props.asOverlay && (
          <div
            style={{ backgroundColor: `${props.bg}` }}
            onClick={() => props.onCancel()}
            className={classes.overlay}
          ></div>
        )}
        <div className={classes.modal}>
          <TiTick fill="#57d6bf" className={classes.scs_svg} />
          <div className={classes.modal__cnt}>
            <h4>
              Are you sure to perform this action. this action is ireversible.
            </h4>
          </div>
          <ImCross
            onClick={() => props.onCancel()}
            className={classes.cncl__btn}
          />
          <div className={classes.btn__wrap}>
            <button
              onClick={props.delete && deleteHandler}
              className={`btn--cta ${classes.btn__cta} ${classes.btn__cnf}`}
            >
              Confirm
            </button>
            <button
              className={`btn--cta--2 ${classes.btn__cta} ${classes.btn__cncl}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {props.asOverlay && (
        <div
          style={{ backgroundColor: `${props.bg}` }}
          onClick={() => props.onCancel()}
          className={classes.overlay}
        ></div>
      )}
      <div className={classes.modal}>
        <TiTick fill="#57d6bf" className={classes.scs_svg} />
        <div className={classes.modal__cnt}>
          <h4>{props.method} successful. Redirecting...</h4>
        </div>
        <ImCross
          onClick={() => props.onCancel()}
          className={classes.cncl__btn}
        />
      </div>
    </>
  );
};

export default Modal;
