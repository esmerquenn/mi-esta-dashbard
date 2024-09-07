import {Option, Select} from "@material-tailwind/react";

const options = [
    {
        value: "DESIGN",
        name: "Design Portfolio",
    },
    {
        value: "REPAIR",
        name: "Repair & Constraction",
    },
    {
        value: "INVESTMENT",
        name: "Investment Projects",
    },
];

export function PostSelect({onChange, value}) {
    return (
        <div className="flex  flex-col gap-6 my-6">
            <Select value={value} onChange={onChange} variant="standard" label="Kategoriya seçin">
                {options.map((item, index) => (
                    <Option key={index} value={item.value}>
                        {item.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
