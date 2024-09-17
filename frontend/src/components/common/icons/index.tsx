import { PiEyeBold, PiEyeClosedBold, PiTrash } from "react-icons/pi";

export const IconEyeOpen = ({ ...props }) => {
  return <PiEyeBold {...props} />;
};

export const IconEyeClosed = ({ ...props }) => {
  return <PiEyeClosedBold {...props} />;
};

export const IconTrash = ({ ...props }) => {
  return <PiTrash {...props} />;
};
