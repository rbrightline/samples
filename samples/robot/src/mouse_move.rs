use std::ffi::c_long;

// Manually declare WinAPI functions (no `windows-sys` or `winapi` crate)
#[link(name = "user32")]

unsafe extern "system" {

    unsafe fn GetCursorPos(lpPoint: *mut POINT) -> i32;
    unsafe fn SetCursorPos(x: c_long, y: c_long) -> i32;

}

#[repr(C)]
struct POINT {
    x: c_long,
    y: c_long,
}

pub fn move_mouse_up(px: c_long) {
    unsafe {
        let mut pos = POINT { x: 0, y: 0 };
        if GetCursorPos(&mut pos) != 0 {
            SetCursorPos(pos.x, pos.y - px);
        }
    }
}
