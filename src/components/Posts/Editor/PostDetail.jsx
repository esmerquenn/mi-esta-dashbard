import {Typography} from "@material-tailwind/react";
import PostDialog from "./PostDialog";
import PostEditor from "./PostEditor";
import {PostButton} from "../../ChildComponents/PostButton";

export function PostDetail({ handleDetailChange, details, moreOrOne, setMoreOrOne, isOpen, setIsOpen }) {
  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <Typography className=" py-6" variant="h4">
        Daxili Şəkilləri yaradın
      </Typography>
      <PostDialog {...{ moreOrOne, setMoreOrOne, handleOpenDialog, isOpen, setIsOpen }} />
      <PostButton savePost={handleOpenDialog} content="Daxili şəkil" align="justify-start" />

      {moreOrOne === null ? (
        ""
      ) : moreOrOne ? (
        details.map((item, index) => (
          <div key={index}>
            <Typography className=" py-6" variant="h6">
              {item.language} şəkilləri
            </Typography>
            <PostEditor
              setContent={(content) => handleDetailChange(index, "content", content)}
              content={item.content}
            />
          </div>
        ))
      ) : (
        <div>
          <Typography className=" py-6" variant="h6">
            Ümumi şəkillər
          </Typography>
          <PostEditor
            setContent={(content) => {
              details.forEach((_, i) => handleDetailChange(i, "content", content));
            }}
            content={details[0].content}
          />
        </div>
      )}
    </div>
  );
}
