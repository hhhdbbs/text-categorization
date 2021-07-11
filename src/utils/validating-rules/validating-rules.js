/*
 * 本js文件仅暴露1个工具类，提供各种用于表单数值检验的方法。请参考README.md使用。
 * 高锐，20210311
 */

const test_rules =  {
  testDigits:     s => /^[0-9]*$/.test(s),
      testNumber:     s => /^(0|[1-9][0-9]*)$/.test(s),
      testInteger:    s => /^(-)?\d$/.test(s),
      testReal:       s => /^[-+]?\d+(\.\d+)?$/.test(s),
      testChinese:    s => /^[\u4e00-\u9fa5]{0,}$/.test(s),
      testEnglish:    s => /^[A-Za-z\s]+$/.test(s),
      testNumEngUdl:  s => /^\w+$/.test(s),
      testNumEngSym:  s => /^[\w~!@#$%^&*()+=\-,./\\?:;[\]{}`|"']+$/.test(s),
      testEmail:      s => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(s),
      testPhone:      s => /^(((\+\d{2}[-\s])?0\d{2,3}[-\s]?\d{7,8})|((\+\d{2}[-\s]?)?(\d{2,3}[-\s]?)?([1][34578][0-9]\d{8})))$/.test(s),
      testDomainName: s => /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(s),
      testUrl:        s => /[a-zA-z]+:\/\/[^\s]*/.test(s),
      testAdmin:      s => /admin/gi.test(s),
};

export const rules = {
  required: value => !!value || '必填项',
  min: (minimumLength) => (v => (v.length >= minimumLength || ('至少为' + minimumLength + '个字符'))),
  max: (maximumLength) => (v => (v.length <= maximumLength || ('至多为' + maximumLength + '个字符'))),

  isDigits:       value => test_rules.testDigits(value)     || '请输入纯数字',
  isNumber:       value => test_rules.testNumber(value)     || '请输入自然数',
  isInteger:      value => test_rules.testInteger(value)    || '请输入整数',
  isReal:         value => test_rules.testReal(value)       || '请输入实数',

  isChinese:      value => test_rules.testChinese(value)    || '请输入汉字',
  isEnglish:      value => test_rules.testEnglish(value)    || '请输入英文',
  isNumEngUdl:    value => test_rules.testNumEngUdl(value)  || '请输入英文、数字、下划线构成的字符串',
  isNumEngSym:    value => test_rules.testNumEngSym(value)  || '请输入英文、数字和特殊符号构成的字符串',
  isEmail:        value => test_rules.testEmail(value)      || '邮箱格式不正确',
  isPhone:        value => test_rules.testPhone(value)      || '电话号码格式不正确',
  isDomainName:   value => test_rules.testDomainName(value) || '域名格式不正确',
  isUrl:          value => test_rules.testUrl(value)        || 'URL格式不正确',

  notAdmin:       value => test_rules.testAdmin(value)     || '不得包含admin',
}