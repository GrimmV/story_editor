export default function organizeFrames(frames, choices) {
  let organized = { first: [] };
  let frameMap = {};
  let choiceMap = {};

  // Map frames by their id for easy lookup
  frames.forEach((frame) => {
    frameMap[frame.id] = frame;
  });

  // Map choices by their frameId
  choices.forEach((choice) => {
    choiceMap[choice.frameId] = choice;
  });
  // console.log(choiceMap)

  // Helper function to handle recursive creation of the sequence
  function processFrame(frame, key) {
    organized[key].push(frame);
    let nextFrame = frames.find((f) => f.prevFrameId === frame.id);

    if (frame.id) {
      let choice = choiceMap[frame.id];
      if (choice) {
        // If a choice exists for the next frame, process each answer
        choice.answers.forEach((answer) => {
          organized[answer.answer.de] = [];
          if (answer.nextFrame) {
            let nextChoiceFrame = frames.find(frame => frame.id === answer.nextFrame);
            processFrame(nextChoiceFrame, answer.answer.de);
          }
        });
      } else if (nextFrame) {
        processFrame(nextFrame, key);
      }
    }
  }

  // Start processing from the first frame
  let startFrame = frames.find((frame) => !frame.prevFrameId);
  if (startFrame) {
    processFrame(startFrame, "first");
  }

  return organized;
}
