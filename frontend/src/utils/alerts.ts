import { toast } from "sonner";

export const throwSuccessAlert = (message = "") => {
  toast.success(message, {
    style: { backgroundColor: "#22b761", color: "white" },
  });
};

export const throwErrorAlert = (message = "") => {
  toast.error(message, {
    style: { backgroundColor: "#e8465b", color: "white" },
  });
};

export const throwWarningAlert = (message = "") => {
  toast.warning(message, {
    style: { backgroundColor: "#f5a623", color: "white" },
  });
};

export const throwInfoAlert = (message = "") => {
  toast.info(message, {
    style: { backgroundColor: "#00a3ff", color: "white" },
  });
};
