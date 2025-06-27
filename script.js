let flashcards = [];
let currentIndex = 0;
let filteredCards = [];
let isFlipped = false;

// Load flashcards from JSON file
async function loadFlashcards() {
    try {
        const response = await fetch('flashcards.json');
        flashcards = await response.json();
        filteredCards = [...flashcards];
        displayCard();
    } catch (error) {
        console.error('Error loading flashcards:', error);
    }
}

function displayCard() {
    const card = filteredCards[currentIndex];
    document.getElementById('question').textContent = card.question;
    document.getElementById('answer').textContent = card.answer;
    document.getElementById('categoryTag').textContent = card.category;
    document.getElementById('progress').textContent = `Card ${currentIndex + 1} of ${filteredCards.length}`;
    
    // Reset flip state
    const flashcard = document.querySelector('.flashcard');
    flashcard.classList.remove('flipped');
    isFlipped = false;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === filteredCards.length - 1;
}

function flipCard() {
    const flashcard = document.querySelector('.flashcard');
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function nextCard() {
    if (currentIndex < filteredCards.length - 1) {
        currentIndex++;
        displayCard();
    }
}

function previousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        displayCard();
    }
}

function filterCards(category) {
    // Update active button
    document.querySelectorAll('.category-filter').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    if (category === 'all') {
        filteredCards = [...flashcards];
    } else {
        filteredCards = flashcards.filter(card => card.category === category);
    }
    
    // Reset to first card
    currentIndex = 0;
    displayCard();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            previousCard();
            break;
        case 'ArrowRight':
            nextCard();
            break;
        case ' ':
        case 'Enter':
            e.preventDefault();
            flipCard();
            break;
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFlashcards();
});
