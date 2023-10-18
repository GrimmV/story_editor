export default function organizeFrames(frames, bubbles, choices) {
  let orderedFrames = [];
  let disconnectedFrames = [];

  let activeFrame = frames.find((f) => f.first);

  while (activeFrame) {
    const bubble = bubbles ? bubbles.find(bubble => bubble.frameId === activeFrame.id) : null;
    orderedFrames.push({frame: activeFrame, text: bubble ? bubble.content["de"] : ""});
    activeFrame = frames.find((f) => {
      return f.id === activeFrame.nextFrameId;
    });
  }

  for (let frame of frames){
    const bubble = bubbles ? bubbles.find(bubble => bubble.frameId === frame.id) : null;
    if (!orderedFrames.includes(frame)) {
      disconnectedFrames.push({frame: frame, text: bubble ? bubble.content["de"] : ""});
    }
  }

  return {orderedFrames: orderedFrames, disconnectedFrames: disconnectedFrames};
}
