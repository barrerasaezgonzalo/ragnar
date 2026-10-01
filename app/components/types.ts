export type ModalProps = {
  modalOpen: boolean;
  modalClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
};

type Holiday = {
  date: string;
  name: string;
  type: "national" | "regional";
};

export type HolidaysResponse = {
  success: boolean;
  data: Holiday[];
};

export type NextHoliday = {
  name: string;
  days_until: number;
};

export type HolidayCache = {
  date: string;
  holiday: NextHoliday | null;
};
