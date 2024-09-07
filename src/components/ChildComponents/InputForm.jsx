import {Input} from "@material-tailwind/react";

function InputForm({onChange, value, label}) {
    return (
        <Input
            onChange={onChange}
            variant="standard"
            value={value}
            label={label}
            placeholder={label}

        />
    );
}

export default InputForm;
