import {Input} from "@material-tailwind/react";

export function PostInput({ value, onChange, label , name, className ="", type= "text"}) {
 
  return (
    <div className={`flex  flex-col gap-6 ${className}`}>
      <Input type={type} className="px-2" onInput={onChange} variant="standard" value={value} name={name} label={label} placeholder={label} />
    </div>
  );
}
