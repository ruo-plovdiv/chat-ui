import { IoSend } from "react-icons/io5";

const Textarea = ({ submit, placeholder, value, onChange }) => {
  return (
    <div className="textarea mt-5">
      <form onSubmit={submit}>
        <div className="d-flex align-items-end">
          <input
            name="q"
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <button
            className="btn btn-dark d-flex align-items-center ms-3"
            type="submit"
          >
            <IoSend className="fs-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Textarea;
