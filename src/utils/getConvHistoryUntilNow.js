
export const getConvHistoryUntilNow = (frames, bubbles, endFrameId) => {


    console.log(frames);
    console.log(bubbles);

    let orderedFrames = [];
    // let disconnectedFrames = [];
    let bubbleTexts = [];
  
    let activeFrame = frames.find((f) => f.first);
    
    while (activeFrame) {
        if (endFrameId !== activeFrame.id) {
            orderedFrames.push(activeFrame);
            activeFrame = frames.find((f) => {
              return f.id === activeFrame.nextFrameId;
            });
        } else break;
    }

    for (let frame of orderedFrames) {
        const bubble = bubbles.find(bubble => frame.id === bubble.frameId)
        bubbleTexts.push(bubble ? bubble.content.de : "")
    }

    return bubbleTexts
}