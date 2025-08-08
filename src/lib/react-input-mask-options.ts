export const phoneOptions = {
  mask: '+55 (__) _____-____',
  replacement: { _: /\d/ },
}
export const zipCodeOptions = {
  mask: '__.___-___',
  replacement: { _: /\d/ },
}
export const cpfOptions = {
  mask: '___.___.___-__',
  replacement: { _: /\d/ },
}
export const salaryOptions = {
  mask: 'R$ num',
  blocks: {
    num: {
      mask: Number,
      thousandsSeparator: '.',
      radix: ',',
      scale: 2,
      signed: false,
    },
  },
}
