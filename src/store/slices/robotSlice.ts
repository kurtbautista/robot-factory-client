import { RootState } from "../index";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Robot, Robots } from "../../components/Robot.types";
import { fetchRobots, extinguish, recycle } from "./robotAction";

type InitialState = {
  isLoading: boolean;
  robots: Robot[];
};

const initialState: InitialState = {
  isLoading: false,
  robots: [],
};

export const RobotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    setRobots: (state, action: PayloadAction<InitialState>) => {
      state.robots = action.payload?.robots;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRobots.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRobots.fulfilled, (state, action) => {
      state.isLoading = false;
      state.robots = action.payload;
    });
    builder.addCase(extinguish.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(extinguish.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      let dup = [...state.robots];
      const findIndex = dup.findIndex((item) => item.id === +payload.data.id);
      dup[findIndex] = payload.data;
      state.robots = dup;
    });
    builder.addCase(recycle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(recycle.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.robots = payload.data;
    });
  },
});

export default RobotSlice.reducer;
export const { setRobots } = RobotSlice.actions;

export const robotsSelector = (state: RootState) => state.robots;

// export const totalItemQtySelector = createSelector([items], (items) => {
//   console.log("custom selector runned");

//   return items.reduce(
//     (total: number, curr: CartItem) => (total += curr.qty),
//     0
//   );
// });

// export const totalQtyLimitSelector = createSelector(
//   [items, (items, limit: number) => limit],
//   (items, limit) => {
//     const total = items.reduce(
//       (total: number, curr: CartItem) => (total += curr.qty),
//       0
//     );
//     return total > limit;
//   }
// );
