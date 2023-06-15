/* eslint-disable @typescript-eslint/no-unused-vars */

interface NetworkStatus {
  status: 'IN_PROGRESS' | 'SUCCESS' | 'FAILED' | 'NONE';
}
interface Network {
  _network: NetworkStatus;
}

interface BaseProps {}
interface BaseState {}
type DefaultState = BaseState;

type DateFormat = 'DD-MM-YYYY';
type TimeFormat = 'HH:MM AA' | 'HH:MM';

type Scale = 'tiny' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type Size = Record<Scale, number>;
type TextSize = {
  label: Size;
  content: Size;
  heading: Size;
} & Record<string, Size>;

type ViewFormat =
  | 'list_with_image'
  | 'list_without_image'
  | 'grid_with_image'
  | 'grid_without_image';
