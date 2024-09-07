import React, { useState } from "react";
import { Card, Input, Textarea, Typography } from "@material-tailwind/react";
import { PostSelect } from "./Editor/PostSelect.jsx";
import { PostRadio } from "./Editor/PostRadio.jsx";
import { MyUploadAdapterPlugin } from "./Editor/PostEditor.jsx";
import { PostInput } from "./Editor/PostInput.jsx";
import { PostButton } from "../ChildComponents/PostButton.jsx";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { showAlertError, showAlertSuccess } from "../Alerts/showAlert.jsx";
import { usePostPostsMutation } from "../../api/slices/posts";

export default function AddPost() {
  const [tag, setTag] = useState("");
  const [thumbnailType, setThumbnailType] = useState();
  const [thumbnail, setThumbnail] = useState({ file: null, preview: null });
  const [category, setCategory] = useState("");
  const [addPost, { isLoading }] = usePostPostsMutation();

  const [hasMultiLangContent, setHasMultiLangContent] = useState(false);

  const [details, setDetails] = useState([
    { title: "", description: "", content: "", language: "AZ" },
    { title: "", description: "", content: "", language: "EN" },
    { title: "", description: "", content: "", language: "RU" },
  ]);

  const handleChangeThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnail({ file: file, preview: url });
    }
  };

  const handleAddPost = async () => {
    const data = { tag, thumbnail, thumbnail_type: thumbnailType, details, category };
    if (!tag) {
      showAlertError("Tag əlavə edilməyib!");
      return;
    }
    if (!thumbnail.file) {
      showAlertError("Şəkil əlavə edilməyib!");
      return;
    }
    if (!thumbnailType) {
      showAlertError("Şəkil tipi seçilməyib!");
      return;
    }
    if (!category) {
      showAlertError("Kategoriya seçilməyib!");
      return;
    }

    for (let detail of details) {
      if (!detail.title) {
        showAlertError(`${detail.language} - Başliq əlavə edilməyib`);
        return;
      }
      if (!detail.description) {
        showAlertError(`${detail.language} - Yazı əlavə edilməyib`);
        return;
      }
      if (!detail.content) {
        showAlertError(`${detail.language} - Şəkillər əlavə edilməyib`);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail.file);
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      formData.append("data", blob);

      const response = await addPost(formData).unwrap();
      if (response) {
        showAlertSuccess("Post Yaradıldı!");
        // Clear inputs after successful post
        setTag("");
        setThumbnailType(null);
        setThumbnail({ file: null, preview: null });
        setCategory("");
        setDetails([
          { title: "", description: "", content: "", language: "AZ" },
          { title: "", description: "", content: "", language: "EN" },
          { title: "", description: "", content: "", language: "RU" },
        ]);
        setHasMultiLangContent(false);
      }
    } catch (err) {
      showAlertSuccess("Post əlavə edilərkən xəta baş verdi!");
    }
  };

  const handleChangeThumbnailType = (e) => {
    setThumbnailType(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e);
  };

  const handleChangeDetail = (index, value, field) => {
    setDetails((prev) =>
      prev.map((detail, i) => {
        if (index === i) {
          return { ...detail, [field]: value };
        }
        return detail;
      })
    );
  };
  const handleChangeAllContent = (data) => {
    setDetails((prev) =>
      prev.map((detail) => ({ ...detail, content: data }))
    );
  };

  return (
    <>
      <div className=" flex flex-col md:flex-row gap-6 md:gap-20">
        <div className="w-80">
          <div className="max-w-[320px] min-h-[220px]  p-4 relative bg-gray-50 rounded-lg shadow-lg">
            <input
              type="file"
              accept="image/*"
              className="cursor-pointer absolute inset-0 opacity-0  border h-full z-50"
              onChange={handleChangeThumbnail}
            />
            {thumbnail.preview ? (
              <img src={thumbnail.preview} alt="Uploaded Thumbnail" className=" object-cover rounded-lg max-h-[220px]" />
            ) : (
              <div className="text-center absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <h4 className="text-gray-500 font-medium">Şəkil seç</h4>
                <p className="text-gray-400">Şəkil seçmək üçün toxunun vəya sürükləyin</p>
              </div>
            )}
          </div>
          <PostRadio onChange={handleChangeThumbnailType} value={thumbnailType} />
        </div>
        <div className="w-80">
          <PostSelect value={category} onChange={handleChangeCategory} />
          <PostInput onChange={(e) => setTag(e.target.value)} value={tag} name="tag" label="Tag" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2  mt-4">
        {details.map((detail, index) => (
          <Card key={index} className="border border-grey-400 overflow-hidden max-w-96 p-3" color="transparent">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                onChange={(e) => handleChangeDetail(index, e.target.value, "title")}
                variant="standard"
                value={detail.title}
                label={`Basliq ${detail.language}`}
              />
              <Textarea
                rows={10}
                variant="standard"
                label={`Meluamat ${detail.language}`}
                value={detail.description}
                className="scrollbar-thin border-0"
                onChange={(e) => handleChangeDetail(index, e.target.value, "description")}
              />
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-16 mb-4 w-96">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Sadəcə şəkil olacaq?</h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="YES"
                type="radio"
                name="list-radio"
                checked={!hasMultiLangContent}
                onChange={() => setHasMultiLangContent(false)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label htmlFor="YES" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Sadəcə şəkil
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="NO"
                type="radio"
                name="list-radio"
                checked={hasMultiLangContent}
                onChange={() => setHasMultiLangContent(true)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label htmlFor="NO" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Yazı və şəkil
              </label>
            </div>
          </li>
        </ul>
      </div>
      {hasMultiLangContent ? (
        details.map((detail, index) => (
          <div key={detail.id}>
            <Typography className=" py-6" variant="h6">
              {detail.language} şəkilləri
            </Typography>
            <CKEditor
              config={{
                extraPlugins: [MyUploadAdapterPlugin],
              }}
              editor={ClassicEditor}
              initData={detail.content}
              data={detail.content}
              onChange={(event, editor) => handleChangeDetail(index, editor.getData(), "content")}
            />
          </div>
        ))
      ) : (
        <div>
          <Typography className=" py-6" variant="h6">
            şəkilləri daxil edin
          </Typography>
          <CKEditor
            config={{
              extraPlugins: [MyUploadAdapterPlugin],
            }}
            data={details[0].content}
            editor={ClassicEditor}
            onChange={(event, editor) => handleChangeAllContent(editor.getData())}
          />
        </div>
      )}
      <PostButton onClick={handleAddPost} content="Əlavə et" align="justify-end" />
    </>
  );
}
