import {Radio} from "@material-tailwind/react";
import HeartIcon from "../../icons/HeartIcon.jsx";

export function PostRadio({onChange, value}) {
    const isCheckedHorizontal = value === "HORIZONTAL";
    const isCheckedVertical = value === "VERTICAL";
    return (
        <div className="text-left pl-3 ">
            <Radio
                name="type"
                value="HORIZONTAL"
                label="Horizontal"
                icon={<HeartIcon/>}
                onChange={onChange}
                defaultChecked={isCheckedHorizontal}
            />
            <Radio
                name="type"
                value="VERTICAL"
                label="Vertical"
                icon={<HeartIcon/>}
                defaultChecked={isCheckedVertical}
                onChange={onChange}
            />
        </div>
    );
}
