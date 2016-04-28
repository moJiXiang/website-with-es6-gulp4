import {hello} from './hello';
export default class Person {
  constructor (name) {
    this.name = name
  }

  speak () {
    hello('world1');
    document.write(`Hello, ${this.name}`)
  }
}
