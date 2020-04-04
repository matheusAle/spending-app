import { MaskService } from "react-native-masked-text";

const masks = {
  'money': v => ['money', v, { unit: 'R$ ', separator: ',', delimiter: '.' }],
};

export const toMask = (type, v) => MaskService.toMask(...masks[type](v));
export const unMask = (type, v) => MaskService.toRawValue(...masks[type](v));
