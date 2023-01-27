import { useEffect } from "react";
function Alert({ alert, showAlert,list }) {
  const { show, msg, type } = alert;
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 2000);
    return ()=>clearTimeout(timeout);
  },[list]);
  return (
    <>
      <div className="alert">
        <p className={`alert-${type}`}>{msg}</p>
      </div>
    </>
  );
}
export default Alert