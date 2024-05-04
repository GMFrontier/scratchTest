export interface AlertModalOptions {
  icoModal: any;
  title: string;
  message: string;
  labelButtonPrimary?: string;
  actionButtonPrimary?: () => void;
  labelButtonSecondary?: string;
  actionButtonSecondary?: () => void;
  showIcoClose?: boolean;

}
