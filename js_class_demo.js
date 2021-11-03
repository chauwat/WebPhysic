class Car {
    constructor(_options) {
        this.name = _options.name;
        this.door = _options.door;
    }

    sayHello() {
        console.log(`Hello This is ${this.name}'s ${this.door} door-car.`);
    }
}