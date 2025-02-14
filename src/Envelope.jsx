import React, { useState } from 'react';
import image from './envelope.png';
import { useNavigate } from 'react-router-dom';

const Envelope = ({ messageShown }) => {
  const [messageDisplayed, setMessageDisplayed] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleNext = () => {
    setMessageDisplayed(true);
    // Navigate to the Photobooth after the button is clicked
    navigate('/photobooth');
  };

  return (
    <div className="relative mt-8">
      <img
        src={image}
        alt="Envelope"
        className={`transition-transform transform ${messageShown ? 'animate-openEnvelope' : ''}`}
      />
      {/* Letter Inside Envelope */}
      {messageShown && !messageDisplayed && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full overflow-hidden">
            <div className="letter-content p-6 border-2 border-black rounded-lg bg-[#f7f7f7]">
              {/* Letter content with styling */}
              <p className="text-lg text-gray-800 font-mono whitespace-pre-line leading-relaxed">
                Hi Kisyaaaa AHAHHAHAHAAHA, Tuo nimog wala koy buhaton ig Valentines noooo, joke ra bitaw, anywayss Happy Hearts dayy, pwede ba nako kawaton imo dughan  HAHAHAHHAHA, bitawwww I know you are so busy these past days so no matter unsa may nahitabo you deserve to rest, and also so proud of you hehe, you kknow naman ata ana always, I know naa kay mga struggles or Challenges na imo gi tagoan nga di nimo ganahan i sulti, I just want you to know again n again n again nga raa rako pirme if ever you want someone you can run or talk to, Hapit nasad mahuman bitaw klase kaya rana, and I know you are doing your very99999x best so I am going to do my 999999x too HAHHAHAHAHA, anyways basin ga hilak naka diha ha charot, HAPPY HEART'S DAY KISSHA REY ABELINAAA!!!
              </p>

              {/* Button aligned to the right */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Envelope;
