import React, { useState, useRef } from 'react';
import { IoAdd, IoClose, IoImage, IoText } from 'react-icons/io5';
import { IoChevronBack } from 'react-icons/io5';

interface CreateStoryProps {
  onClose: () => void;
  onStoryCreated: (story: any) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onClose, onStoryCreated }) => {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSlide = {
          id: slides.length + 1,
          image: e.target?.result as string,
          caption: '',
          type: 'image'
        };
        setSlides([...slides, newSlide]);
        setCurrentSlide(slides.length);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSlide = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(Math.max(0, newSlides.length - 1));
    }
  };

  const updateSlideCaption = (index: number, newCaption: string) => {
    const newSlides = [...slides];
    newSlides[index].caption = newCaption;
    setSlides(newSlides);
  };

  const publishStory = () => {
    if (slides.length === 0) return;

    const newStory = {
      id: Date.now(),
      title: 'Your Story',
      avatar: '/images/demo-profile.png',
      image: slides[0].image,
      isActive: true,
      slides: slides.map((slide, index) => ({
        ...slide,
        timestamp: `${index + 1} min ago`
      }))
    };

    onStoryCreated(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="bg-dark rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <button onClick={onClose} className="text-white">
            <IoChevronBack size={24} />
          </button>
          <h2 className="text-white font-semibold">Create Story</h2>
          <button 
            onClick={publishStory}
            disabled={slides.length === 0}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              slides.length > 0 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Publish
          </button>
        </div>

        {/* Story Preview */}
        <div className="relative h-64 bg-gray-800">
          {slides.length > 0 ? (
            <div className="relative h-full">
              <img
                src={slides[currentSlide]?.image}
                alt="Story preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <textarea
                  value={slides[currentSlide]?.caption || ''}
                  onChange={(e) => updateSlideCaption(currentSlide, e.target.value)}
                  placeholder="Add a caption..."
                  className="w-full bg-transparent text-white placeholder-gray-300 resize-none border-none outline-none"
                  rows={2}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <IoImage size={48} className="mx-auto mb-2" />
                <p>Add your first slide</p>
              </div>
            </div>
          )}
        </div>

        {/* Slide Navigation */}
        {slides.length > 1 && (
          <div className="flex gap-1 p-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`flex-1 h-1 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="p-4 space-y-3">
          {/* Add Slide Button */}
          <button
            onClick={addSlide}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors"
          >
            <IoAdd size={20} />
            Add Slide
          </button>

          {/* Slide Management */}
          {slides.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-white text-sm font-semibold">Slides ({slides.length})</h3>
              <div className="flex gap-2 overflow-x-auto">
                {slides.map((slide, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                        index === currentSlide ? 'ring-2 ring-white' : ''
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                    <button
                      onClick={() => removeSlide(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                    >
                      <IoClose size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateStory; 