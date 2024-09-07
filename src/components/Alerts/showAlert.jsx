import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showAlertSuccess = (text, confirmButtonText) => {
    MySwal.fire({
        icon: "success",
        title: "Uğurlu əməliyyat",
        text,
        confirmButtonText: "OK",
    });
};

export const showAlertError = (text, confirmButtonText) => {
    MySwal.fire({
        icon: "error",
        title: "Xəta",
        text,
        confirmButtonText: "OK",
    });
};

