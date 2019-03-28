export default class Man {
  constructor(def = 2, atk = 3, hp = 3) {
    this.getStr(def, atk, hp);
  }

  test() {
    console.log(this, '@@@@@@@@@@');
  }

  getStr(...args) {
    console.log('@@@@@@@@@@', this);
    console.log(args.reduce((a, b) => `${a},${b}`));
  }
}
