import Man from '../components/man';

const store = data => target => {
  target.prototype.props = data;
  return target;
};

@store({ a: 1, b: 2 })
class OutMan extends Man {
  constructor(def = 25, atk = 33, hp = 34) {
    super(def, atk, hp);
    this.test();
    console.log(this.props.a);
  }
}

// const tony = new (store({a: 1, b: 2})(OutMan))

const tony = new OutMan();
console.log(tony);
