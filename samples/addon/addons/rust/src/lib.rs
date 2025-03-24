use napi_derive::napi;

#[napi]
pub fn hello_world() ->()  {
    println!("Hello, world!");
    
}
