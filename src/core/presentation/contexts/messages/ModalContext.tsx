import React, { createContext, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { BaseBottomSheetDialog } from '../../components/dialog/BaseBottomSheetDialog';
import { ModalContent } from '../../components/dialog/ModalStateContent';
import { TypeModalEnum } from './TypeModalEnum';

export interface ModalProps {
  image: any;
  title: string;
  message: string;
  labelButtonPrimary?: string;
  actionButtonPrimary?: () => void;
  labelButtonSecondary?: string;
  actionButtonSecondary?: () => void;
  showIcoClose?: boolean
  enableOverlayTap?: 'none' | 'close' | 'collapse',
  typeModal?: TypeModalEnum,
  content?: any
}

interface ModalContextProps {
  showStateModal: (props: ModalProps) => void;
}

export const ModalStateContext = createContext({} as ModalContextProps);

export const NewModalContextProvider = ({ children }: any) => {

  const [props, setProps] = useState<ModalProps>({
    image: '',
    title: '',
    message: '',
  });

  const [actionButtonPrimary, setActionButtonPrimary] = useState<(() => void)>(() => () => { });
  const [actionButtonSecondary, setActionButtonSecondary] = useState<(() => void)>(() => () => { });

  const openModal = () => {
    bottomSheetRef.current?.expand();
  };
  const closeModal = () => {
    bottomSheetRef.current?.close()
    setProps({
      image: '',
      title: '',
      message: '',
    });
  }

  const showStateModal = (
    props: ModalProps,
  ) => {

    var propsDefault = props;
    if (props.typeModal == undefined) {
      propsDefault.typeModal = TypeModalEnum.STATE_MODAL
    }

    setProps(propsDefault);

    setActionButtonPrimary(() => () => {
      if (propsDefault.actionButtonPrimary) {
        propsDefault.actionButtonPrimary();
      }
      closeModal();
    })

    setActionButtonSecondary(() => () => {
      if (propsDefault.actionButtonSecondary) {
        propsDefault.actionButtonSecondary();
      }
      closeModal();
    })
    openModal();
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <ModalStateContext.Provider
      value={{ showStateModal }}>
      {children}
      <BaseBottomSheetDialog bottomSheetRef={bottomSheetRef} enableOverlayTap={props.enableOverlayTap}>
        <ModalContent
          title={props?.title ?? ''}
          subtitle={props?.message ?? ''}
          labelButtonPrimary={props?.labelButtonPrimary ?? ''}
          icoModal={props?.image}
          actionButtonPrimary={actionButtonPrimary}
          labelButtonSecondary={props?.labelButtonSecondary}
          showIconClose={props.showIcoClose}
          actionButtonSecondary={actionButtonSecondary}>
        </ModalContent>
      </BaseBottomSheetDialog>
    </ModalStateContext.Provider>
  );
};
