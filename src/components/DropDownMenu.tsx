import {HelperText, Menu} from './PaperComponents';
import React, {useCallback, useState} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {colors, dimen, fw} from '~/theme';

import {ChevronDownIcon} from './Icons';
import {FlexBox} from './Arch';
import {TextInput} from '~/components/PaperComponents';

interface Option {
  value: string;
  label: string;
  selected: boolean;
}
interface Props {
  options: Option[];
  multiple: boolean;
  label: string;
  required?: boolean;
  onSelected?: (option: Option) => void;
  style?: StyleProp<ViewStyle>;
  textColor: string;
  description?: string;
  error?: boolean;
}
export function DropDownMenu(props: Props): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const [selection, setSelection] = useState<Option>();
  const openMenu = useCallback(() => setVisible(true), [setVisible]);
  const closeMenu = useCallback(() => setVisible(false), [setVisible]);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <FlexBox style={props.style}>
          <FlexBox
            style={[
              styles.inputContainer,
              {borderBottomWidth: props.error ? fw(0) : fw(1)},
            ]}>
            <TextInput
              onTouchStart={openMenu}
              label={`${props.label} ${props.required ? '*' : ''}`}
              style={[{backgroundColor: colors.transparent, flex: 1}]}
              mode="flat"
              editable={false}
              value={selection?.label}
              underlineColor={colors.transparent}
              theme={{colors: {primary: props.textColor || colors.primary}}}
              error={props.error}
            />
            <ChevronDownIcon
              color={props.error ? colors.carrot : colors.darkGrey}
            />
          </FlexBox>
          <HelperText
            type={props.error ? 'error' : 'info'}
            visible={props.error}>
            {props.description}
          </HelperText>
        </FlexBox>
      }>
      {props.options.map((vv, i) => {
        const selected = selection?.value === vv.value;
        // lets save the dynamic label to avoid unnecessary calculations.
        return (
          <Menu.Item
            key={`${vv.value}_${i}`}
            onPress={() => {
              closeMenu();
              setSelection(vv);
              props.onSelected && props.onSelected(vv);
            }}
            title={vv.label}
            contentStyle={{maxWidth: fw(500)}}
            style={[
              {maxWidth: fw(500)},
              selected && {
                backgroundColor: colors.dividerDark,
              },
            ]}
          />
        );
      })}
    </Menu>
  );
}

const styles = StyleSheet.create({
  name: {
    padding: dimen.margin.small,
    alignContent: 'center',
    textAlign: 'center',
  },
  vst: {
    fontSize: dimen.text.content.small,
    color: colors.grey,
    marginBottom: dimen.margin.small,
  },
  label: {
    fontSize: dimen.text.heading.tiny,
    color: colors.blackishGrey,
  },
  inputContainer: {
    borderBottomWidth: fw(1),
    marginVertical: dimen.margin.small,
    borderRadius: fw(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
