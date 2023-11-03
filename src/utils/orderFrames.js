// export default function organizeFrames(frames, bubbles, choices) {
//   let orderedFrames = [];

//   let activeFrame = frames.find((f) => f.first);

//   while (activeFrame) {
//     const bubble = bubbles ? bubbles.find(bubble => bubble.frameId === activeFrame.id) : null;
//     orderedFrames.push({frame: activeFrame, text: bubble ? bubble.content["de"] : ""});
//     activeFrame = frames.find((f) => {
//       return f.id === activeFrame.nextFrameId;
//     });
//   }

//   return orderedFrames;
// }


export default function organizeFrames(frames, bubbles, choices) {
  let orderedFramesDict = {};
  let currentKey = "first";

  function processFrame(frameId, key) {
      let activeFrame = frames.find(f => f.id === frameId);
      if (!activeFrame) return;

      if (!orderedFramesDict[key]) orderedFramesDict[key] = [];

      const bubble = bubbles ? bubbles.find(bubble => bubble.frameId === frameId) : null;
      orderedFramesDict[key].push({frame: activeFrame, text: bubble ? bubble.content["de"] : ""});

      const choiceElement = choices ? choices.find(choice => choice.frameId === frameId) : null;
      
      if (choiceElement) {
          // Handle each choice recursively
          choiceElement.answers?.forEach((answer) => {
            processFrame(answer.nextFrame, answer.identifier);
          });
      } else {
          processFrame(activeFrame.nextFrameId, key);
      }
  }

  const initialFrame = frames.find(f => f.first);
  if (initialFrame) {
      processFrame(initialFrame.id, currentKey);
  }

  return orderedFramesDict;
}
