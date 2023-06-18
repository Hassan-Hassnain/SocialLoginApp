import * as React from 'react';

import {Modal, PaperProvider, Portal} from 'react-native-paper';

import {Text} from './Text';
import {Title} from './Title';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  duration: number;
}
//FIXME: This is incomplete Component
export const Alert = ({
  visible: visibleProp,
  title,
  message,
  duration = 3000,
}: Props) => {
  const [visible, setVisible] = React.useState(false);

  const hideModal = () => setVisible(false);

  React.useEffect(() => {
    setVisible(visibleProp);
    setInterval(() => hideModal(), duration);
  }, [visibleProp]);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Title>{title}</Title>
          <Text>{message}</Text>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};
