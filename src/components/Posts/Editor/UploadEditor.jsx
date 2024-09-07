import {imageEditorApi} from "../../../api/slices/imageEditor";
import {store} from "../../../api/store";

export default class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.uploadImage = imageEditorApi.endpoints.uploadImage.initiate;
  }
  // const [post] = useUploadImageMutation()

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("image", file);
          store
            .dispatch(this.uploadImage(data))
            .then((result) => {
              if (result.error) {
                reject(result.error);
              } else {
                resolve({ default: result.data.url });
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }
}
