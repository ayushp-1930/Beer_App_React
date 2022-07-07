import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface beerState {
  loading: boolean;
  data: any;
  favoriteBeer: any;
  error: any;
}

const initialState: beerState = {
  loading: false,
  data: [],
  favoriteBeer: [],
  error: "",
};

export const fetchBeers = createAsyncThunk(
  "fetchBeers",
  async (page: number) => {
    try {
      console.log(page);
      const res = await fetch(
        "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=10"
      ).then((data) => data.json());
      return res;
    } catch (Error) {
      console.error(Error);
    }
  }
);

export const fetchFilteredData = createAsyncThunk(
  "fetchFilteredData",
  async (food_pairing: string) => {
    try {
      const res = await fetch(
        "https://api.punkapi.com/v2/beers?food=" + food_pairing + "&per_page=10"
      ).then((data) => data.json());
      return res;
    } catch (Error) {
      console.error(Error);
    }
  }
);

export const beerSlice = createSlice({
  name: "beer",
  initialState,
  reducers: {
    toggleFavoriteBeer: (state, action) => {
      state.favoriteBeer.filter((x: any) => x.id == action.payload).length > 0
        ? (state.favoriteBeer = state.favoriteBeer.filter(
            (x: any) => x.id != action.payload
          ))
        : state.favoriteBeer.push(
            state.data.filter((x: any) => x.id == action.payload)[0]
          );
    },
    clearFavoriteList: (state) => {
      state.favoriteBeer = [];
    },
    rateFavoriteBeer: (state, action) => {
      console.log("b", action.payload);
      const index = state.favoriteBeer.indexOf(
        state.favoriteBeer.filter((x: any) => x.id == action.payload.beerId)[0]
      );
      state.favoriteBeer[index].rating = action.payload.value;
      console.log(state.favoriteBeer);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBeers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBeers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBeers.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchFilteredData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchFilteredData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { toggleFavoriteBeer, clearFavoriteList, rateFavoriteBeer } =
  beerSlice.actions;

export default beerSlice.reducer;
