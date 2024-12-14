import { NativeEventEmitter, NativeModules } from "react-native";
import container from "../di/inversify.config";
import { TYPES } from "../di/types";
import { reaction } from 'mobx'
import MetaMapViewModel from "./MetaMapViewModel";
import { useToastContext } from "../../core/presentation/contexts/messages/useToastContext";
import { useNewModalContext } from "../../core/presentation/contexts/messages/useNewModalContext";
import { UserVerifiedStatus } from "../../core/data/models/User";
import warning__ico_modal_content from "../../../assets/svg/warning__ico_modal_content";
import ic_error_check_filled from "../../../assets/svg/ic_error_check_filled";
import { MetaMapRNSdk } from 'react-native-metamap-sdk';

export class MetaMapVerificationUtil {
  private static instance: MetaMapVerificationUtil | null = null;

  private constructor() { }

  metaMapViewModel = container.get<MetaMapViewModel>(TYPES.MetaMapViewModel);
  showAlertToast = useToastContext().showAlertToast

  showStateModal = useNewModalContext().showStateModal

  public static getInstance(): MetaMapVerificationUtil {
    if (!MetaMapVerificationUtil.instance) {
      MetaMapVerificationUtil.instance = new MetaMapVerificationUtil();
    }
    return MetaMapVerificationUtil.instance;
  }

  public async checkUserVerified(onSuccessVerification: () => void) {
    this.metaMapViewModel.checkVerifiedStatus();
    reaction(
      () => this.metaMapViewModel.statusResponse1,
      () => {
        switch (this.metaMapViewModel.statusResponse1.userVerifiedStatus) {
          case UserVerifiedStatus.VALIDATED:
            onSuccessVerification();
            break;
          case UserVerifiedStatus.IN_PROGRESS:
            this.showAlertToast("Su usuario está en proceso de validación. esto puede demorar entre 24hs y 48hs");
            break;
          case UserVerifiedStatus.PENDING:
          case UserVerifiedStatus.NULL:
          case null:
            this.showStateModal(
              {
                image: warning__ico_modal_content,
                title: "Tu usuario aún no está validado",
                message: "Por favor valida tu identidad para poder disfrutar de todos nuestros beneficios",
                labelButtonPrimary: "Validar identidad",
                actionButtonPrimary: () => {
                  this.startMetaMapFlow(() => {
                    this.showAlertToast("Su usuario está en proceso de validación. esto puede demorar entre 24hs y 48hs");
                  });
                }
              }
            );
            break;
          default:
            this.showStateModal(
              {
                image: ic_error_check_filled,
                title: "Algo salió mal con tu validación de identidad",
                message: "Comunícate con <b>soporte<b>\n para más información",
                showIcoClose: true
              }
            );
            break;
        }
      }
    );
  }

  public async customCheckUserVerified(onUserValidated: () => void, onUserInProgress: () => void, onUserNotValidated: () => void) {
    this.metaMapViewModel.checkVerifiedStatus2();
    reaction(
      () => this.metaMapViewModel.statusResponse2,
      () => {
        switch (this.metaMapViewModel.statusResponse2.userVerifiedStatus) {
          case UserVerifiedStatus.VALIDATED:
            this.showStateModal(
              {
                image: ic_error_check_filled,
                title: "Algo salió mal con tu validación de identidad",
                message: "Comunícate con <b>soporte<b>\n para más información",
                showIcoClose: true
              }
            );
            break;
            break;
          case UserVerifiedStatus.IN_PROGRESS:
            onUserInProgress()
            break;
          case UserVerifiedStatus.PENDING:
          case UserVerifiedStatus.NULL:
          case null:
            onUserNotValidated()
            break;
          default:
            this.showStateModal(
              {
                image: ic_error_check_filled,
                title: "Algo salió mal con tu validación de identidad",
                message: "Comunícate con <b>soporte<b>\n para más información",
                showIcoClose: true
              }
            );
            break;
        }
      }
    );
  }

  async startMetaMapFlow(onSuccessVerification: () => void, onErrorVerification?: () => void) {
    this.metaMapViewModel.getMetaMapData((idUsr: string) => {
      const metadata = this.metaMapViewModel.getSDKMetadata()
      MetaMapRNSdk.showFlow(
        this.metaMapViewModel.getClientId(),
        this.metaMapViewModel.getFlowId(),
        metadata
      );

      const MetaMapVerifyResult = new NativeEventEmitter(NativeModules.MetaMapRNSdk);
      const successListener = MetaMapVerifyResult.addListener('verificationSuccess', () => {
        successListener.remove();
        if (onSuccessVerification) {
          onSuccessVerification();
        }
      });

      const canceledListener = MetaMapVerifyResult.addListener('verificationCanceled', (data) => {
        canceledListener.remove();
        this.showAlertToast("Verificación cancelada");
        if (onErrorVerification) {
          onErrorVerification();
        }
      });
    });
  }

  async startMetaMapFlowPfCardRequest(kycUrl: URL, onSuccessVerification: () => void, onErrorVerification: () => void) {

    const metadataEncoded = kycUrl.searchParams.get("metadata");
    let metadataJson = ""

    if (metadataEncoded) {
      const metadataDecoded = decodeURIComponent(metadataEncoded);

      try {
        metadataJson = JSON.parse(metadataDecoded);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        onErrorVerification()
      }
    } else {
      console.error('Metadata not found in the URL');
      onErrorVerification()
    }

    const merchantToken = kycUrl.searchParams.get('merchantToken');
    const flowId = kycUrl.searchParams.get('flowId');

    MetaMapRNSdk.showFlow(
      merchantToken,
      flowId,
      metadataJson
    );
    const MetaMapVerifyResult = new NativeEventEmitter(NativeModules.MetaMapRNSdk);
    const successListener = MetaMapVerifyResult.addListener('verificationSuccess', () => {
      console.log("verificationSuccess")
      if (onSuccessVerification) {
        onSuccessVerification();
      }
      successListener.remove();
    });

    const canceledListener = MetaMapVerifyResult.addListener('verificationCanceled', (data) => {
      this.showAlertToast("Verificación cancelada");
      console.log("verificationCanceled")
      if (onErrorVerification) {
        onErrorVerification()
      }
      canceledListener.remove();
    });
  }
}
