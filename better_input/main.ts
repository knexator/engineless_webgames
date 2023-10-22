import { Input, KeyCode, MouseButton } from "./input";

let input = new Input();

let last_timestamp = 0;
function every_frame(cur_timestamp: number) {
  let delta_time = (cur_timestamp - last_timestamp) / 1000;
  last_timestamp = cur_timestamp;

  // update
  if (input.keyboard.isDown(KeyCode.KeyW) || input.keyboard.isDown(KeyCode.ArrowUp)) {
    // ...
  }
  if (input.mouse.wasPressed(MouseButton.Left)) {
    // ...
  }

  // draw
  // ...

  requestAnimationFrame(every_frame);
}

requestAnimationFrame(every_frame);
