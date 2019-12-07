import { h } from "preact";

import useUserNameConstraint from "./useUserNameConstraint";
import usePasswordConstraint from "./usePasswordConstraint";
import useEmailConstraint from "./useEmailConstraint";

export default function useConstraintValidation({ email, password, userName }) {
  const { userNameValidation } = useUserNameConstraint({ userName });
  const { passwordValidation } = usePasswordConstraint({ password });
  const { emailValidation } = useEmailConstraint({ email });

  return {
    emailValidation,
    passwordValidation,
    userNameValidation
  };
}
