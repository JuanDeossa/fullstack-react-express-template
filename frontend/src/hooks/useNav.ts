import { useNavigate } from "react-router-dom";

interface Props {
  path?: string;
  replace?: boolean;
  state?: object;
}

export const useNav = () => {
  //
  const navigate_ = useNavigate();

  const navigate = ({ path = "/", replace = false, state = {} }: Props) => {
    navigate_(path, {
      replace: replace,
      state: state,
    });
  };

  return { navigate };
};
