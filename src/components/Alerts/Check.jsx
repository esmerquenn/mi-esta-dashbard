import {showAlertError} from "./showAlert.jsx";

export const validateImageData = (image, data, showAlert) => {
    if (!image) {
        showAlertError("Şəkil əlavə edilməyib !");
        return false;
    }
    if (!data.name || !data.surname || !data.birthdate || !data.position || !data.professional) {
        return false;
    }
    return true;
};

export const validateCategoryData = (data, details) => {
    if (!data.category || !data.thumbnail_type) {
        return false;
    }
    for (let detail of details) {
        if (!detail.title || !detail.content || !detail.language || !detail.description) {
            return false;
        }
    }
    return true;
};
  