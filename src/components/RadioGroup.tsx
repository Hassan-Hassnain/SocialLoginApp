import React, {useState} from 'react';
import {RadioButton} from './PaperComponents';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {colors, dimen} from '~/theme';
import {FlexBox, Row} from './Arch';
import {Text} from './Text';

interface Option {
  value: string;
  label: string;
}
interface Props {
  options: Option[];
  multiple: boolean;
  label: string;
  required?: boolean;
  onSelected?: (option: Option) => void;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  direction?: 'row' | 'column';
  defaultValue?: Option;
}
export function RadioGroup(props: Props) {
  const {direction = 'column'} = props;
  const [selection, setSelection] = useState<Option | undefined>(
    props.defaultValue,
  );

  return (
    <FlexBox style={props.style}>
      <Text style={[styles.label, {color: props.textColor}]}>
        {`${props.label} ${props.required ? '*' : ''}`}
      </Text>
      <FlexBox style={{flexDirection: direction}}>
        {props.options.map((vv, i) => {
          return (
            <Row
              horizontalAlignment="flex-start"
              verticalAlignment="center"
              style={{marginRight: dimen.margin.medium}}
              key={`${vv.value}_${i}`}>
              <RadioButton.Android
                value={vv.value}
                onPress={() => {
                  setSelection(vv);
                  vv && props.onSelected && props.onSelected(vv);
                }}
                status={selection?.value === vv.value ? 'checked' : 'unchecked'}
              />
              <Text style={styles.option}>{vv.label}</Text>
            </Row>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
}

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
