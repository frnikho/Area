import {Toast} from 'native-base';

export default function error(message: string, redirectFnc: () => void = () => {}): void {
  Toast.show({
    title: message,
    status: 'warning',
    description: 'Please try again !',
  });
  redirectFnc();
}
