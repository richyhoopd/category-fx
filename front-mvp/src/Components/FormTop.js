import '../Styles/form__top.scss';

export default function FormTop(props) {
  return (
    <div className="form__top">
      <div className="form__top-progress">
        <div className="form__top-progress-bar" id={props.current1}></div>
        <div className="form__top-progress-bar" id={props.current2}></div>
        <div className="form__top-progress-bar" id={props.current3}></div>
        <div className="form__top-progress-bar" id={props.current4}></div>
      </div>
      <h2>{props.tittle}</h2>
      <p>{props.parragraph}</p>
    </div>
  );
}
