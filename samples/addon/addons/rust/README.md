# Rust Addon

Demostration of how to create a nodejs addon in rust

# How to use built

- 1. run `cargo build --release`
- 2. copy `target/release/project-name.dll` file to your nodejs project and add `.node` extention or replace `.dll` extion with `.node`
- 3. access the `.node` addon using `require('./project-name.node')`
