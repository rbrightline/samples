use std::ffi::c_long;
use std::os::raw::c_ulong;
use std::thread;
use std::time::Duration;

type DWORD = c_ulong;

#[link(name = "user32")]
unsafe extern "system" {
    unsafe fn SendInput(c_inputs: u32, p_inputs: *const INPUT, cb_size: i32) -> u32;
    unsafe fn GetMessageExtraInfo() -> DWORD;
}

#[repr(C)]
struct MOUSEINPUT {
    dx: c_long,
    dy: c_long,
    mouse_data: DWORD,
    dw_flags: DWORD,
    time: DWORD,
    dw_extra_info: DWORD,
}

#[repr(C)]
struct INPUT {
    type_: DWORD,
    mi: MOUSEINPUT,
}

const INPUT_MOUSE: DWORD = 0;
const MOUSEEVENTF_LEFTDOWN: DWORD = 0x0002;
const MOUSEEVENTF_LEFTUP: DWORD = 0x0004;

pub fn left_click() {
    unsafe {
        let extra_info = GetMessageExtraInfo();
        let input_down = INPUT {
            type_: INPUT_MOUSE,
            mi: MOUSEINPUT {
                dx: 0,
                dy: 0,
                mouse_data: 0,
                dw_flags: MOUSEEVENTF_LEFTDOWN,
                time: 0,
                dw_extra_info: extra_info,
            },
        };
        let input_up = INPUT {
            type_: INPUT_MOUSE,
            mi: MOUSEINPUT {
                dx: 0,
                dy: 0,
                mouse_data: 0,
                dw_flags: MOUSEEVENTF_LEFTUP,
                time: 0,
                dw_extra_info: extra_info,
            },
        };

        SendInput(1, &input_down, std::mem::size_of::<INPUT>() as i32);
        thread::sleep(Duration::from_millis(50)); // Critical!
        SendInput(1, &input_up, std::mem::size_of::<INPUT>() as i32);
    }
}

fn main() {
    left_click();
    println!("Click sent!");
}
