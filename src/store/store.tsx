import { create } from "zustand";

type AlertModalType = {
  isOpen?: boolean;
  title: string;
  description: string;
  confirmText: string;
  variant: "default" | "destructive";
  action: "delete" | "approve" | "decline"; // You can expand this
};

type State = {
  user: any;
  drawer: any;
  modal: any;
  alertModal: Partial<AlertModalType>;
  selectedId: any;
  selectedData: any;
};

type Actions = {
  setUser: (user: any) => void;
  openDrawer: (currentDrawer: any) => void;
  closeDrawer: () => void;
  openModal: (currentModal: any) => void;
  closeModal: () => void;
  openAlertModal: (config: AlertModalType) => void;
  closeAlertModal: () => void;
  setSelectedId: (id: any) => void;
  setSelectedData: (obj: any) => void;
};

export const useGlobalStore = create<State & Actions>((set) => ({
  user: JSON.parse(localStorage.getItem("Etender-user") || "{}"),
  drawer: null,
  modal: null,
  alertModal: false,
  selectedId: null,
  selectedData: null,

  setUser: (user) => {
    set({
      user: user,
    });
  },

  openDrawer: (currentDrawer) => {
    set({
      drawer: `${currentDrawer}`,
    });
  },

  closeDrawer: () =>
    set({
      drawer: null,
      selectedData: null,
      selectedId: null,
    }),

  openModal: (currentModal) => {
    set({
      modal: `${currentModal}`,
    });
  },

  closeModal: () =>
    set({
      modal: null,
      selectedData: null,
      selectedId: null,
    }),

  openAlertModal: (config: AlertModalType) =>
    set({
      alertModal: {
        ...config,
        isOpen: true,
      },
    }),

  closeAlertModal: () =>
    set({
      alertModal: {
        isOpen: false,
      },
      selectedId: null,
      selectedData: null,
    }),

  setSelectedId: (id) =>
    set({
      selectedId: id,
    }),
  setSelectedData: (obj) =>
    set({
      selectedData: obj,
    }),
}));
