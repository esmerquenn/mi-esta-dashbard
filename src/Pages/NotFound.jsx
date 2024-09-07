import {Button, Typography} from "@material-tailwind/react";
import {FlagIcon} from "@heroicons/react/24/solid";
import React from "react";
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <Typography variant="h1" color="blue-gray" className="mt-10 !text-3xl !leading-snug md:!text-4xl">
          Error 404 <br /> Səhifə tapılmadı
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
        Səhifəni yeniləməyə cəhd edin və ya aşağıdakı buttona basaraq geri qayıdın..
        </Typography>
        <Button color="gray" className="w-full px-4 md:w-[13rem]">
          <Link to="/">Ana səhifəyə keç</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;

