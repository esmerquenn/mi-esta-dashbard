import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  thumbnail: "", 
  id: null,
  data: {
    slug: "",
    thumbnail_type: "HORIZONTAL",
    details: [],
    category: "",
    tag: ""
  },
};


const editPostsSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {
    setObject(state, action) {
      const { slug, id, thumbnail_type,thumbnail, details,  category,tag } = action.payload;
      state.data = {
        slug,
        thumbnail_type,
        details,
        category,
        tag,
      };
      state.id = id
      state.thumbnail = thumbnail
    },
    clearObject(state) {
      state.thumbnail = "";
      state.id= null,
      state.data = {
        slug: "",
        tag: "",
        thumbnail_type: "HORIZONTAL",
        details: [],
        category: "",
      };
      
    },
  },
});

export const { setObject, clearObject } = editPostsSlice.actions;
export const editStatePost = (state) => state.editPost;
export default editPostsSlice.reducer;
