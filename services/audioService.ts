class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscLeft: OscillatorNode | null = null;
  private oscRight: OscillatorNode | null = null;
  private isInitialized = false;

  private async initialize() {
    if (this.isInitialized) return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    // Check if context is suspended (autoplay policy)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    this.isInitialized = true;
  }

  async start(baseFrequency: number, binauralBeat: number, volume: number) {
    await this.initialize();
    if (!this.audioContext) return;

    // Stop any existing tones
    this.stop();

    const freqLeft = baseFrequency - (binauralBeat / 2);
    const freqRight = baseFrequency + (binauralBeat / 2);

    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.setValueAtTime(0, this.audioContext.currentTime); // Start silent
    this.masterGain.connect(this.audioContext.destination);

    // Left Ear
    const pannerLeft = this.audioContext.createStereoPanner();
    pannerLeft.pan.setValueAtTime(-1, this.audioContext.currentTime);
    pannerLeft.connect(this.masterGain);

    this.oscLeft = this.audioContext.createOscillator();
    this.oscLeft.type = 'sine';
    this.oscLeft.frequency.setValueAtTime(freqLeft, this.audioContext.currentTime);
    this.oscLeft.connect(pannerLeft);
    this.oscLeft.start();
    
    // Right Ear
    const pannerRight = this.audioContext.createStereoPanner();
    pannerRight.pan.setValueAtTime(1, this.audioContext.currentTime);
    pannerRight.connect(this.masterGain);

    this.oscRight = this.audioContext.createOscillator();
    this.oscRight.type = 'sine';
    this.oscRight.frequency.setValueAtTime(freqRight, this.audioContext.currentTime);
    this.oscRight.connect(pannerRight);
    this.oscRight.start();

    // Fade in
    this.masterGain.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.5);
  }

  stop() {
    if (this.masterGain && this.audioContext) {
      // Fade out
      this.masterGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
      
      // Stop oscillators after fade out
      const stopTime = this.audioContext.currentTime + 0.5;
      if (this.oscLeft) this.oscLeft.stop(stopTime);
      if (this.oscRight) this.oscRight.stop(stopTime);

      this.oscLeft = null;
      this.oscRight = null;
      this.masterGain = null;
    }
  }

  setVolume(volume: number) {
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.1);
    }
  }
}

export const audioService = new AudioService();
