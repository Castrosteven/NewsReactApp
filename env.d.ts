declare module '@env' {
  const BASE_URL: string;
  const API_KEY: string;

  export {BASE_URL, API_KEY};
}
declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
