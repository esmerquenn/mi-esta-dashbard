import React from "react";
import {useGetAboutQuery} from "../../api/slices/about";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {Image, Spin} from "antd";

function ShowAbout() {
  const { data, isLoading } = useGetAboutQuery();
  return (
    <>
      {isLoading ? (
        <div className=" h-[50vh] flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className=" mt-10">
          <Card className="max-w-[44rem] overflow-hidden">
            <CardHeader color="transparent" className="m-0 p-5 rounded-none">
              <Image src={data?.thumbnail} alt="about thumbnail" />
            </CardHeader>
            <CardBody >
              {data?.details.map((item, index) => (
                <div key={index} className=" border border-gray-50 my-4 p-4">
                <Typography variant="h6" className=" text-gray-200">
                    {item?.language}
                  </Typography>
                  <Typography className=" py-2" variant="h6" color="blue-gray">
                    {item?.title}
                  </Typography>
                  <Typography variant="h6" color="gray" className="mt-3 font-normal">
                    {item?.content}
                  </Typography>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

export default ShowAbout;
