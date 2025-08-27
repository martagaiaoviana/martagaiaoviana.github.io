// Portfolio Image Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <span class="lightbox-nav lightbox-prev"><i class="bi bi-chevron-left"></i></span>
        <span class="lightbox-nav lightbox-next"><i class="bi bi-chevron-right"></i></span>
        <img class="lightbox-content" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let portfolioImages = [];

    // Initialize portfolio images array
    function initializeImages() {
        portfolioImages = Array.from(document.querySelectorAll('.portfolio-images img'));
        
        // Add click event to all portfolio images
        portfolioImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                openLightbox(index);
            });
        });
    }

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        updateNavigationButtons();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function updateLightboxImage() {
        if (portfolioImages[currentImageIndex]) {
            lightboxImg.src = portfolioImages[currentImageIndex].src;
            lightboxImg.alt = portfolioImages[currentImageIndex].alt;
        }
    }

    function updateNavigationButtons() {
        // Disable/enable navigation buttons based on current position
        if (currentImageIndex <= 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (currentImageIndex >= portfolioImages.length - 1) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    function goToPrevious() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
            updateNavigationButtons();
        }
    }

    function goToNext() {
        if (currentImageIndex < portfolioImages.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
            updateNavigationButtons();
        }
    }

    // Navigation button events
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!this.classList.contains('disabled')) {
            goToPrevious();
        }
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!this.classList.contains('disabled')) {
            goToNext();
        }
    });

    // Close lightbox when clicking close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking on the background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    if (!prevBtn.classList.contains('disabled')) {
                        goToPrevious();
                    }
                    break;
                case 'ArrowRight':
                    if (!nextBtn.classList.contains('disabled')) {
                        goToNext();
                    }
                    break;
            }
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Initialize when DOM is ready
    initializeImages();
});
