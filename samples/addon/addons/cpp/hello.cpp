#include <napi.h>

Napi::String HelloWorld(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Hello World from C++!");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "helloWorld"), 
              Napi::Function::New(env, HelloWorld));
  return exports;
}

NODE_API_MODULE(hello_addon, Init)