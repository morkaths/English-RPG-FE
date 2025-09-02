/**
 * Speech Synthesis Utility Functions
 * @param text The text to be spoken.
 * @param lang Language code ('en-US', 'vi-VN').
 * @param voiceName Specific voice name ('Google US English', 'Microsoft Zira - English (United States)', etc.).
 * @param rate Speaking rate (1 is default).
 * @param pitch Voice pitch (1 is default).
 * @param volume Volume (1 is default).
 */
export function playAudio(
  text?: string,
  lang: string = "en-US",
  voiceName?: string,
  rate: number = 1,
  pitch: number = 1,
  volume: number = 1
) {
  if (!text) return;
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;

  if (voiceName) {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name === voiceName);
    if (voice) utter.voice = voice;
  }

  window.speechSynthesis.speak(utter);
}

/**
 * Stop the current audio playback.
 */
export function stopAudio() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Check if the browser supports Speech Synthesis.
 */
export function isSpeechSupported() {
  return typeof window !== "undefined" && !!window.speechSynthesis;
}

/**
 * Get the list of available voices.
 */
export function getVoices(): SpeechSynthesisVoice[] {
  return typeof window !== "undefined" && window.speechSynthesis
    ? window.speechSynthesis.getVoices()
    : [];
}