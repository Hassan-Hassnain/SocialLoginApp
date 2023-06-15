import {Checkbox, Switch} from './PaperComponents';
import {FlexBox, Row} from './Arch';
import React, {useCallback, useState} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {colors, dimen} from '~/theme';

import {Text} from './Text';
import _find from 'lodash/find';
import {withTheme} from 'react-native-paper';

interface Option {
  value: string;
  label: string;
  selected: boolean;
}
interface Props extends WithTheme {
  options: Option[];
  multiple: boolean;
  label: string;
  required?: boolean;
  onSelected?: (options: Option[]) => void;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  direction?: 'row' | 'column';
  iconType?: 'toggle' | 'checkbox';
}

export function Checkboxes(props: Props) {
  const {direction = 'column', iconType = 'checkbox'} = props;
  const [selections, setSelections] = useState<Option[]>([]);
  const isSelected = useCallback(
    (option: Option) =>
      Boolean(_find(selections, s => s.value === option.value)),
    [selections],
  );

  const onPress = useCallback(
    (option: Option) => {
      const updated = [...selections];
      const selected = isSelected(option);
      if (selected) {
        // unselect it
        updated.splice(
          selections.findIndex(o => o.value === option.value),
          1,
        );
      } else {
        // push it
        updated.push(option);
      }
      setSelections(updated);
      props.onSelected && props.onSelected(updated);
    },
    [selections, props],
  );

  return (
    <FlexBox style={props.style}>
      <Text style={[styles.label, {color: props.textColor}]}>
        {`${props.label} ${props.required ? '*' : ''}`}
      </Text>
      <FlexBox style={{flexDirection: direction}}>
        {props.options.map((vv, i) => {
          const selected = isSelected(vv);
          return (
            <Row
              horizontalAlignment="flex-start"
              verticalAlignment="center"
              style={{
                marginBottom:
                  iconType === 'toggle'
                    ? dimen.margin.medium
                    : dimen.margin.xsmall,
              }}
              key={`${vv.value}_${i}`}>
              {iconType === 'checkbox' && (
                <Checkbox.Android
                  status={selected ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onPress(vv);
                  }}
                />
              )}
              {iconType === 'toggle' && (
                <Switch
                  value={selected}
                  onValueChange={() => {
                    onPress(vv);
                  }}
                  style={{marginRight: dimen.margin.small}}
                />
              )}
              <Text style={styles.option}>{vv.label}</Text>
            </Row>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
}
export const CheckboxGroup = withTheme(Checkboxes);
const styles = StyleSheet.create({
  label: {
    fontSize: dimen.text.heading.xsmall,
    color: colors.blackishGrey,
    marginBottom: dimen.margin.medium,
  },
  option: {
    fontSize: dimen.text.content.xlarge,
    color: colors.blackishGrey,
  },
});
