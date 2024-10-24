import React from 'react';

// Define the props interface for CategorySelector component
// categories: an array of strings representing category names
// onSelectCategory: a function that takes a category name and handles the selection
interface CategorySelectorProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

// CategorySelector component allows the user to choose a category from a list of options
const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' // Vertically center the content on the full page height
      }}
    >
      <h2>Select a Category</h2> {/* Heading for category selection */}
      
      {/* Display buttons for each category, mapped from the categories array */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {categories.map((category) => (
          <button 
            key={category} // Ensure each button has a unique key (category name)
            onClick={() => onSelectCategory(category)} // Handle the category selection
            className="category-button" // Apply CSS styling to the button
          >
            {category} {/* Display the category name on each button */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;