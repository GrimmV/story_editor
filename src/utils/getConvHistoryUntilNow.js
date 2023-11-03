
export const getConvHistoryUntilNow = (frames, bubbles, choices, endFrameId) => {

    let bubbleTexts = [];
  
    let activeFrame = frames.find((f) => f.id === endFrameId);
    if (!activeFrame) return []
    
    do {
        const activeFrameId = activeFrame.id;
        activeFrame = frames.find((f) => {
            return f.nextFrameId === activeFrameId;
        });
        if (!activeFrame) {
            const [frameId, answer] = findElementByNextFrame(choices, activeFrameId);
            if (frameId) {
                activeFrame = frames.find(f => {
                    return f.id === frameId
                })
                bubbleTexts.push(answer);
            } else {
                break;
            }
        }
        const bubble = bubbles.find(bubble => activeFrame.id === bubble.frameId)
        bubbleTexts.push(bubble ? bubble.content.de : "")
    } while (!activeFrame.first)


    const reverseBubbleTexts = bubbleTexts.reverse()
    return reverseBubbleTexts
}

function findElementByNextFrame(objectsList, targetNextFrame) {
  for (let obj of objectsList) {
    for (let answer of obj.answers) {
      if (answer.nextFrame === targetNextFrame) {
        return [obj.frameId, answer.answer.de]
      }
    }
  }
  return [null, ""];  // Return null if no matching element is found
}