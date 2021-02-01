class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemainng);
    }
    this.tick();
    this.interval = setInterval(this.tick, 50);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemainng <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemainng = this.timeRemainng - .05;
      if (this.onTick) {
        this.onTick(this.timeRemainng);
      }
    }
  };

  get timeRemainng() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemainng(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
