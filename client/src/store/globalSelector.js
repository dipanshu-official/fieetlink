import { createSelector } from "@reduxjs/toolkit";  
import { useSelector } from "react-redux";

// Selector to get the user from the global state
export const globalstate = (state) => state.global;

// Memoized selector to get the user
export const userDataSelector = createSelector(
  [globalstate],
  (global) => global.userProfile
);