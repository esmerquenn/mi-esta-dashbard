import React, { useEffect, useState } from "react";
import { useGetPostByIdQuery, usePutPostsMutation, usePutPostsThumbnailMutation } from "../../api/slices/posts";
import { Link, Navigate, useParams } from "react-router-dom";
import Loading from "../ChildComponents/Loading";
import { PostSelect } from "./Editor/PostSelect.jsx";
import { Card, Input, Radio, Textarea, Typography } from "@material-tailwind/react";
import { MyUploadAdapterPlugin } from "./Editor/PostEditor.jsx";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "antd";
import { showAlertError, showAlertSuccess } from "../Alerts/showAlert.jsx";
import { PostInput } from "./Editor/PostInput.jsx";
import HeartIcon from "../icons/HeartIcon.jsx";

function UpdatePost() {
  const { postId } = useParams();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);

  const [tag, setTag] = useState("");
  const [thumbnailType, setThumbnailType] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [details, setDetails] = useState([]);
  const [category, setCategory] = useState("");
  const [putPostsThumbnail, { isLoading: isThumbnailUpdateLoading, isError: isThumbnailUpdateError }] =
    usePutPostsThumbnailMutation();
  const [putPosts, { isLoading: isPostUpdateLoading, isError: isPostUpdateError }] = usePutPostsMutation();

  useEffect(() => {
    if (post) {
      setTag(post.tag);
      setCategory(post.category);
      setThumbnail(post.thumbnail);
      setDetails(post.details);
      setThumbnailType(post.thumbnail_type);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Navigate to="/" />;
  }

  const handleChangeThumbnail = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("thumbnail", file);
      try {
        const response = await putPostsThumbnail({ body: formData, id: postId }).unwrap();
        if (!isThumbnailUpdateLoading && !isThumbnailUpdateError) {
          setThumbnail(response.url);
          showAlertSuccess("Post şəkli yeniləndi");
        }
      } catch (err) {
        showAlertError("Post şəkli yenilənərkən xəta baş verdi!");
      }
    }
  };

  const handleUpdatePost = async () => {
    const data = { tag, thumbnail, thumbnail_type: thumbnailType, details, category };
    if (!tag) {
      showAlertError("Tag əlavə edilməyib!");
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
       await putPosts({ body: data, id: postId }).unwrap();
      if (!isPostUpdateLoading && !isPostUpdateError) {
        showAlertSuccess("Post məlumatları yeniləndi");
      }
    } catch (err) {
      showAlertSuccess("Post məlumatları yenilərkən xəta baş verdi!");
    }
  };

  const handleChangeDetail = (id, value, key) => {
    setDetails((prev) =>
      prev.map((detail) => {
        if (detail.id === id) {
          return { ...detail, [key]: value };
        }
        return detail;
      })
    );
  };
  return (
    <>
      <Button className="py-1 px-3">
        <Link to="/">Geri dön</Link>
      </Button>
      <div className=" flex flex-col md:flex-row gap-6 md:gap-20">
        <div className="w-80">
          <div className="max-w-[320px] min-h-[220px]  p-4 relative bg-gray-50 rounded-lg shadow-lg">
            <input
              type="file"
              accept="image/*"
              className="cursor-pointer absolute inset-0 opacity-0  border h-full z-50"
              onChange={handleChangeThumbnail}
            />

            <img src={thumbnail} alt="Uploaded Thumbnail" className=" object-cover rounded-lg max-h-[220px]" />
          </div>
          <div className="text-left pl-3 ">
            <Radio
              name="type"
              value="HORIZONTAL"
              label="Horizontal"
              icon={<HeartIcon />}
              onChange={(e) => setThumbnailType(e.target.value)}
              checked={thumbnailType === "HORIZONTAL"}
            />
            <Radio
              name="type"
              value="VERTICAL"
              label="Vertical"
              icon={<HeartIcon />}
              checked={thumbnailType === "VERTICAL"}
              onChange={(e) => setThumbnailType(e.target.value)}
            />
          </div>
        </div>
        <div className="w-80">
          <PostSelect value={category} onChange={(value) => setCategory(value)} />
          <PostInput onChange={(e) => setTag(e.target.value)} value={tag} name="tag" label="Tag" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2  mt-4">
        {details.map((detail) => (
          <Card key={detail.id} className="border border-grey-400 overflow-hidden max-w-96 p-3" color="transparent">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                onChange={(e) => handleChangeDetail(detail.id, e.target.value, "title")}
                variant="standard"
                value={detail.title}
                label={`Basliq ${detail.language}`}
                placeholder={`Basliq ${detail.language} daxil edin`}
              />
              <Textarea
                rows={10}
                variant="standard"
                label={`Meluamat ${detail.language}`}
                placeholder={`Melumat ${detail.language} daxil edin`}
                value={detail.description}
                onChange={(e) => handleChangeDetail(detail.id, e.target.value, "description")}
              />
            </div>
          </Card>
        ))}
      </div>

      {details.map((detail) => (
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
            onChange={(event, editor) => handleChangeDetail(detail.id, editor.getData(), "content")}
          />
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <Button className="p-5" onClick={handleUpdatePost}>
          Yenile
        </Button>

      </div>
    </>
  );
}

export default UpdatePost;
