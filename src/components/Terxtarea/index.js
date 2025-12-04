import { IoSend } from "react-icons/io5";

const Textarea = ({ value, onChange, placeholder }) => {
    return <div className="textarea">
        <form>
            <div className="d-flex align-items-end">
                <textarea className="form-control" rows="3"></textarea>
                <button className="btn pb-0 mb-0">
                    <IoSend />
                </button>
            </div>
        </form>
    </div>

};

export default Textarea;