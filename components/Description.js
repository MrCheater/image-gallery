export const placeholder = 'Add a description of the image here';

const Description = ({ editable, text, onChange, onChangeComplete }) =>
    editable ? (
        <input
            name="description"
            autoFocus
            type="text"
            placeholder={placeholder}
            value={text}
            onChange={onChange}
            onBlur={onChangeComplete}
            className="description"
            autoComplete="off"
        />
    ) : (
        <div className="description">{text || placeholder}</div>
    );

export default Description;
