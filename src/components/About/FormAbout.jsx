import React, { useEffect, useState } from "react";
import { useGetAboutQuery, usePostAboutMutation, usePutAboutMutation } from "../../api/slices/about";
import { PostButton } from "../ChildComponents/PostButton";
import { showAlertError, showAlertSuccess } from "../Alerts/showAlert";
import ImageUpload from "../ChildComponents/ImageUpload";
import { Card, Input, Textarea, Typography } from "@material-tailwind/react";

function FormAbout({ setShow }) {
  const [updatePage] = usePutAboutMutation();
  const [postImage] = usePostAboutMutation();
  const { data } = useGetAboutQuery();
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [details, setDetails] = useState([
    {
      id: 0,
      title: "",
      content: "",
      language: "AZ",
    },
    {
      id: 1,
      title: "",
      content: "",
      language: "EN",
    },
    {
      id: 2,
      title: "",
      content: "",
      language: "RU",
    },
  ]);
  useEffect(() => {
    setPreview(data.thumbnail);
    setDetails(data.details);
  }, [data]);

  const handleUpdateAboutPage = async () => {
    const isValid = details.every((item) => item.title && item.content);

    if (!isValid) {
      showAlertError("Formdakı boşluqları doldurun !");
      return;
    }
    try {
      let esi = { details };
      const result = await updatePage(esi).unwrap();
      if (result) {
        resetAll();
        setShow(false);
        showAlertSuccess("Data göndərildi");
      }
    } catch (error) {
      showAlertError("Data düzgün deyil !");
    }
  };

  function resetAll() {
    setDetails([
      {
        id: 0,
        title: "",
        content: "",
        language: "AZ",
      },
      {
        id: 0,
        title: "",
        content: "",
        language: "EN",
      },
      {
        id: 0,
        title: "",
        content: "",
        language: "RU",
      },
    ]);
   
  }

  async function handlePostImage() {
    if (!image) {
      showAlertError("Şəkil əlavə edilməyib !");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    try {
      const result = await postImage(formData).unwrap();
      if (result) {
        showAlertSuccess("Data göndərildi");
        setImage("");
        setPreview(" ");
      }
    } catch (error) {
      showAlertError("Data düzgün deyil !");
    }
  }

  const handleDetailChange = (id, value, key) => {
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
    <div className=" grid  lg:gap-10 ">
      <div className="  grid md:grid-cols-2  justify-items-start gap-6">
        <div className="w-full">
          <div >
            <ImageUpload {...{ setImage, setPreview, preview }} />
            <PostButton onClick={handlePostImage} content="Şəkil yarat" align="justify-start" />
          </div>
        </div>
      </div>
      {details &&
        details?.map((item, index) => (
          <Card key={index} className="border border-grey-400 overflow-hidden w-full p-3" color="transparent">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                onChange={(e) => handleDetailChange(item.id, e.target.value, "title")}
                variant="standard"
                value={item.title}
                label={item.language}
              />
            </div>

            <Typography className=" py-6" variant="h6">
              {item.language}
            </Typography>
            <Textarea
              rows={10}
              variant="standard"
              label={item.language}
              value={item.content}
              onChange={(e) => handleDetailChange(item.id, e.target.value, "content")}
            />
          </Card>
        ))}

      <PostButton onClick={handleUpdateAboutPage} content="Yenilə" align="justify-start" />
    </div>
  );
}

export default FormAbout;
