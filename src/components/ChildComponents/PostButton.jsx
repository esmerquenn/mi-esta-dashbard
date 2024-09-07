import {Button} from "@material-tailwind/react";

export function PostButton({onClick, content, align}) {
  return (
    <div className={`flex items-center  my-5 gap-4 ${align}`}>
        <Button onClick={onClick} variant="gradient">{content}</Button>
    </div>
  );
}
