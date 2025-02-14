import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './Firebase'; // Ensure Firebase is correctly imported

function Admin() {
  const [photos, setPhotos] = useState([]); // State to store the photos
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch photos from Firestore when the component mounts
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetch the photos collection from Firestore
        const querySnapshot = await getDocs(collection(db, "photos"));
        const fetchedPhotos = [];

        querySnapshot.forEach((doc) => {
          // Each document contains the photo's data URL
          fetchedPhotos.push(doc.data().photoDataUrl);
        });

        // Update the state with the fetched photos
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error("Error fetching photos: ", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchPhotos();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  if (loading) {
    return <div>Loading photos...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="admin-page p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold text-center mb-4">Admin Panel</h1>
      <div className="photo-gallery grid grid-cols-3 gap-4">
        {photos.length > 0 ? (
          photos.map((photoUrl, index) => (
            <div key={index} className="photo-card border rounded-md p-2 shadow-md">
              <img
                src={photoUrl}
                alt={`photo_${index + 1}`}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
