import {Dimensions, PixelRatio} from 'react-native';

import memoizeOne from 'memoize-one';

let {width: screenWidth, height: screenHeight} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
let guidelineBaseWidth = 380;
let guidelineBaseHeight = 820;

/**
 * Set the default guideline of original designs
 * @param  {number} width   The width of the original designs to follow.
 * @param  {number} height  The height of the original designs to follow.
 */
const setGuidelineBaseSize = (width: number, height: number) => {
  guidelineBaseWidth = width;
  guidelineBaseHeight = height;
};

/**
 * Converts provided size to independent pixel (dp).
 * @param  {number} size  The fixed size to scale up/down based on current device's screen width.
 * @return {number}       The calculated dp depending on current device's screen width.
 */
const fixedWidth = (size: number): number =>
  (screenWidth / guidelineBaseWidth) * Number(size);

/**
 * Converts provided size to independent pixel (dp).
 * @param  {number} size  The fixed size to scale up/down based on current device's screen height.
 * @return {number}       The calculated dp depending on current device's screen height.
 */
const fixedHeight = (size: number): number =>
  (screenHeight / guidelineBaseHeight) * size;

const scaledSize = memoizeOne((size: number, factor = 1) => {
  // return Number(size);
  const scaleWidth = screenWidth / guidelineBaseWidth;
  const scaleHeight = screenHeight / guidelineBaseHeight;
  const scaleFactor = Math.min(scaleWidth, scaleHeight);
  const v = Math.ceil(Number(size) * scaleFactor);
  const scaled = Number(size) + (v - Number(size)) * factor;
  return scaled;
});

// const scale = (size: number, factor = 0.5): number =>

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {number} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const percentageWidth = (widthPercent: number) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
const percentageHeight = (heightPercent: number) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
const listenOrientationChange = (that: {
  setState: (arg0: {orientation: string}) => void;
}) => {
  Dimensions.addEventListener('change', newDimensions => {
    // Retrieve and save new dimensions
    screenWidth = newDimensions.window.width;
    screenHeight = newDimensions.window.height;

    // Trigger screen's rerender with a state update of the orientation variable
    that.setState({
      orientation: screenWidth < screenHeight ? 'portrait' : 'landscape',
    });
  });
};

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
// const removeOrientationListener = () => {
//   Dimensions.removeEventListener('change', () => {});
// };

export {
  fixedWidth,
  fixedHeight,
  scaledSize,
  setGuidelineBaseSize,
  percentageWidth,
  percentageHeight,
  listenOrientationChange,
  // removeOrientationListener,
};
