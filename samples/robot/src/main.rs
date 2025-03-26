use std::thread;
use std::time::Duration;

mod mouse_click;
mod mouse_move;

use mouse_click::left_click;
use mouse_move::move_mouse_up;

fn main() {
    move_mouse_up(200);
    thread::sleep(Duration::from_secs(2)); // Blocks the current thread
    left_click();
}
