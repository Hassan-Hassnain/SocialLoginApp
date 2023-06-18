import ToastMessage from 'react-native-toast-message';

interface ToastOption {
  type?: 'success' | 'error' | 'info';
  position?: 'top' | 'bottom';
  title: string;
  subTitle?: string;
  duration?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
}
class ToastClass {
  show = ({
    title,
    subTitle,
    duration = 3000,
    type = 'info',
    position = 'bottom',
    ...options
  }: ToastOption) => {
    ToastMessage.show({
      ...options,
      text1: title,
      text2: subTitle,
      visibilityTime: duration,
      type,
      position: position,
    });
  };
  hide = () => {
    ToastMessage.hide();
  };
}

export const Toast = new ToastClass();
