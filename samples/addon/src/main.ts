import { helloWorld as cppHelloWorld } from '@addon/hello';
import { helloWorld as rustHelloWorld } from '@rust-addon/hello';
console.log(cppHelloWorld());
console.log(rustHelloWorld());
