import {
  OPEN_EDIT_PROFILE,
  CLOSE_EDIT_PROFILE,
  OPEN_EVENT_DETAILS,
  CLOSE_EVENT_DETAILS,
  OPEN_CHAT,
  CLOSE_CHAT,
  CHAT_RESIZED,
} from "./actionTypes";

export const openEditProfile = () => ({
  type: OPEN_EDIT_PROFILE,
});

export const closeEditProfile = () => ({
  type: CLOSE_EDIT_PROFILE,
});

export const openEventDetails = () => ({
  type: OPEN_EVENT_DETAILS,
});

export const closeEventDetails = () => ({
  type: CLOSE_EVENT_DETAILS,
});

export const closeChat = () => ({
  type: CLOSE_CHAT,
});

export const openChat = () => ({
  type: OPEN_CHAT,
});
export const chatResized = (newWidth) => ({
  type: CHAT_RESIZED,
  newWidth,
});

// export const sendChatMessage = (message) => ({
//   type: OPEN_CHAT,
// });
