import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

import React from 'react';

const DismissKeyboardHOC =
  (Comp: typeof React.Component) =>
  ({...props}) =>
    (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Comp {...props} />
      </TouchableWithoutFeedback>
    );
export const DismissKeyboardView = DismissKeyboardHOC(View);

// export const DismissKeyboardView = (props) => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//     {props.children}
//   </TouchableWithoutFeedback>
// );
