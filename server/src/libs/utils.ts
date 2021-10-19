import { ISortable, SortDirection } from "./interfaces";

export const sorterCreator = (direction: SortDirection) => {
    switch (direction) {
      case SortDirection.ASC: return (a: ISortable, b: ISortable) => (a.order || 0) - (b.order || 0);
      case SortDirection.DESC: return (a: ISortable, b: ISortable) => (b.order || 0) - (a.order || 0);
    }
  }