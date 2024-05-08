import { BaseButton, BaseButtonProps } from "./BaseButton";

interface ButtonPrimaryProps extends BaseButtonProps { }

export const ButtonPrimary = (props: ButtonPrimaryProps) => {
  return <BaseButton {...props} />;
};
