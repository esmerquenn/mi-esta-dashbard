import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: "",
  id: null,
  birthdate: "",
  details: [
    {
      id: null,
      image: "",
      name: "",
      surname: "",
      position: "",
      professional: "",
    },
    {
      id: null,
      image: "",
      name: "",
      surname: "",
      position: "",
      professional: "",
    },
    {
      id: null,
      image: "",
      name: "",
      surname: "",
      position: "",
      professional: "",
    },
  ],
  isEditing: false,
};

const editEmployeeSlice = createSlice({
  name: "editEmployee",
  initialState,
  reducers: {
    setObject(state, action) {
      const { id, birthdate, details, image } = action.payload;
      state.details = details;
      state.birthdate = birthdate;
      state.image = image;
      state.id = id;
      state.isEditing = true;
    },

    clearObject(state) {
      state.image = "";
      state.id = null;
      state.birthdate = "";
      state.details = [
        {
          id: null,
          image: "",
          name: "",
          surname: "",
          position: "",
          professional: "",
        },
        {
          id: null,
          image: "",
          name: "",
          surname: "",
          position: "",
          professional: "",
        },
        {
          id: null,
          image: "",
          name: "",
          surname: "",
          position: "",
          professional: "",
        },
      ];
      state.isEditing = false;
    },
    setEditing(state, action) {
      state.isEditing = action.payload; // Boolean değeri ayarla
    },
  },
});

export const { setObject, clearObject, setEditing } = editEmployeeSlice.actions;
export const editState = (state) => state.editEmployee;
export default editEmployeeSlice.reducer;
