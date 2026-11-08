/**
 * Web Audio API synthesizer for serene devotional ambience, soft shankh (conch shell),
 * temple bells, and festive sound effects.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isAmbiencePlaying = false;
  private isMuted = false;
  private isSfxEnabled = true;
  private volumeLevel = 0.75;
  private masterGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private lfoOsc: OscillatorNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volumeLevel, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambienceGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Starts peaceful Indian meditative Tanpura ambient drone (Sa-Pa in C#).
   */
  public startAmbience(): boolean {
    try {
      this.initContext();
      if (!this.ctx || !this.ambienceGain) return false;

      if (this.isAmbiencePlaying) return true;

      // Indian Classical Tanpura fundamental frequencies (Sa = 138.59 Hz C#3, Pa = 207.65 Hz G#3, Sa octave = 277.18 Hz)
      const freqs = [138.59, 207.65, 277.18, 554.37];
      this.droneOscillators = [];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Soft warm low-pass filtering
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600 + idx * 150, this.ctx.currentTime);

        const targetVol = idx === 0 ? 0.22 : idx === 1 ? 0.16 : 0.1;
        oscGain.gain.setValueAtTime(targetVol, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.ambienceGain!);

        osc.start();
        this.droneOscillators.push(osc);
      });

      this.lfoOsc = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfoOsc.frequency.setValueAtTime(0.2, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.lfoOsc.connect(lfoGain);
      lfoGain.connect(this.ambienceGain.gain);
      this.lfoOsc.start();

      const now = this.ctx.currentTime;
      this.ambienceGain.gain.cancelScheduledValues(now);
      this.ambienceGain.gain.setValueAtTime(0, now);
      this.ambienceGain.gain.linearRampToValueAtTime(0.45, now + 2.5);

      this.isAmbiencePlaying = true;
      return true;
    } catch (e) {
      console.warn('Audio start failed', e);
      return false;
    }
  }

  public stopAmbience() {
    if (!this.ctx || !this.ambienceGain || !this.isAmbiencePlaying) return;

    const now = this.ctx.currentTime;
    this.ambienceGain.gain.cancelScheduledValues(now);
    this.ambienceGain.gain.linearRampToValueAtTime(0, now + 1.2);

    setTimeout(() => {
      this.droneOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.droneOscillators = [];
      if (this.lfoOsc) {
        try {
          this.lfoOsc.stop();
          this.lfoOsc.disconnect();
        } catch {}
        this.lfoOsc = null;
      }
      this.isAmbiencePlaying = false;
    }, 1300);
  }

  public toggleAmbience(): boolean {
    if (this.isAmbiencePlaying) {
      this.stopAmbience();
      return false;
    } else {
      return this.startAmbience();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : this.volumeLevel, now + 0.1);
    }
  }

  public setVolume(level: number) {
    this.volumeLevel = Math.max(0, Math.min(1, level));
    if (this.ctx && this.masterGain && !this.isMuted) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.volumeLevel, now + 0.05);
    }
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public setSfxEnabled(enabled: boolean) {
    this.isSfxEnabled = enabled;
  }

  /**
   * Authentic soft shankh (conch shell / শঙ্খধ্বনি) sound synthesis.
   * Synthesizes the natural breath attack, rich harmonic overtones, gentle acoustic vibrato,
   * and long sacred resonance of a traditional temple shankha.
   */
  public playShankhSound() {
    if (!this.isSfxEnabled || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const baseFreq = 233.08; // Sacred A#3 tone
      const duration = 4.2;

      // Vibrato LFO for realistic breath wavering
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.setValueAtTime(4.2, now); // 4.2 Hz breath vibrato
      vibratoGain.gain.setValueAtTime(3.5, now);
      vibrato.connect(vibratoGain);
      vibrato.start(now);
      vibrato.stop(now + duration);

      // Conch shell acoustic harmonics (spiral horn resonance)
      const harmonics = [
        { mult: 1, gain: 0.32, type: 'sine' as OscillatorType },
        { mult: 2, gain: 0.22, type: 'sine' as OscillatorType },
        { mult: 3, gain: 0.16, type: 'triangle' as OscillatorType },
        { mult: 4, gain: 0.09, type: 'sine' as OscillatorType },
        { mult: 5, gain: 0.05, type: 'sine' as OscillatorType }
      ];

      harmonics.forEach(h => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const bandpass = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = h.type;
        osc.frequency.setValueAtTime(baseFreq * h.mult, now);
        vibratoGain.connect(osc.frequency);

        // Vocal tract / spiral conch cavity formant
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(baseFreq * h.mult, now);
        bandpass.Q.setValueAtTime(4, now);

        // Conch envelope: gentle breath build up (0.6s), majestic sustain, gentle tail
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(h.gain, now + 0.7);
        gain.gain.setValueAtTime(h.gain, now + 2.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(bandpass);
        bandpass.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });

      // Subtle air breath noise burst at initial blow
      const bufferSize = this.ctx.sampleRate * 1.2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(850, now);
      noiseFilter.Q.setValueAtTime(3.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0, now);
      noiseGain.gain.linearRampToValueAtTime(0.05, now + 0.4);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 1.3);

      // Complementary temple bell chime at 1.8s
      setTimeout(() => {
        this.playTempleBell();
      }, 1800);
    } catch (e) {
      console.warn('Shankh audio failed', e);
    }
  }

  /**
   * Authentic Indian brass temple bell sound synthesis (মন্দিরের ঘণ্টা).
   */
  public playTempleBell() {
    if (!this.isSfxEnabled || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const partials = [
        { freq: 880, gain: 0.35, decay: 3.2 },
        { freq: 1760, gain: 0.25, decay: 2.8 },
        { freq: 2480, gain: 0.18, decay: 2.1 },
        { freq: 3520, gain: 0.12, decay: 1.6 },
        { freq: 520, gain: 0.28, decay: 3.8 }
      ];

      partials.forEach(p => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(p.gain, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });
    } catch {}
  }

  /**
   * Diya lighting warm spark sound effect.
   */
  public playDiyaLight() {
    if (!this.isSfxEnabled || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const notes = [587.33, 739.99, 880, 1174.66];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.7);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.75);
      });
    } catch {}
  }

  /**
   * Auspicious celebration chime for envelope opening or wish generation.
   */
  public playCelebrationChime() {
    if (!this.isSfxEnabled || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      arpeggio.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.14, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 1.3);
      });
    } catch {}
  }

  /**
   * Sparkler / Firework sound burst with gentle crackle.
   */
  public playFireworkBurst() {
    if (!this.isSfxEnabled || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      // Gentle soft boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.45);

      // Crackle
      const notes = [1200, 1500, 1800, 2200];
      notes.forEach((f, i) => {
        if (!this.ctx) return;
        const sOsc = this.ctx.createOscillator();
        const sGain = this.ctx.createGain();
        sOsc.type = 'sine';
        sOsc.frequency.setValueAtTime(f + (Math.random() - 0.5) * 200, now + 0.1 + i * 0.05);
        sGain.gain.setValueAtTime(0.06, now + 0.1 + i * 0.05);
        sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2 + i * 0.05);
        sOsc.connect(sGain);
        sGain.connect(this.masterGain!);
        sOsc.start(now + 0.1 + i * 0.05);
        sOsc.stop(now + 0.25 + i * 0.05);
      });
    } catch {}
  }

  public getStatus() {
    return {
      isPlaying: this.isAmbiencePlaying,
      isMuted: this.isMuted,
      isSfxEnabled: this.isSfxEnabled
    };
  }
}

export const soundManager = new AudioEngine();
