import { useState, useRef, useEffect } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';
import { db } from './Firebase'; // Ensure Firebase config is correctly imported

const Photobooth = () => {
  const [photos, setPhotos] = useState([]); // Store photos' data URLs
  const [photoUrls, setPhotoUrls] = useState([]); // Store uploaded photo URLs (if any)
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef(null);

  // Start the camera when the component mounts
  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const saveImageToFirestore = async (photoDataUrl) => {
    try {
      const photoCollectionRef = collection(db, "photos"); // Reference to the "photos" collection
      const docRef = await addDoc(photoCollectionRef, { photoDataUrl });
      console.log("Photo saved to Firestore with ID: ", docRef.id);
      return docRef.id; // Return the document ID (optional)
    } catch (error) {
      console.error("Error saving photo to Firestore:", error);
    }
  };

  const capturePhoto = async () => {
    setCapturing(true);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const photoDataUrl = canvas.toDataURL();
  
    // Save the photo to Firestore with addDoc (generates a new document ID)
    const savedPhotoUrl = await saveImageToFirestore(photoDataUrl);
  
    if (photos.length < 3) {
      setPhotos([...photos, photoDataUrl]);
      setPhotoUrls([...photoUrls, savedPhotoUrl]);
    }
  
    setCapturing(false);
  
    if (photos.length + 1 === 3) {
      setShowModal(true);
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

  const retryCapture = () => {
    setShowModal(false);
    setPhotos([]);
    setPhotoUrls([]);
  };

  return (
    <div className="photobooth bg-pink-50 p-6 rounded-xl shadow-lg wid mx-auto mt-12">
      <div className="video-container mb-6">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-auto rounded-lg border-4 border-pink-300 shadow-md"
        ></video>
      </div>

      {/* Controls Section with photo count */}
      <div className="controls flex justify-center gap-4 mb-6">
        <button
          onClick={capturePhoto}
          disabled={capturing || photos.length >= 3} // Disable capture when photos are full or capturing
          className="bg-pink-400 text-white py-2 px-4 rounded-full shadow-md hover:bg-pink-500 transition-all"
        >
          {capturing ? "Capturing..." : "Capture Photo"}
        </button>

        {/* Photo Count Display */}
        <p className="text-lg font-semibold text-pink-600 mt-4">
          {photos.length} / 3 Photos Taken
        </p>
      </div>

      {/* Modal with the captured photos and options */}
      {showModal && (
  <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="modal-content bg-gradient-to-t from-pink-200 to-purple-300 p-8 rounded-xl shadow-xl text-center relative w-[600px] max-w-full">
      {/* Add a cute heart or flower icon */}
      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full">
        <span role="img" aria-label="heart" className="text-4xl">💖</span>
      </div>

      {/* Photos inside the frame, arranged as 2 above, 1 below */}
      <div className="instax-frame bg-white p-4 rounded-[20px] shadow-lg flex flex-col items-center mb-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 justify-center">
          {photos.slice(0, 2).map((photo, index) => (
            <div key={index} className="w-32 h-48 rounded-[10px] object-cover overflow-hidden shadow-md">
              <img
                src={photo}
                alt={`photo_${index + 1}`}
                className="w-full h-full rounded-[10px] object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="w-32 h-48 mt-4 rounded-[10px] object-cover overflow-hidden shadow-md mx-auto">
          {photos.length > 2 && (
            <img
              src={photos[2]}
              alt={`photo_3`}
              className="w-full h-full rounded-[10px] object-cover"
            />
          )}
        </div>
      </div>

      {/* Thank you message */}
      <p className="text-xl font-semibold text-pink-600 mb-4">Thank you for visiting!</p>

      {/* Modal buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={retryCapture}
          className="bg-pink-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-pink-600 transition-all font-bold"
        >
          Take Another Photo
        </button>
      </div>

      {/* Optional small footer with cute text */}
      <p className="text-xs text-gray-600 mt-6">
        Designed with 💕 by Bejay's Photobooth
      </p>
    </div>
  </div>
)}


    </div>
  );
};

export default Photobooth;
