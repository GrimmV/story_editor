export function resizeImageBlob(originalBlob, width, height) {
    return new Promise((resolve, reject) => {
      // Create a Blob URL
      const blobUrl = URL.createObjectURL(originalBlob);
  
      // Create an Image object
      const img = new Image();
  
      // Define the onload handler
      img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
  
        // Draw the image onto the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convert the canvas to a Blob
        canvas.toBlob((newBlob) => {
          // Resolve the promise with the new Blob
          resolve(newBlob);
  
          // Clean up the blob URL
          URL.revokeObjectURL(blobUrl);
        }, originalBlob.type || 'image/png'); // You can set a specific MIME type
      };
  
      // Define the onerror handler
      img.onerror = () => {
        // Reject the promise if there's an error
        reject(new Error('Image loading error'));
      };
  
      // Set the source of the image to the Blob URL
      img.src = blobUrl;
    });
  }
  