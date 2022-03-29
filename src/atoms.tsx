import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: ["a", "b", "c", "d", "e", "f", "1", "2", "3", "4"],
    doing: ["g", "h"],
    done: ["i", "j"],
  },
});
